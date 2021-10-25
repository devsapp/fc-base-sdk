import { ILogger, HLogger, spinner } from '@serverless-devs/core';
import fs from 'fs';
import _ from 'lodash';
import Client from '../utils/client';
import { getTargetTriggers, transfromTriggerConfig } from '../utils/utils';
import { IProperties } from '../common/entity';
import { isCode, isCustomContainerConfig } from '../interface/function';
import { makeDestination } from './function-async-config';

export default class Component {
  @HLogger('FC-BASE-SDK') static logger: ILogger;

  /**
   * 部署资源
   * @param props
   * @param param1
   *  command: 执行的二级指令：service、function、trigger 或者为空，为空时部署所有
   *  type：部署的类型：all、config、code
   *  onlyDelpoyTriggerName：当 command 为 trigger 时生效，仅部署哪些触发器
   * @returns
   */
  static async deploy(props: IProperties, { command, type, onlyDelpoyTriggerName }): Promise<any> {
    const { region, service, function: functionConfig, triggers } = props;
    const deployAllConfig = !command && (type === 'all' || type === 'config');

    // 校验配置
    const commandIsFunction = command === 'function';
    if (commandIsFunction && _.isEmpty(functionConfig)) {
      throw new Error('The deployment function was specified, but the function configuration was not found');
    }
    const commandIsTirgger = command === 'trigger';
    if (commandIsTirgger && _.isEmpty(triggers)) {
      throw new Error('The deployment trigger was specified, but the trigger configuration was not found');
    }
    let deployTriggers = [];
    const needDeployTrigger = deployAllConfig || commandIsTirgger;
    if (needDeployTrigger && triggers) {
      if (commandIsTirgger && onlyDelpoyTriggerName) {
        deployTriggers = getTargetTriggers(triggers, onlyDelpoyTriggerName);
      } else {
        deployTriggers = triggers;
      }
    }

    const deployRes: any = {};
    const fcClient = await Client.fcClient();

    // 开始部署
    const needDeployService = deployAllConfig || command === 'service';
    if (needDeployService) {
      deployRes.service = await this.makeService(fcClient, service);
    }

    const needDeployFunction = !command || commandIsFunction;
    if (needDeployFunction && functionConfig) {
      deployRes.function = await this.makeFunction(fcClient, functionConfig, type);
    }

    if (!_.isEmpty(deployTriggers)) {
      const triggersRes = [];
      for (const triggerConfig of deployTriggers) {
        const triggerRes = await this.makeTrigger(
          fcClient,
          triggerConfig.service,
          triggerConfig.function,
          transfromTriggerConfig(triggerConfig, region, Client.credentials.AccountID),
        );
        triggersRes.push(triggerRes);
      }
      deployRes.triggers = triggersRes;
    }

    return deployRes;
  }

  static async makeService(fcClient, serviceConfig) {
    const {
      name,
      vpcConfig,
      nasConfig,
      logConfig,
      role,
    } = serviceConfig;

    if (!logConfig) {
      serviceConfig.logConfig = {
        project: '',
        logstore: '',
        logBeginRule: 'None',
        enableRequestMetrics: false,
        enableInstanceMetrics: false,
      };
    }

    if (!nasConfig) {
      serviceConfig.nasConfig = {
        mountPoints: [],
        userId: -1,
        groupId: -1,
      };
    }
    if (!vpcConfig) {
      serviceConfig.vpcConfig = {
        vswitchIds: [],
        securityGroupId: '',
        vpcId: '',
      };
    }

    if (_.isNil(role)) {
      serviceConfig.role = '';
    }

    if (serviceConfig.tracingConfig === 'Enable') {
      const xtraceClient = Client.xtraceClient();
      try {
        const { Token: token } = await xtraceClient.request('GetToken', {}, {});
        serviceConfig.tracingConfig = {
          type: 'Jaeger',
          params: {
            endpoint: `${token.InternalDomain}/adapt_${token.LicenseKey}_${token.Pid}/api/traces`,
          },
        };
      } catch (e) {
        if (e.code === '40301' && e.message?.includes('AliyunARMSFullAccess')) {
          e.message = '子账号没有访问权限,需要主账号进行授权 AliyunTracingAnalysisReadOnlyAccess';
        }
        throw e;
      }
    } else {
      serviceConfig.tracingConfig = {};
    }

    const vm = spinner(`Make service ${name}...`);

    let res;
    try {
      res = await fcClient.createService(name, serviceConfig);
    } catch (ex) {
      if (ex.code !== 'ServiceAlreadyExists') {
        this.logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
        vm.fail();
        throw ex;
      }
      try {
        res = await fcClient.updateService(name, serviceConfig);
      } catch (e) {
        vm.fail();
        throw e;
      }
    }

    vm.succeed(`Make service ${name} success.`);
    return res;
  }

