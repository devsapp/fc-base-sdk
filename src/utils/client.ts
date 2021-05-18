import FC from '@alicloud/fc2';
import { ICredentials } from '../interface/inputs';

export default class Client {
  static fcClient: any;

  static setFcClient(region: string, credentials: ICredentials) {
    const {
      AccountID,
      AccessKeyID,
      AccessKeySecret,
    } = credentials;

    const fcClient = new FC(AccountID, {
      accessKeyID: AccessKeyID,
      accessKeySecret: AccessKeySecret,
      region,
      timeout: 6000000,
    });

    this.fcClient = fcClient;

    return fcClient;
  }
}
