import { IServiceConfig } from './service';
import { IFunctionConfig } from './function';
import { ITriggerConfig } from './trigger';
export interface IInputProps {
    props: any;
    credentials: ICredentials;
    appName: string;
    project: {
        component: string;
        access: string;
        projectName: string;
    };
    command: string;
    args: string;
    path: {
        configPath: string;
    };
}
export interface IProperties {
    region: string;
    service: IServiceConfig;
    function?: IFunctionConfig;
    triggers?: ITriggerConfig[];
}
export interface ICredentials {
    AccountID?: string;
    AccessKeyID?: string;
    AccessKeySecret?: string;
    SecretID?: string;
    SecretKey?: string;
    SecretAccessKey?: string;
    KeyVaultName?: string;
    TenantID?: string;
    ClientID?: string;
    ClientSecret?: string;
    PrivateKeyData?: string;
    SecurityToken?: string;
}
