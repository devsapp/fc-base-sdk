/* eslint-disable no-await-in-loop */
/* eslint-disable require-atomic-updates */
import { ILogger, HLogger, spinner } from '@serverless-devs/core';
import fs from 'fs';
import _ from 'lodash';
// import path from 'path';
import Client from '../utils/client';
import { transfromTriggerConfig } from '../utils/utils';
import { IProperties } from '../common/entity';
import { isCode, isCustomContainerConfig } from '../interface/function';
import { makeDestination } from './function-async-config';

export default class Component {
  @HLogger('FC-BASE-SDK') static logger: ILogger;

  static async deploy(props: IProperties, { command, type, onlyDelpoyTriggerName }): Promise<any> {
    const { region, service, function: functionConfig, triggers } = props;
    const fcClient = Client.fcClient();
    const deployRes: any = {};

    const deployConfig = type === 'all' || type === 'config';
    if ((!command || command === 'service') && deployConfig) {
      deployRes.service = await this.makeService(fcClient, service);
    }

    const commandIsFunction = command === 'function';
    if (commandIsFunction && _.isEmpty(functionConfig)) {
      throw new Error('The deployment function was specified, but the function configuration was not found');
    }
    if ((!command || commandIsFunction) && functionConfig) {
      deployRes.function = await this.makeFunction(fcClient, functionConfig, type);
    }

    const commandIsTirgger = command === 'trigger';
    if (commandIsTirgger && _.isEmpty(triggers)) {
      throw new Error('The deployment trigger was specified, but the trigger configuration was not found');
    }
    if ((!command || commandIsTirgger) && triggers) {
      const triggersRes = [];
      const deployOneTrigger = async (triggerConfig) => {
        return await this.makeTrigger(
          fcClient,
          triggerConfig.service,
          triggerConfig.function,
          transfromTriggerConfig(triggerConfig, region, Client.credentials.AccountID),
        );
      };

      if (commandIsTirgger && onlyDelpoyTriggerName) {
        for (const triggerConfig of triggers) {
          if (triggerConfig.name === onlyDelpoyTriggerName) {
            triggersRes.push(await deployOneTrigger(triggerConfig));
            return;
          }
        }
        throw new Error(`Not fount trigger: ${onlyDelpoyTriggerName}`);
      }
      for (const triggerConfig of triggers) {
        triggersRes.push(await deployOneTrigger(triggerConfig));
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
    } = serviceConfig;

    if (!logConfig) {
      serviceConfig.logConfig = {
        project: '',
        logstore: '',
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
        throw new Error(e.message);
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
    } = functionConfig;
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

    if (functionConfig.environmentVariables) {
      functionConfig.environmentVariables = _.mapValues(functionConfig.environmentVariables, (value) => value.toString());
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
