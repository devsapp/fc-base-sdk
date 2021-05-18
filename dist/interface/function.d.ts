export interface IFunctionConfig {
    name: string;
    service?: string;
    description?: string;
    caPort?: number;
    customContainerConfig?: ICustomContainerConfig;
    handler: string;
    memorySize?: number;
    runtime: string;
    timeout?: number;
    environmentVariables?: {
        [key: string]: any;
    };
    initializationTimeout?: number;
    initializer?: string;
    instanceConcurrency?: number;
    instanceType?: string;
    filename?: string;
    ossBucket?: string;
    ossKey?: string;
    code?: ICodeZipFile | ICodeOss;
}
export interface ICustomContainerConfig {
    image: string;
    command?: string;
    args?: string;
}
export declare function isCustomContainerConfig(args: any): args is ICustomContainerConfig;
export interface ICodeZipFile {
    zipFile: string;
}
export interface ICodeOss {
    ossBucketName: string;
    ossObjectName: string;
}
export declare function isCode(args: any): args is ICodeZipFile | ICodeOss;
