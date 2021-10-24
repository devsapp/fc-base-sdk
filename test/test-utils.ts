import * as core from '@serverless-devs/core';
import FC from '@alicloud/fc2';
import fse from 'fs-extra';
import yaml from 'js-yaml';
import path from 'path';
import dotenv from 'dotenv';
import { isEmpty } from 'lodash';
import os from 'os';

export function handlerCredentials() {
  dotenv.config({path: path.join(__dirname, '.env')});

  const accountId: string = process.env.AccountID;
  const accessKeyId: string = process.env.AccessKeyID;
  const accessKeySecret: string =  process.env.AccessKeySecret;

  return { accountId, accessKeyId, accessKeySecret };
}

export function getFcClient(region: string, timeout: number) {
  const { accountId, accessKeyId, accessKeySecret } = handlerCredentials();
  return new FC(accountId, {
    accessKeyID: accessKeyId,
    accessKeySecret: accessKeySecret,
    region,
    timeout,
  });
}

export async function deleteResource(fcClient, serviceName, functionName, triggerNames) {
  if (!isEmpty(triggerNames)) {
    for (const triggerName of triggerNames) {
      try {
        await fcClient.deleteTrigger(serviceName, functionName, triggerName);
      } catch (_e) {}
    }
  }

  if (functionName) {
    try {
      await fcClient.deleteFunction(serviceName, functionName);
    } catch (_e) {}
  }

  try {
    await fcClient.deleteService(serviceName);
  } catch (_e) {}
  
}

export async function setupIntegrationTestEnv(access: string, accoundId: string, accessKeyId: string, accessKetSecret: string, cwd: string, templateFile: string) {
  await core.setKnownCredential({
    AccountID: accoundId,
    AccessKeyID: accessKeyId,
    AccessKeySecret: accessKetSecret,
  }, access);
  process.chdir(cwd);
  process.env.templateFile = templateFile;
}

export async function cleanupIntegrationTestEnv(access: string, cwd: string) {
  const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
  const accessFileInfo = yaml.load(fse.readFileSync(accessFile, 'utf8') || '{}');
  if (accessFileInfo[access]) {
    delete accessFileInfo[access];
    fse.writeFileSync(accessFile, Object.keys(accessFileInfo).length > 0 ? yaml.dump(accessFileInfo) : '');
  }
  await fse.remove(path.join(cwd, '.s'));
}
