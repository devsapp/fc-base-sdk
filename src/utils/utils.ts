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
