import { ILogger, HLogger, commandParse, help, getCredential, reportComponent } from '@serverless-devs/core';
import { InputProps } from './common/entity';
import Client from './utils/client';
import _ from 'lodash';
import Deploy from './command/deploy';
import Remove from './command/remove';
import { REMOVE_HELP_INFO } from './static';

export default class Component {
  @HLogger('FC-BASE-SDK') logger: ILogger;

  async initInputs(inputs: InputProps, command: string) {
    const { region } = inputs.props;
    if (!inputs.credentials) {
      inputs.credentials = await getCredential(inputs.project.access);
    }

    reportComponent('FC-BASE-SDK', {
      command,
      uid: inputs.credentials.AccountID,
    });

    Client.credentials = inputs.credentials;
    Client.region = region;

    this.logger.debug(JSON.stringify(_.pick(inputs, ['props', 'appName', 'project', 'args']), null, '  '));
    return inputs;
  }

  async deploy(inputs: InputProps) {
    const newInputs = await this.initInputs(_.cloneDeep(inputs), 'deploy');

    return await Deploy.deploy(newInputs.props);
  }

  async remove(inputs: InputProps) {
    const { args = '', props } = await this.initInputs(_.cloneDeep(inputs), 'remove');

    /**
     * 如果指定了 only-local，那么不和远端交互，仅删除传入配置【权重大于 y/assume-yes】
     * 如果指定了 y/assume-yes，那么就强制删除线上所有配置，为防止没有权限查询线上所有，并尝试删除传入的配置
     * 如果没有指定 only-local、y/assume-yes，那么拿远端资源和传入配置做对比，如果远端存在传入配置没有的资源，则提示是否删除额外的所有此项子资源
     *  - 如果选择 yes，行为类同 y/assume-yes
     *  - 如果选择 no，行为类同 only-local
     */
    const apts = {
      boolean: ['help', 'y', 'only-local'],
      string: ['trigger-name'],
      alias: { help: 'h', triggerName: 'trigger-name', 'assume-yes': 'y' },
    };
    const parsedArgs: {[key: string]: any} = commandParse({ args }, apts);
    const nonOptionsArgs = parsedArgs.data?._ || [];
    const { y: force, triggerName, 'only-local': silent } = parsedArgs.data || {};

    if (nonOptionsArgs.length > 1) {
      this.logger.error(' error: expects argument.');
      return help(REMOVE_HELP_INFO);
    }

    const command = nonOptionsArgs[0] || 'service';
    const supportCommand = ['service', 'function', 'trigger'];
    if (!supportCommand.includes(command)) {
      this.logger.error(` remove ${command} is not supported now.`);
      return help(REMOVE_HELP_INFO);
    }
    const remove = new Remove(props.region);
    await remove[command](props, { force, triggerName, silent });
    return remove.removeNameList;
  }
}
