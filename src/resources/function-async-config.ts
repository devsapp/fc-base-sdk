import _ from 'lodash';
import Client from '../utils/client';

export async function makeDestination({
  serviceName,
  functionName,
  asyncConfiguration,
  qualifier = 'LATEST',
}) {
  const accountId = Client.credentials.AccessKeyID;
  const region = Client.region;
  const fcClient = Client.fcClient();
  const { onSuccess, onFailure } = asyncConfiguration?.destination || {};

  if (onSuccess) {
    asyncConfiguration.destination.onSuccess = {
      destination: onSuccess.replace(':::', `:${region}:${accountId}:`)
    };
  }
  if (onFailure) {
    asyncConfiguration.destination.onFailure = {
      destination: onFailure.replace(':::', `:${region}:${accountId}:`)
    };
  }

  let hasAsyncConfig = false;
  try {
    const { data } = await fcClient.getFunctionAsyncConfig(serviceName, functionName, qualifier);
    const asyncConfigCache = {
      destinationConfig: data.destinationConfig,
      maxAsyncEventAgeInSeconds: data.maxAsyncEventAgeInSeconds,
      statefulInvocation: data.statefulInvocation,
      maxAsyncRetryAttempts: data.maxAsyncRetryAttempts
    };
    if (_.isEqual(asyncConfiguration, asyncConfigCache)) {
      return;
    }
    hasAsyncConfig = true;
  } catch (ex) {
    if (ex.code !== 'AsyncConfigNotExists') {
      throw ex;
    }
  }

  if (hasAsyncConfig) {
    try {
      await fcClient.deleteFunctionAsyncConfig(serviceName, functionName, qualifier);
    } catch (ex) {
      throw ex;
    }
  }

  if (asyncConfiguration) {
    try {
      await fcClient.putFunctionAsyncConfig(serviceName, functionName, qualifier, asyncConfiguration);
    } catch (ex) {
      throw ex;
    }
  }
}
