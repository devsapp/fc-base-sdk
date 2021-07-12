import { ILogger } from '@serverless-devs/core';
import { InputProps } from './common/entity';
export default class Component {
    logger: ILogger;
    initInputs(inputs: InputProps, command: string): Promise<InputProps>;
    deploy(inputs: InputProps): Promise<any>;
    remove(inputs: InputProps): Promise<any>;
}
