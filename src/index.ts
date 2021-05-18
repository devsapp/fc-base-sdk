import { ILogger, HLogger, commandParse, help } from '@serverless-devs/core';
import { IInputProps } from './interface/inputs';
import Client from './utils/client';
import _ from 'lodash';
import Resources from './resources';
import { REMOVE_HELP_INFO } from './static';

export default class Component {
  @HLogger('FC-BASE-SDK') logger: ILogger;

  initInputs(inputs: IInputProps) {
    this.logger.debug(inputs.props);

    const { region } = inputs.props;
    Client.setFcClient(region, inputs.credentials);

    this.logger.debug(JSON.stringify(_.pick(inputs, ['props', 'appName', 'project', 'args']), null, '  '));
    return inputs;
  }

  async deploy(inputs: IInputProps) {
    const newInputs = this.initInputs(_.cloneDeep(inputs));

    return await Resources.deploy(newInputs.props);
  }

  async remove(inputs: IInputProps) {
    const { args, props } = this.initInputs(_.cloneDeep(inputs));

    const apts = {
      boolean: ['help', 'assumeYes'],
      string: ['name'],
      alias: { help: 'h', assumeYes: 'y', name: 'n' },
    };
    const parsedArgs: {[key: string]: any} = commandParse({ args }, apts);
    const nonOptionsArgs = parsedArgs.data?._;
    const { name } = parsedArgs.data || {};

    if (_.isEmpty(nonOptionsArgs)) {
      this.logger.error(' error: expects argument.');
      help(REMOVE_HELP_INFO);
      return;
    }
    if (nonOptionsArgs.length > 1) {
      this.logger.error(` error: unexpected argument: ${nonOptionsArgs[1]}`);
      help(REMOVE_HELP_INFO);
      return;
    }
    const nonOptionsArg = nonOptionsArgs[0];
    if (!['service', 'function', 'trigger'].includes(nonOptionsArg)) {
      this.logger.error(` remove ${nonOptionsArg} is not supported now.`);
      help(REMOVE_HELP_INFO);
      return;
    }

    return await Resources.remove(props, { nonOptionsArg, name });
  }
}
