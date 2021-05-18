"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfromTriggerConfig = exports.sleep = void 0;
exports.sleep = function (ms) {
    if (ms === void 0) { ms = 1000; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
function transfromTriggerConfig(triggerConfig, region, accountId) {
    var name = triggerConfig.name, type = triggerConfig.type, config = triggerConfig.config, qualifier = triggerConfig.qualifier, role = triggerConfig.role;
    var arn;
    if (type === 'oss') {
        arn = "acs:oss:" + region + ":" + accountId + ":" + config.bucketName;
    }
    else if (type === 'log') {
        arn = "acs:log:" + region + ":" + accountId + ":project/" + config.logConfig.project;
    }
    else if (type === 'mns_topic') {
        if (config.region) {
            arn = "acs:mns:" + region + ":" + accountId + ":/topics/" + config.topicName;
        }
        arn = "acs:mns:" + region + ":" + accountId + ":/topics/" + config.topicName;
    }
    else if (type === 'cdn_events') {
        arn = "acs:cdn:*:" + accountId;
    }
    else if (type === 'tablestore') {
        arn = "acs:ots:" + region + ":" + accountId + ":instance/" + config.instanceName + "/table/" + config.tableName;
    }
    return {
        triggerName: name,
        triggerType: type,
        triggerConfig: config,
        invocationRole: role,
        qualifier: qualifier,
        sourceArn: arn,
    };
}
exports.transfromTriggerConfig = transfromTriggerConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxLQUFLLEdBQUcsVUFBQyxFQUFTO0lBQVQsbUJBQUEsRUFBQSxTQUFTO0lBQUssT0FBQSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQXZCLENBQXVCLENBQUM7QUFBakQsQ0FBaUQsQ0FBQztBQUV0RixTQUFnQixzQkFBc0IsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFNBQVM7SUFFbkUsSUFBQSxJQUFJLEdBS0YsYUFBYSxLQUxYLEVBQ0osSUFBSSxHQUlGLGFBQWEsS0FKWCxFQUNKLE1BQU0sR0FHSixhQUFhLE9BSFQsRUFDTixTQUFTLEdBRVAsYUFBYSxVQUZOLEVBQ1QsSUFBSSxHQUNGLGFBQWEsS0FEWCxDQUNZO0lBQ2xCLElBQUksR0FBRyxDQUFDO0lBRVIsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ2xCLEdBQUcsR0FBRyxhQUFXLE1BQU0sU0FBSSxTQUFTLFNBQUksTUFBTSxDQUFDLFVBQVksQ0FBQztLQUM3RDtTQUFNLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtRQUN6QixHQUFHLEdBQUcsYUFBVyxNQUFNLFNBQUksU0FBUyxpQkFBWSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQVMsQ0FBQztLQUM1RTtTQUFNLElBQUksSUFBSSxLQUFLLFdBQVcsRUFBRTtRQUMvQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDakIsR0FBRyxHQUFHLGFBQVcsTUFBTSxTQUFJLFNBQVMsaUJBQVksTUFBTSxDQUFDLFNBQVcsQ0FBQztTQUNwRTtRQUNELEdBQUcsR0FBRyxhQUFXLE1BQU0sU0FBSSxTQUFTLGlCQUFZLE1BQU0sQ0FBQyxTQUFXLENBQUM7S0FDcEU7U0FBTSxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDaEMsR0FBRyxHQUFHLGVBQWEsU0FBVyxDQUFDO0tBQ2hDO1NBQU0sSUFBSSxJQUFJLEtBQUssWUFBWSxFQUFFO1FBQ2hDLEdBQUcsR0FBRyxhQUFXLE1BQU0sU0FBSSxTQUFTLGtCQUFhLE1BQU0sQ0FBQyxZQUFZLGVBQVUsTUFBTSxDQUFDLFNBQVcsQ0FBQztLQUNsRztJQUVELE9BQU87UUFDTCxXQUFXLEVBQUUsSUFBSTtRQUNqQixXQUFXLEVBQUUsSUFBSTtRQUNqQixhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsSUFBSTtRQUNwQixTQUFTLFdBQUE7UUFDVCxTQUFTLEVBQUUsR0FBRztLQUNmLENBQUM7QUFDSixDQUFDO0FBakNELHdEQWlDQyJ9