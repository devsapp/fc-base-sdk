import inquirer from 'inquirer';
import _ from 'lodash';
import Table from 'tty-table';


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
  } = triggerConfig;
  let arn;

  if (type === 'oss') {
    arn = `acs:oss:${region}:${accountId}:${config.bucketName}`;
  } else if (type === 'log') {
    arn = `acs:log:${region}:${accountId}:project/${config.logConfig.project}`;
  } else if (type === 'mns_topic') {
    if (config.region) {
      arn = `acs:mns:${region}:${accountId}:/topics/${config.topicName}`;
    }
    arn = `acs:mns:${region}:${accountId}:/topics/${config.topicName}`;
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
