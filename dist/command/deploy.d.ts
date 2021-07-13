import { ILogger } from '@serverless-devs/core';
import { IProperties } from '../common/entity';
export default class Component {
    static logger: ILogger;
    static deploy(props: IProperties, { command, type, onlyDelpoyTriggerName }: {
        command: any;
        type: any;
        onlyDelpoyTriggerName: any;
    }): Promise<any>;
    static makeService(fcClient: any, serviceConfig: any): Promise<any>;
    static makeFunction(fcClient: any, functionConfig: any, type: any): Promise<any>;
    static makeTrigger(fcClient: any, serviceName: any, functionName: any, triggerConfig: any): Promise<any>;
}