  static async makeFunction(fcClient, functionConfig, type) {
    const serviceName = functionConfig.service;
    const functionName = functionConfig.name;
    const vm = spinner(`Make function ${serviceName}/${functionName}...`);
    const onlyDeployConfig = type === 'config';
    const onlyDeployCode = type === 'code';

    const {
      filename,
      runtime,
      customContainerConfig,
      ossBucket,
      ossKey,
      asyncConfiguration,
      instanceLifecycleConfig,
      environmentVariables = {},
    } = functionConfig;
    // 接口仅接受 string 类型，value值需要toString强制转换为字符串
    functionConfig.environmentVariables = _.mapValues(environmentVariables, (value) => value.toString());
    functionConfig.initializer = functionConfig.initializer || '';
    delete functionConfig.asyncConfiguration;

    if (!onlyDeployConfig) {
      if (filename) {
        functionConfig.code = {
          zipFile: fs.readFileSync(filename, 'base64'),
        };
      } else if (ossBucket && ossKey) {
        functionConfig.code = {
          ossBucketName: ossBucket,
          ossObjectName: ossKey,
        };
      }

      if (onlyDeployCode) {
        try {
          await fcClient.updateFunction(serviceName, functionName, { code: functionConfig.code });
          vm.succeed(`Make function ${serviceName}/${functionName} code success.`);
        } catch (ex) {
          vm.fail();
          throw ex;
        }
        return;
      }
    }

    const emptyProp = {
      handler: '',
    };
    functionConfig.instanceLifecycleConfig = {
      preFreeze: instanceLifecycleConfig?.preFreeze || emptyProp,
      preStop: instanceLifecycleConfig?.preStop || emptyProp,
    };

    if (runtime === 'custom-container') {
      if (!isCustomContainerConfig(customContainerConfig)) {
        throw new Error(`${serviceName}/${functionName} runtime is custom-container, but customContainerConfig is not configured.`);
      }
    } else if (!onlyDeployConfig && !isCode(functionConfig.code)) {
      throw new Error(`${serviceName}/${functionName} code is not configured.`);
    }

    let res;
    try {
      res = await fcClient.updateFunction(serviceName, functionName, functionConfig);
    } catch (ex) {
      if (ex.code !== 'FunctionNotFound' || onlyDeployConfig) {
        this.logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
        vm.fail();
        throw ex;
      }
      functionConfig.functionName = functionName;
      try {
        res = await fcClient.createFunction(serviceName, functionConfig);
      } catch (e) {
        vm.fail();
        throw e;
      }
    }

    let asyncWarn = '';
    try {
      await makeDestination({
        serviceName,
        functionName,
        asyncConfiguration,
      });
    } catch (e) {
      if (_.isEmpty(asyncConfiguration) && e.message.includes('failed with 403')) {
        asyncWarn = e.message;
      } else {
        vm.fail();
        throw e;
      }
    }
    vm.succeed(`Make function ${serviceName}/${functionName} success.`);

    if (asyncWarn) {
      this.logger.warn(`Reminder function.asyncConfig: ${asyncWarn}`);
    }

    return res;
  }

  static async makeTrigger(fcClient, serviceName, functionName, triggerConfig) {
    const { triggerName } = triggerConfig;

    const vm = spinner(`Make trigger ${serviceName}/${functionName}/${triggerName}...`);
    if (triggerConfig.qualifier) {
      triggerConfig.qualifier = triggerConfig.qualifier.toString();
    }

    let res;
    try {
      res = await fcClient.createTrigger(serviceName, functionName, triggerConfig);
    } catch (ex) {
      if (ex.code !== 'TriggerAlreadyExists') {
        this.logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
        vm.fail();
        throw ex;
      }
      try {
        res = await fcClient.updateTrigger(serviceName, functionName, triggerName, triggerConfig);
      } catch (e) {
        if (e.message.includes('Updating trigger is not supported yet.')) {
          vm.warn(`Updating ${serviceName}/${functionName}/${triggerName} is not supported yet.`);
          return triggerConfig;
        }
        vm.fail();
        throw e;
      }
    }

    vm.succeed(`Make trigger ${serviceName}/${functionName}/${triggerName} success.`);
    return res;
  }
}
