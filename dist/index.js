"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var core_1 = require("@serverless-devs/core");
var client_1 = __importDefault(require("./utils/client"));
var lodash_1 = __importDefault(require("lodash"));
var deploy_1 = __importDefault(require("./command/deploy"));
var remove_1 = __importDefault(require("./command/remove"));
var static_1 = require("./static");
var supportCommand = ['service', 'function', 'trigger'];
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.initInputs = function (inputs, command) {
        return __awaiter(this, void 0, void 0, function () {
            var region, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        region = inputs.props.region;
                        if (!!inputs.credentials) return [3 /*break*/, 2];
                        _a = inputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _a.credentials = _b.sent();
                        _b.label = 2;
                    case 2:
                        core_1.reportComponent('FC-BASE-SDK', {
                            command: command,
                            uid: inputs.credentials.AccountID,
                        });
                        client_1.default.credentials = inputs.credentials;
                        client_1.default.region = region;
                        this.logger.debug(JSON.stringify(lodash_1.default.pick(inputs, ['props', 'appName', 'project', 'args']), null, '  '));
                        return [2 /*return*/, inputs];
                }
            });
        });
    };
    Component.prototype.deploy = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var newInputs, apts, parsedArgs, nonOptionsArgs, _c, triggerName, type, command;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.initInputs(lodash_1.default.cloneDeep(inputs), 'deploy')];
                    case 1:
                        newInputs = _d.sent();
                        apts = {
                            boolean: ['help'],
                            string: ['trigger-name', 'type'],
                            alias: { help: 'h' },
                        };
                        parsedArgs = core_1.commandParse({ args: inputs.args }, apts);
                        nonOptionsArgs = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        _c = parsedArgs.data || {}, triggerName = _c["trigger-name"], type = _c.type;
                        if (nonOptionsArgs.length > 1) {
                            this.logger.error(' error: expects argument.');
                            return [2 /*return*/, core_1.help('')];
                        }
                        if (!lodash_1.default.isEmpty(type) && !['config', 'code'].includes(type)) {
                            throw new Error("Type does not support " + type + ", only config and code are supported");
                        }
                        command = nonOptionsArgs[0];
                        if (command && !supportCommand.includes(command)) {
                            this.logger.error(" deploy " + command + " is not supported now.");
                            return [2 /*return*/, core_1.help('')];
                        }
                        if ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.help) {
                            return [2 /*return*/, core_1.help()];
                        }
                        return [4 /*yield*/, deploy_1.default.deploy(newInputs.props, {
                                command: command,
                                type: type || 'all',
                                onlyDelpoyTriggerName: triggerName,
                            })];
                    case 2: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    Component.prototype.remove = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, args, props, apts, parsedArgs, nonOptionsArgs, _d, force, triggerName, silent, command, remove;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.initInputs(lodash_1.default.cloneDeep(inputs), 'remove')];
                    case 1:
                        _b = _e.sent(), _c = _b.args, args = _c === void 0 ? '' : _c, props = _b.props;
                        apts = {
                            boolean: ['help', 'y', 'only-local'],
                            string: ['trigger-name'],
                            alias: { help: 'h', triggerName: 'trigger-name', 'assume-yes': 'y' },
                        };
                        parsedArgs = core_1.commandParse({ args: args }, apts);
                        nonOptionsArgs = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        _d = parsedArgs.data || {}, force = _d.y, triggerName = _d.triggerName, silent = _d["only-local"];
                        if (nonOptionsArgs.length > 1) {
                            this.logger.error(' error: expects argument.');
                            return [2 /*return*/, core_1.help(static_1.REMOVE_HELP_INFO)];
                        }
                        command = nonOptionsArgs[0] || 'service';
                        if (!supportCommand.includes(command)) {
                            this.logger.error(" remove " + command + " is not supported now.");
                            return [2 /*return*/, core_1.help(static_1.REMOVE_HELP_INFO)];
                        }
                        remove = new remove_1.default(props.region);
                        return [4 /*yield*/, remove[command](props, { force: force, triggerName: triggerName, silent: silent })];
                    case 2:
                        _e.sent();
                        return [2 /*return*/, remove.removeNameList];
                }
            });
        });
    };
    var _a;
    __decorate([
        core_1.HLogger('FC-BASE-SDK'),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], Component.prototype, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNkc7QUFFN0csMERBQW9DO0FBQ3BDLGtEQUF1QjtBQUN2Qiw0REFBc0M7QUFDdEMsNERBQXNDO0FBQ3RDLG1DQUE0QztBQUU1QyxJQUFNLGNBQWMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDMUQ7SUFBQTtJQTZGQSxDQUFDO0lBMUZPLDhCQUFVLEdBQWhCLFVBQWlCLE1BQWtCLEVBQUUsT0FBZTs7Ozs7O3dCQUMxQyxNQUFNLEdBQUssTUFBTSxDQUFDLEtBQUssT0FBakIsQ0FBa0I7NkJBQzVCLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBbkIsd0JBQW1CO3dCQUNyQixLQUFBLE1BQU0sQ0FBQTt3QkFBZSxxQkFBTSxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUEvRCxHQUFPLFdBQVcsR0FBRyxTQUEwQyxDQUFDOzs7d0JBR2xFLHNCQUFlLENBQUMsYUFBYSxFQUFFOzRCQUM3QixPQUFPLFNBQUE7NEJBQ1AsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUzt5QkFDbEMsQ0FBQyxDQUFDO3dCQUVILGdCQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7d0JBQ3hDLGdCQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt3QkFFdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJ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