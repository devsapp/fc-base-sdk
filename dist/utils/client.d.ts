import Pop from '@alicloud/pop-core';
import { ICredentials } from '../interface/inputs';
export default class Client {
    static region: string;
    static credentials: ICredentials;
    static fcClient(): any;
    static xtraceClient(): Pop;
}
