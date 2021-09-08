import { ILogger } from '@serverless-devs/core';
import { IProperties } from '../common/entity';
export default class Component {
    static logger: ILogger;
    /**
     * 部署资源
     * @param props
     * @param param1
     *  command: 执行的二级指令：service、function、trigger 或者为空，为空时部署所有
     *  type：部署的类型：all、config、code
     *  onlyDelpoyTriggerName：当 command 为 trigger 时生效，仅部署哪些触发器
     * @returns
     */
    static deploy(props: IProperties, { command, type, onlyDelpoyTriggerName }: {
        command: any;
        type: any;
        onlyDelpoyTriggerName: any;
    }): Promise<any>;
    static makeService(fcClient: any, serviceConfig: any): Promise<any>;
    static makeFunction(fcClient: any, functionConfig: any, type: any): Promise<any>;
    static makeTrigger(fcClient: any, serviceName: any, functionName: any, triggerConfig: any): Promise<any>;
}
