export declare const tableShow: (data: any, showKey: any) => void;
export declare function promptForConfirmOrDetails(message: string): Promise<boolean>;
export declare const sleep: (ms?: number) => Promise<unknown>;
export declare function transfromTriggerConfig(triggerConfig: any, region: any, accountId: any): {
    triggerName: any;
    triggerType: any;
    triggerConfig: any;
    invocationRole: any;
    qualifier: any;
    sourceArn: any;
};
export declare function getTargetTriggers(sourceTriggers: any[], onlyDelpoyTriggerName: string | string[]): any[];
/**
 * 深度遍历转化为字符串类型
 * @param source object
 * @returns object
 */
export declare function objectDeepTransfromString(source: any): any;
