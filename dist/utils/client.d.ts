import { ICredentials } from '../interface/inputs';
export default class Client {
    static fcClient: any;
    static setFcClient(region: string, credentials: ICredentials): any;
}
