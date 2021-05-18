export declare const sleep: (ms?: number) => Promise<unknown>;
export declare function transfromTriggerConfig(triggerConfig: any, region: any, accountId: any): {
    triggerName: any;
    triggerType: any;
    triggerConfig: any;
    invocationRole: any;
    qualifier: any;
    sourceArn: any;
};
