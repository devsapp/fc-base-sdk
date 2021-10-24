import * as path from 'path';
import { IServiceConfig } from '../src/interface/service';
import { IFunctionConfig } from '../src/interface/function';
import { ITriggerConfig } from '../src/interface/trigger';

export const ACCESS = `access-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const REGION = 'cn-hangzhou';
export const MOCK_PROJECT_PATH: string = path.join(__dirname, 'mock-project');
export const MOCK_PROJECT_YAML_PATH: string = path.join(MOCK_PROJECT_PATH, 's.yaml');
export const DEFAULT_CLIENT_TIMEOUT = 600 * 1000;

export const SERVICE_NAME = `test-service-${Math.random().toString(36).substr(2)}`;
export const FUNCTION_NAME = 'testFunction';
export const HTTP_TRIGGER_NAME = 'httpTrigger';

export const SERVICE_CONFIG: IServiceConfig = {
  name: SERVICE_NAME,
  description: 'This is for fc-deploy test',
  internetAccess: true,
  tracingConfig: 'Enable',
};

export const FUNCTION_CONFIG: IFunctionConfig = {
  name: FUNCTION_NAME,
  service: SERVICE_NAME,
  description: 'This is for fc-deploy test',
  memorySize: 128,
  handler: 'index.handler',
  runtime: 'nodejs12',
  filename: path.join(MOCK_PROJECT_PATH, 'code.zip'),
  timeout: 60,
  instanceConcurrency: 1,
  instanceType: 'e1',
  environmentVariables: {
    key: 'value',
  },
  initializationTimeout: 30,
  initializer: 'index.initializer',
  instanceLifecycleConfig: {
    preFreeze: {
      handler: 'index.preFreeze',
      timeout: 30,
    },
    preStop: {
      handler: 'index.preStop',
      timeout: 30,
    },
  }
}

export const HTTP_TRIGGER_CONFIG: ITriggerConfig = {
  name: HTTP_TRIGGER_NAME,
  function: FUNCTION_NAME,
  service: SERVICE_NAME,
  type: 'http',
  config: {
    authType: 'anonymous',
    methods: ['POST', 'GET']
  },
};
