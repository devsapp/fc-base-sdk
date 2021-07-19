"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var base_1 = __importDefault(require("./common/base"));
var supportCommand = ['all', 'service', 'function', 'trigger'];
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.deploy = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var newInputs, apts, parsedArgs, nonOptionsArgs, _c, triggerName, type, command, deployRes;
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
                    case 2:
                        deployRes = _d.sent();
                        _super.prototype.__report.call(this, {
                            name: 'fc',
                            content: this.reportNames(newInputs.props.region, deployRes),
                        });
                        return [2 /*return*/];
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
                            boolean: ['help', 'y', 'use-local'],
                            string: ['trigger-name'],
                            alias: { help: 'h', triggerName: 'trigger-name', 'assume-yes': 'y' },
                        };
                        parsedArgs = core_1.commandParse({ args: args }, apts);
                        nonOptionsArgs = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        _d = parsedArgs.data || {}, force = _d.y, triggerName = _d.triggerName, silent = _d["use-local"];
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
                        return [4 /*yield*/, remove[command](props, { force: force, triggerName: triggerName, silent: silent }, command)];
                    case 2:
                        _e.sent();
                        _super.prototype.__report.call(this, { name: 'fc', content: { region: '', service: '', function: '', triggers: [] } });
                        return [2 /*return*/, remove.removeNameList];
                }
            });
        });
    };
    Component.prototype.reportNames = function (region, data) {
        var _a, _b, _c, _d;
        var dataNames = {
            region: region,
        };
        if (!lodash_1.default.isEmpty(data.service)) {
            dataNames.service = (_b = (_a = data.service) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.serviceName;
        }
        if (!lodash_1.default.isEmpty(data.function)) {
            dataNames.function = (_d = (_c = data.function) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.functionName;
        }
        if (!lodash_1.default.isEmpty(data.triggers)) {
            dataNames.triggers = data.triggers.map(function (item) { var _a; return (_a = item === null || item === void 0 ? void 0 : item.data) === null || _a === void 0 ? void 0 : _a.triggerName; });
        }
        return dataNames;
    };
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
    var _a;
    __decorate([
        core_1.HLogger('FC-BASE-SDK'),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], Component.prototype, "logger", void 0);
    return Component;
}(base_1.default));
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQTZHO0FBRTdHLDBEQUFvQztBQUNwQyxrREFBdUI7QUFDdkIsNERBQXNDO0FBQ3RDLDREQUFzQztBQUN0QyxtQ0FBNEM7QUFDNUMsdURBQWlDO0FBRWpDLElBQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDakU7SUFBdUMsNkJBQUk7SUFBM0M7O0lBa0hBLENBQUM7SUEvR08sMEJBQU0sR0FBWixVQUFhLE1BQWtCOzs7Ozs7NEJBQ1gscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBQTs7d0JBQWhFLFNBQVMsR0FBRyxTQUFvRDt3QkFDaEUsSUFBSSxHQUFHOzRCQUNYLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQzs0QkFDakIsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzs0QkFDaEMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTt5QkFDckIsQ0FBQzt3QkFDSSxVQUFVLEdBQXlCLG1CQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUM3RSxjQUFjLEdBQUcsT0FBQSxVQUFVLENBQUMsSUFBSSwwQ0FBRSxDQUFDLEtBQUksRUFBRSxDQUFDO3dCQUMxQyxLQUdGLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUZQLFdBQVcscUJBQUEsRUFDM0IsSUFBSSxVQUFBLENBQ29CO3dCQUUxQixJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FB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