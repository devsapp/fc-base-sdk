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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var newInputs, apts, parsedArgs, nonOptionsArgs, _d, triggerName, type, command, deployRes;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.initInputs(lodash_1.default.cloneDeep(inputs), 'deploy')];
                    case 1:
                        newInputs = _e.sent();
                        apts = {
                            boolean: ['help'],
                            string: ['trigger-name', 'type'],
                            alias: { help: 'h' },
                        };
                        parsedArgs = core_1.commandParse({ args: inputs.args }, apts);
                        nonOptionsArgs = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        _d = parsedArgs.data || {}, triggerName = _d["trigger-name"], type = _d.type;
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
                        deployRes = _e.sent();
                        _super.prototype.__report.call(this, {
                            name: 'fc',
                            access: (_c = inputs.project) === null || _c === void 0 ? void 0 : _c.access,
                            content: this.reportNames(newInputs.props.region, deployRes),
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.remove = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, _d, args, props, apts, parsedArgs, nonOptionsArgs, _e, force, triggerName, silent, command, remove;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.initInputs(lodash_1.default.cloneDeep(inputs), 'remove')];
                    case 1:
                        _c = _f.sent(), _d = _c.args, args = _d === void 0 ? '' : _d, props = _c.props;
                        apts = {
                            boolean: ['help', 'y', 'use-local'],
                            string: ['trigger-name'],
                            alias: { help: 'h', triggerName: 'trigger-name', 'assume-yes': 'y' },
                        };
                        parsedArgs = core_1.commandParse({ args: args }, apts);
                        nonOptionsArgs = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        _e = parsedArgs.data || {}, force = _e.y, triggerName = _e.triggerName, silent = _e["use-local"];
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
                        _f.sent();
                        _super.prototype.__report.call(this, {
                            name: 'fc',
                            access: (_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access,
                            content: { region: '', service: '', function: '', triggers: [] },
                        });
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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var region, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        region = inputs.props.region;
                        if (!!inputs.credentials) return [3 /*break*/, 2];
                        _b = inputs;
                        return [4 /*yield*/, core_1.getCredential((_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        _b.credentials = _c.sent();
                        _c.label = 2;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQTZHO0FBRTdHLDBEQUFvQztBQUNwQyxrREFBdUI7QUFDdkIsNERBQXNDO0FBQ3RDLDREQUFzQztBQUN0QyxtQ0FBNEM7QUFDNUMsdURBQWlDO0FBRWpDLElBQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDakU7SUFBdUMsNkJBQUk7SUFBM0M7O0lBdUhBLENBQUM7SUFwSE8sMEJBQU0sR0FBWixVQUFhLE1BQWtCOzs7Ozs7NEJBQ1gscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBQTs7d0JBQWhFLFNBQVMsR0FBRyxTQUFvRDt3QkFDaEUsSUFBSSxHQUFHOzRCQUNYLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQzs0QkFDakIsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzs0QkFDaEMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTt5QkFDckIsQ0FBQzt3QkFDSSxVQUFVLEdBQXlCLG1CQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUM3RSxjQUFjLEdBQUcsT0FBQSxVQUFVLENBQUMsSUFBSSwwQ0FBRSxDQUFDLEtBQUksRUFBRSxDQUFDO3dCQUMxQyxLQUdGLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUZQLFdBQVcscUJBQUEsRUFDM0IsSUFBSSxVQUFBLENBQ29CO3dCQUUxQixJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FB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