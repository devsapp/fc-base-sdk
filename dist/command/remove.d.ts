import { ILogger } from '@serverless-devs/core';
import { IProperties } from '../common/entity';
interface RemoveInputsProps {
    force?: boolean;
    silent?: boolean;
    triggerName?: string;
}
export default class Component {
    logger: ILogger;
    fcClient: any;
    region: any;
    removeNameList: any;
    constructor(region: any);
    trigger(props: IProperties, { force, silent, triggerName }: RemoveInputsProps, command?: string): Promise<void>;
    function(props: IProperties, { force, silent }: RemoveInputsProps, command?: string): Promise<void>;
    service(props: IProperties, { force, silent }: RemoveInputsProps): Promise<void>;
    all(props: IProperties, removeInputs: RemoveInputsProps): Promise<void>;
    private deleteService;
    private deleteFunction;
    private deleteTrigger;
    private unsetState;
    private getDeleteList;
    private getListData;
}
export {};
