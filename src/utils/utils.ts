import * as core from '@serverless-devs/core';
import _ from 'lodash';
import Table from 'tty-table';

const { inquirer } = core;


export const tableShow = (data, showKey) => {
  const options = {
    borderStyle: 'solid',
    borderColor: 'blue',
    headerAlign: 'center',
    align: 'left',
    color: 'cyan',
    width: '100%',
  };
  const header_option = {
    headerColor: 'cyan',
    color: 'cyan',
    align: 'left',
    width: 'auto',
    formatter: (value) => value,
  };

  const header = showKey.map((value) => (!_.isString() ? ({
    ...header_option,
    value,
  }) : ({ ...header_option, ...value })));

  // eslint-disable-next-line no-console
  console.log(Table(header, data, options).render());
};

export async function promptForConfirmOrDetails(message: string): Promise<boolean> {
  const answers: any = await inquirer.prompt([{
    type: 'list',
    name: 'prompt',
    message,
    choices: ['yes', 'no'],
  }]);

  return answers.prompt === 'yes';
}

export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export function transfromTriggerConfig(triggerConfig, region, accountId) {
  const {
    name,
    type,
    config,
    qualifier,
    role,
    sourceArn,
  } = triggerConfig;
  if (_.isString(sourceArn) && !_.isNil(sourceArn)) {
    return {
      triggerName: name,
      triggerType: type,
      triggerConfig: config,
      invocationRole: role,
      qualifier,
      sourceArn,
    };
  }
  let arn;

  if (type === 'oss') {
    arn = `acs:oss:${region}:${accountId}:${config.bucketName}`;
  } else if (type === 'log') {
    arn = `acs:log:${region}:${accountId}:project/${config.logConfig.project}`;
  } else if (type === 'mns_topic') {
    arn = `acs:mns:${config.region ? config.region : region}:${accountId}:/topics/${config.topicName}`;
  } else if (type === 'cdn_events') {
    arn = `acs:cdn:*:${accountId}`;
  } else if (type === 'tablestore') {
    arn = `acs:ots:${region}:${accountId}:instance/${config.instanceName}/table/${config.tableName}`;
  }

  return {
    triggerName: name,
    triggerType: type,
    triggerConfig: config,
    invocationRole: role,
    qualifier,
    sourceArn: arn,
  };
}

export function getTargetTriggers(sourceTriggers: any[], onlyDelpoyTriggerName: string | string[]) {
  let needDeployTriggers = [];
  if (_.isString(onlyDelpoyTriggerName)) {
    needDeployTriggers = sourceTriggers.filter(({ name }) => name === onlyDelpoyTriggerName);
    if (_.isEmpty(needDeployTriggers)) {
      throw new Error(`Not found trigger: ${onlyDelpoyTriggerName}`);
    }
  } else {
    const needDeployTriggersName = [];
    for (const triggerConfig of sourceTriggers) {
      if (onlyDelpoyTriggerName.includes(triggerConfig.name)) {
        needDeployTriggers.push(triggerConfig);
        needDeployTriggersName.push(triggerConfig.name);
      }
    }
    const xor = _.xor(needDeployTriggersName, onlyDelpoyTriggerName);
    if (!_.isEmpty(xor)) {
      throw new Error(`Not found trigger: ${xor.toString()}`);
    }
  }
  return needDeployTriggers;
}

/**
 * 深度遍历转化为字符串类型
 * @param source object
 * @returns object
 */
export function objectDeepTransfromString(source) {
  if (_.isArray(source)) {
    return source.map((value) => {
      if (typeof value === 'object') {
        return objectDeepTransfromString(value);
      }
      return value?.toString();
    });
  }

  if (_.isObject(source)) {
    return _.mapValues(source, (value) => {
      if (typeof value === 'object') {
        return objectDeepTransfromString(value);
      }
      // @ts-ignore 不是 object 类型尝试 toString 强制转换为字符串
      return value?.toString();
    });
  }

  return source;
}
