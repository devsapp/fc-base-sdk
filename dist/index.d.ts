import { ILogger } from '@serverless-devs/core';
import { IInputProps } from './interface/inputs';
export default class Component {
    logger: ILogger;
    initInputs(inputs: IInputProps, command: string): Promise<IInputProps>;
    deploy(inputs: IInputProps): Promise<any>;
    remove(inputs: IInputProps): Promise<void>;
}
