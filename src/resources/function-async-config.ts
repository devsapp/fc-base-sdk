import _ from 'lodash';
import Client from '../utils/client';

export async function makeDestination({
  serviceName,
  functionName,
  asyncConfiguration,
  qualifier = 'LATEST',
}) {
  if (_.isEmpty(asyncConfiguration)) { return; }
  const accountId = Client.credentials.AccountID;
  const { region } = Client;
  const fcClient = Client.fcClient();

  const destination = asyncConfiguration?.destination || {};
  delete asyncConfiguration?.destination;

  asyncConfiguration.destinationConfig = destination;
  const { onSuccess, onFailure } = destination;
  if (onSuccess) {
    asyncConfiguration.destinationConfig.onSuccess = {
      destination: onSuccess.replace(':::', `:${region}:${accountId}:`),
    };
  }
  if (onFailure) {
    asyncConfiguration.destinationConfig.onFailure = {
      destination: onFailure.replace(':::', `:${region}:${accountId}:`),
    };
  }

  let hasAsyncConfig = false;
  try {
    const { data } = await fcClient.getFunctionAsyncConfig(serviceName, functionName, qualifier);
    const asyncConfigCache = {
      destinationConfig: data.destinationConfig,
      maxAsyncEventAgeInSeconds: data.maxAsyncEventAgeInSeconds,
      statefulInvocation: data.statefulInvocation,
      maxAsyncRetryAttempts: data.maxAsyncRetryAttempts,
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
    await fcClient.deleteFunctionAsyncConfig(serviceName, functionName, qualifier);
  }

  if (asyncConfiguration) {
    await fcClient.putFunctionAsyncConfig(serviceName, functionName, qualifier, asyncConfiguration);
  }
}
