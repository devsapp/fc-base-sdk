export interface IServiceConfig {
    name: string;
    description?: string;
    internetAccess?: boolean;
    logConfig?: ILogConfig;
    role?: string;
    vpcConfig?: IVpcConfig;
    nasConfig?: INasConfig;
}
export interface ILogConfig {
    project: string;
    logstore: string;
    enableRequestMetrics?: boolean;
}
export interface IVpcConfig {
    securityGroupId: string;
    vswitchIds: string[];
    vpcId: string;
}
export interface INasConfig {
    userId?: number;
    groupId?: number;
    mountPoints: IMountPoint[];
}
export interface IMountPoint {
    serverAddr: string;
    mountDir: string;
}
