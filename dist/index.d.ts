import { ILogger } from '@serverless-devs/core';
import { InputProps } from './common/entity';
import Base from './common/base';
export default class Component extends Base {
    logger: ILogger;
    deploy(inputs: InputProps): Promise<any>;
    remove(inputs: InputProps): Promise<any>;
    private reportNames;
    private initInputs;
}
