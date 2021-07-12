"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfromTriggerConfig = exports.sleep = exports.promptForConfirmOrDetails = exports.tableShow = void 0;
var inquirer_1 = __importDefault(require("inquirer"));
var lodash_1 = __importDefault(require("lodash"));
var tty_table_1 = __importDefault(require("tty-table"));
exports.tableShow = function (data, showKey) {
    var options = {
        borderStyle: 'solid',
        borderColor: 'blue',
        headerAlign: 'center',
        align: 'left',
        color: 'cyan',
        width: '100%',
    };
    var header_option = {
        headerColor: 'cyan',
        color: 'cyan',
        align: 'left',
        width: 'auto',
        formatter: function (value) { return value; },
    };
    var header = showKey.map(function (value) { return (!lodash_1.default.isString() ? (__assign(__assign({}, header_option), { value: value })) : (__assign(__assign({}, header_option), value))); });
    console.log(tty_table_1.default(header, data, options).render());
};
function promptForConfirmOrDetails(message) {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'list',
                            name: 'prompt',
                            message: message,
                            choices: ['yes', 'no'],
                        }])];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, answers.prompt === 'yes'];
            }
        });
    });
}
exports.promptForConfirmOrDetails = promptForConfirmOrDetails;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBZ0M7QUFDaEMsa0RBQXVCO0FBQ3ZCLHdEQUE4QjtBQUdqQixRQUFBLFNBQVMsR0FBRyxVQUFDLElBQUksRUFBRSxPQUFPO0lBQ3JDLElBQU0sT0FBTyxHQUFHO1FBQ2QsV0FBVyxFQUFFLE9BQU87UUFDcEIsV0FBVyxFQUFFLE1BQU07UUFDbkIsV0FBVyxFQUFFLFFBQVE7UUFDckIsS0FBSyxFQUFFLE1BQU07UUFDYixLQUFLLEVBQUUsTUFBTTtRQUNiLEtBQUssRUFBRSxNQUFNO0tBQ2QsQ0FBQztJQUNGLElBQU0sYUFBYSxHQUFHO1FBQ3BCLFdBQVcsRUFBRSxNQUFNO1FBQ25CLEtBQUssRUFBRSxNQUFNO1FBQ2IsS0FBSyxFQUFFLE1BQU07UUFDYixLQUFLLEVBQUUsTUFBTTtRQUNiLFNBQVMsRUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssRUFBTCxDQUFLO0tBQzVCLENBQUM7SUFFRixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsQ0FBQyxDQUFDLGdCQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUNsRCxhQUFhLEtBQ2hCLEtBQUssT0FBQSxJQUNMLENBQUMsQ0FBQyxDQUFDLHVCQUFNLGFBQWEsR0FBSyxLQUFLLEVBQUcsQ0FBQyxFQUhBLENBR0EsQ0FBQyxDQUFDO0lBRXhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDO0FBRUYsU0FBc0IseUJBQXlCLENBQUMsT0FBZTs7Ozs7d0JBQ3hDLHFCQUFNLGtCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQzFDLElBQUksRUFBRSxNQUFNOzRCQUNaLElBQUksRUFBRSxRQUFROzRCQUNkLE9BQU8sU0FBQTs0QkFDUCxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO3lCQUN2QixDQUFDLENBQUMsRUFBQTs7b0JBTEcsT0FBTyxHQUFRLFNBS2xCO29CQUVILHNCQUFPLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFDOzs7O0NBQ2pDO0FBVEQsOERBU0M7QUFFWSxRQUFBLEtBQUssR0FBRyxVQUFDLEVBQVM7SUFBVCxtQkFBQSxFQUFBLFNBQVM7SUFBSyxPQUFBLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQztBQUFqRCxDQUFpRCxDQUFDO0FBRXRGLFNBQWdCLHNCQUFzQixDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsU0FBUztJQUVuRSxJQUFBLElBQUksR0FLRixhQUFhLEtBTFgsRUFDSixJQUFJLEdBSUYsYUFBYSxLQUpYLEVBQ0osTUFBTSxHQUdKLGFBQWEsT0FIVCxFQUNOLFNBQVMsR0FFUCxhQUFhLFVBRk4sRUFDVCxJQUFJLEdBQ0YsYUFBYSxLQURYLENBQ1k7SUFDbEIsSUFBSSxHQUFHLENBQUM7SUFFUixJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7UUFDbEIsR0FBRyxHQUFHLGFBQVcsTUFBTSxTQUFJLFNBQVMsU0FBSSxNQUFNLENBQUMsVUFBWSxDQUFDO0tBQzdEO1NBQU0sSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ3pCLEdBQUcsR0FBRyxhQUFXLE1BQU0sU0FBSSxTQUFTLGlCQUFZLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBUyxDQUFDO0tBQzVFO1NBQU0sSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO1FBQy9CLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQixHQUFHLEdBQUcsYUFBVyxNQUFNLFNBQUksU0FBUyxpQkFBWSxNQUFNLENBQUMsU0FBVyxDQUFDO1NBQ3BFO1FBQ0QsR0FBRyxHQUFHLGFBQVcsTUFBTSxTQUFJLFNBQVMsaUJBQVksTUFBTSxDQUFDLFNBQVcsQ0FBQztLQUNwRTtTQUFNLElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTtRQUNoQyxHQUFHLEdBQUcsZUFBYSxTQUFXLENBQUM7S0FDaEM7U0FBTSxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDaEMsR0FBRyxHQUFHLGFBQVcsTUFBTSxTQUFJLFNBQVMsa0JBQWEsTUFBTSxDQUFDLFlBQVksZUFBVSxNQUFNLENBQUMsU0FBVyxDQUFDO0tBQ2xHO0lBRUQsT0FBTztRQUNMLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLGFBQWEsRUFBRSxNQUFNO1FBQ3JCLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLFNBQVMsV0FBQTtRQUNULFNBQVMsRUFBRSxHQUFHO0tBQ2YsQ0FBQztBQUNKLENBQUM7QUFqQ0Qsd0RBaUNDIn0=