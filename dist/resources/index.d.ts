import { ILogger } from '@serverless-devs/core';
import { IProperties } from '../interface/inputs';
export default class Component {
    static client: any;
    static logger: ILogger;
    static remove(props: IProperties, { nonOptionsArg, name }: {
        nonOptionsArg: any;
        name: any;
    }): Promise<void>;
    static deploy(props: IProperties): Promise<any>;
    static makeService(name: any, serviceConfig: any): Promise<any>;
    static makeFunction(serviceName: any, functionName: any, functionConfig: any): Promise<any>;
    static makeTrigger(serviceName: any, functionName: any, triggerConfig: any): Promise<any>;
}
