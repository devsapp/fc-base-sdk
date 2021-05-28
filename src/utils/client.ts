import FC from '@alicloud/fc2';
import { ICredentials } from '../interface/inputs';

export default class Client {
  static fcClient: any;

  static setFcClient(region: string, credentials: ICredentials) {
    const {
      AccountID,
      AccessKeyID,
      AccessKeySecret,
      SecurityToken,
    } = credentials;

    const fcClient = new FC(AccountID, {
      accessKeyID: AccessKeyID,
      accessKeySecret: AccessKeySecret,
      securityToken: SecurityToken,
      region,
      timeout: 6000000,
    });

    this.fcClient = fcClient;

    return fcClient;
  }
}
