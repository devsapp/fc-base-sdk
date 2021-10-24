import _ from 'lodash';
import path from 'path';
import fse from 'fs-extra';
import * as mockData from './mock-data';
import {
  handlerCredentials,
  setupIntegrationTestEnv,
  cleanupIntegrationTestEnv,
  getFcClient,
  deleteResource,
} from './test-utils';
import { InputProps } from '../src/common/entity';
import FcBaseSdkComponent from '../src/index';

const commonInputs: InputProps = {
  appName: 'fc-deploy-test',
  project: {
    access: mockData.ACCESS,
    component: process.cwd(),
    projectName: 'test',
  },
  command: '',
  path: {
    configPath: mockData.MOCK_PROJECT_YAML_PATH,
  },
  args: '-y',
  props: {
    region: mockData.REGION,
    service: mockData.SERVICE_CONFIG,
    function: mockData.FUNCTION_CONFIG,
  },
  credentials: {},
  argsObj: undefined,
};

describe('Integration::deploy', () => {
  let fcClient: any;
  commonInputs.command = 'deploy';
  beforeAll(async () => {
    const { accountId, accessKeyId, accessKeySecret } = handlerCredentials();
    await setupIntegrationTestEnv(mockData.ACCESS, accountId, accessKeyId, accessKeySecret, mockData.MOCK_PROJECT_PATH, mockData.MOCK_PROJECT_YAML_PATH);
    fcClient = getFcClient(mockData.REGION, mockData.DEFAULT_CLIENT_TIMEOUT);
  });

  afterAll(async () => {
    await cleanupIntegrationTestEnv(mockData.ACCESS, mockData.MOCK_PROJECT_PATH);
  });

  afterEach(async () => {
    await fse.remove(path.join(mockData.MOCK_PROJECT_PATH, '.s'));
  });

  it('deploy service with http trigger', async () => {
    try {
      const inputs = _.cloneDeep(commonInputs);
      inputs.props.triggers = [mockData.HTTP_TRIGGER_CONFIG];
      const res = await new FcBaseSdkComponent().deploy(inputs);
          expect(res).toStrictEqual({
            region: mockData.REGION,
            service: mockData.SERVICE_NAME,
            function: mockData.FUNCTION_NAME,
            triggers: [mockData.HTTP_TRIGGER_NAME],
          });
    } finally {
      await deleteResource(fcClient, mockData.SERVICE_NAME, mockData.FUNCTION_NAME, [mockData.HTTP_TRIGGER_NAME]);
    }
  })

  it('update resource', async () => {
    const inputs = _.cloneDeep(commonInputs);
    try {
      const {
        service: serviceName,
        function: functionName,
        triggers,
      } = await new FcBaseSdkComponent().deploy(inputs);

      expect(triggers).toBeUndefined();


      const functionConfig = (await fcClient.getFunction(serviceName, functionName)).data;
      expect(_.isMatch(functionConfig, {
        functionName: inputs.props.function.name,
        description: inputs.props.function.description,
        instanceType: inputs.props.function.instanceType,
        memorySize: inputs.props.function.memorySize,
        initializer: inputs.props.function.initializer,
        environmentVariables: inputs.props.function.environmentVariables,
        instanceLifecycleConfig: inputs.props.function.instanceLifecycleConfig,
      })).toBe(true);

      const serviceConfig = (await fcClient.getService(serviceName)).data;
      expect(_.isMatch(serviceConfig, {
        serviceName: inputs.props.service.name,
        internetAccess: inputs.props.service.internetAccess,
        description: inputs.props.service.description,
        tracingConfig: {
          type: 'Jaeger'
        },
      })).toBe(true);

      const inputs2 = _.cloneDeep(commonInputs);
      delete inputs2.props.service.tracingConfig;
      inputs2.props.function = {
        ...mockData.FUNCTION_CONFIG,
        instanceType: 'c1',
        memorySize: 4096,
        environmentVariables: undefined,
        initializer: undefined,
        instanceLifecycleConfig: undefined,
      };
      await new FcBaseSdkComponent().deploy(inputs2);

      const functionConfig1 = (await fcClient.getFunction(serviceName, functionName)).data;
      expect(_.isMatch(functionConfig1, {
        functionName: inputs2.props.function.name,
        description: inputs2.props.function.description,
        instanceType: 'c1',
        memorySize: 4096,
        initializer: '',
        // environmentVariables: {}, // 这个预期是空对象，需要等 https://github.com/devsapp/fc-base-sdk/pull/18 合并之后才能跑通
        instanceLifecycleConfig: {
          preFreeze: { handler: '' },
          preStop: { handler: '' },
        },
      })).toBe(true);

      const serviceConfig1 = (await fcClient.getService(serviceName)).data;
      expect(_.isMatch(serviceConfig1, {
        tracingConfig: { type: null },
      })).toBe(true);
    } finally {
      await deleteResource(fcClient, mockData.SERVICE_NAME, mockData.FUNCTION_NAME, [mockData.HTTP_TRIGGER_NAME]);
    }
  })
});


describe('Integration::remove', () => {
  let fcClient: any;
  commonInputs.command = 'remove';
  beforeAll(async () => {
    const { accountId, accessKeyId, accessKeySecret } = handlerCredentials();
    await setupIntegrationTestEnv(mockData.ACCESS, accountId, accessKeyId, accessKeySecret, mockData.MOCK_PROJECT_PATH, mockData.MOCK_PROJECT_YAML_PATH);
    fcClient = getFcClient(mockData.REGION, mockData.DEFAULT_CLIENT_TIMEOUT);
  });

  afterAll(async () => {
    await cleanupIntegrationTestEnv(mockData.ACCESS, mockData.MOCK_PROJECT_PATH);
  });

  afterEach(async () => {
    await fse.remove(path.join(mockData.MOCK_PROJECT_PATH, '.s'));
  });

  it('remove all', async () => {
    const inputs = _.cloneDeep(commonInputs);
    inputs.props.triggers = [mockData.HTTP_TRIGGER_CONFIG];
    try {
      await new FcBaseSdkComponent().deploy(inputs);

      const res = await new FcBaseSdkComponent().remove(inputs);
      expect(res).toStrictEqual({
        service: mockData.SERVICE_NAME,
        functions: [mockData.FUNCTION_NAME],
        triggers: [mockData.HTTP_TRIGGER_NAME],
      });

      await expect(fcClient.getService(mockData.SERVICE_NAME)).rejects.toThrowError('404');
    } finally {
      await deleteResource(fcClient, mockData.SERVICE_NAME, mockData.FUNCTION_NAME, [mockData.HTTP_TRIGGER_NAME]);
    }
  })
});
