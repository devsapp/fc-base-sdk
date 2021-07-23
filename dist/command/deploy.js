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
/* eslint-disable no-await-in-loop */
/* eslint-disable require-atomic-updates */
var core_1 = require("@serverless-devs/core");
var fs_1 = __importDefault(require("fs"));
var lodash_1 = __importDefault(require("lodash"));
// import path from 'path';
var client_1 = __importDefault(require("../utils/client"));
var utils_1 = require("../utils/utils");
var function_1 = require("../interface/function");
var function_async_config_1 = require("./function-async-config");
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.deploy = function (props, _a) {
        var command = _a.command, type = _a.type, onlyDelpoyTriggerName = _a.onlyDelpoyTriggerName;
        return __awaiter(this, void 0, void 0, function () {
            var region, service, functionConfig, triggers, fcClient, deployRes, deployConfig, _b, commandIsFunction, _c, commandIsTirgger, triggersRes, deployOneTrigger, _i, triggers_1, triggerConfig, _d, _e, triggers_2, triggerConfig, _f, _g;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        region = props.region, service = props.service, functionConfig = props.function, triggers = props.triggers;
                        fcClient = client_1.default.fcClient();
                        deployRes = {};
                        deployConfig = type === 'all' || type === 'config';
                        if (!((!command || command === 'service') && deployConfig)) return [3 /*break*/, 2];
                        _b = deployRes;
                        return [4 /*yield*/, this.makeService(fcClient, service)];
                    case 1:
                        _b.service = _h.sent();
                        _h.label = 2;
                    case 2:
                        commandIsFunction = command === 'function';
                        if (commandIsFunction && lodash_1.default.isEmpty(functionConfig)) {
                            throw new Error('The deployment function was specified, but the function configuration was not found');
                        }
                        if (!((!command || commandIsFunction) && functionConfig)) return [3 /*break*/, 4];
                        _c = deployRes;
                        return [4 /*yield*/, this.makeFunction(fcClient, functionConfig, type)];
                    case 3:
                        _c.function = _h.sent();
                        _h.label = 4;
                    case 4:
                        commandIsTirgger = command === 'trigger';
                        if (commandIsTirgger && lodash_1.default.isEmpty(triggers)) {
                            throw new Error('The deployment trigger was specified, but the trigger configuration was not found');
                        }
                        if (!((!command || commandIsTirgger) && triggers)) return [3 /*break*/, 14];
                        triggersRes = [];
                        deployOneTrigger = function (triggerConfig) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.makeTrigger(fcClient, triggerConfig.service, triggerConfig.function, utils_1.transfromTriggerConfig(triggerConfig, region, client_1.default.credentials.AccountID))];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); };
                        if (!(commandIsTirgger && onlyDelpoyTriggerName)) return [3 /*break*/, 9];
                        _i = 0, triggers_1 = triggers;
                        _h.label = 5;
                    case 5:
                        if (!(_i < triggers_1.length)) return [3 /*break*/, 8];
                        triggerConfig = triggers_1[_i];
                        if (!(triggerConfig.name === onlyDelpoyTriggerName)) return [3 /*break*/, 7];
                        _d = {};
                        return [4 /*yield*/, deployOneTrigger(triggerConfig)];
                    case 6: return [2 /*return*/, (_d.triggers = [_h.sent()],
                            _d)];
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: throw new Error("Not fount trigger: " + onlyDelpoyTriggerName);
                    case 9:
                        _e = 0, triggers_2 = triggers;
                        _h.label = 10;
                    case 10:
                        if (!(_e < triggers_2.length)) return [3 /*break*/, 13];
                        triggerConfig = triggers_2[_e];
                        _g = (_f = triggersRes).push;
                        return [4 /*yield*/, deployOneTrigger(triggerConfig)];
                    case 11:
                        _g.apply(_f, [_h.sent()]);
                        _h.label = 12;
                    case 12:
                        _e++;
                        return [3 /*break*/, 10];
                    case 13:
                        deployRes.triggers = triggersRes;
                        _h.label = 14;
                    case 14: return [2 /*return*/, deployRes];
                }
            });
        });
    };
    Component.makeService = function (fcClient, serviceConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var name, vpcConfig, nasConfig, logConfig, xtraceClient, token, e_1, vm, res, ex_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = serviceConfig.name, vpcConfig = serviceConfig.vpcConfig, nasConfig = serviceConfig.nasConfig, logConfig = serviceConfig.logConfig;
                        if (!logConfig) {
                            serviceConfig.logConfig = {
                                project: '',
                                logstore: '',
                                enableRequestMetrics: false,
                                enableInstanceMetrics: false,
                            };
                        }
                        if (!nasConfig) {
                            serviceConfig.nasConfig = {
                                mountPoints: [],
                                userId: -1,
                                groupId: -1,
                            };
                        }
                        if (!vpcConfig) {
                            serviceConfig.vpcConfig = {
                                vswitchIds: [],
                                securityGroupId: '',
                                vpcId: '',
                            };
                        }
                        if (!(serviceConfig.tracingConfig === 'Enable')) return [3 /*break*/, 5];
                        xtraceClient = client_1.default.xtraceClient();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, xtraceClient.request('GetToken', {}, {})];
                    case 2:
                        token = (_a.sent()).Token;
                        serviceConfig.tracingConfig = {
                            type: 'Jaeger',
                            params: {
                                endpoint: token.InternalDomain + "/adapt_" + token.LicenseKey + "_" + token.Pid + "/api/traces",
                            },
                        };
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        throw new Error(e_1.message);
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        serviceConfig.tracingConfig = {};
                        _a.label = 6;
                    case 6:
                        vm = core_1.spinner("Make service " + name + "...");
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 14]);
                        return [4 /*yield*/, fcClient.createService(name, serviceConfig)];
                    case 8:
                        res = _a.sent();
                        return [3 /*break*/, 14];
                    case 9:
                        ex_1 = _a.sent();
                        if (ex_1.code !== 'ServiceAlreadyExists') {
                            this.logger.debug("ex code: " + ex_1.code + ", ex: " + ex_1.message);
                            vm.fail();
                            throw ex_1;
                        }
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, fcClient.updateService(name, serviceConfig)];
                    case 11:
                        res = _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        e_2 = _a.sent();
                        vm.fail();
                        throw e_2;
                    case 13: return [3 /*break*/, 14];
                    case 14:
                        vm.succeed("Make service " + name + " success.");
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Component.makeFunction = function (fcClient, functionConfig, type) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, functionName, vm, onlyDeployConfig, onlyDeployCode, filename, runtime, customContainerConfig, ossBucket, ossKey, asyncConfiguration, instanceLifecycleConfig, ex_2, emptyProp, res, ex_3, e_3, asyncWarn, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = functionConfig.service;
                        functionName = functionConfig.name;
                        vm = core_1.spinner("Make function " + serviceName + "/" + functionName + "...");
                        onlyDeployConfig = type === 'config';
                        onlyDeployCode = type === 'code';
                        filename = functionConfig.filename, runtime = functionConfig.runtime, customContainerConfig = functionConfig.customContainerConfig, ossBucket = functionConfig.ossBucket, ossKey = functionConfig.ossKey, asyncConfiguration = functionConfig.asyncConfiguration, instanceLifecycleConfig = functionConfig.instanceLifecycleConfig;
                        functionConfig.initializer = functionConfig.initializer || '';
                        delete functionConfig.asyncConfiguration;
                        if (!!onlyDeployConfig) return [3 /*break*/, 5];
                        if (filename) {
                            functionConfig.code = {
                                zipFile: fs_1.default.readFileSync(filename, 'base64'),
                            };
                        }
                        else if (ossBucket && ossKey) {
                            functionConfig.code = {
                                ossBucketName: ossBucket,
                                ossObjectName: ossKey,
                            };
                        }
                        if (!onlyDeployCode) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fcClient.updateFunction(serviceName, functionName, { code: functionConfig.code })];
                    case 2:
                        _a.sent();
                        vm.succeed("Make function " + serviceName + "/" + functionName + " code success.");
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        vm.fail();
                        throw ex_2;
                    case 4: return [2 /*return*/];
                    case 5:
                        emptyProp = {
                            handler: '',
                        };
                        functionConfig.instanceLifecycleConfig = {
                            preFreeze: (instanceLifecycleConfig === null || instanceLifecycleConfig === void 0 ? void 0 : instanceLifecycleConfig.preFreeze) || emptyProp,
                            preStop: (instanceLifecycleConfig === null || instanceLifecycleConfig === void 0 ? void 0 : instanceLifecycleConfig.preStop) || emptyProp,
                        };
                        if (runtime === 'custom-container') {
                            if (!function_1.isCustomContainerConfig(customContainerConfig)) {
                                throw new Error(serviceName + "/" + functionName + " runtime is custom-container, but customContainerConfig is not configured.");
                            }
                        }
                        else if (!onlyDeployConfig && !function_1.isCode(functionConfig.code)) {
                            throw new Error(serviceName + "/" + functionName + " code is not configured.");
                        }
                        if (functionConfig.environmentVariables) {
                            functionConfig.environmentVariables = lodash_1.default.mapValues(functionConfig.environmentVariables, function (value) { return value.toString(); });
                        }
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 13]);
                        return [4 /*yield*/, fcClient.updateFunction(serviceName, functionName, functionConfig)];
                    case 7:
                        res = _a.sent();
                        return [3 /*break*/, 13];
                    case 8:
                        ex_3 = _a.sent();
                        if (ex_3.code !== 'FunctionNotFound' || onlyDeployConfig) {
                            this.logger.debug("ex code: " + ex_3.code + ", ex: " + ex_3.message);
                            vm.fail();
                            throw ex_3;
                        }
                        functionConfig.functionName = functionName;
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, fcClient.createFunction(serviceName, functionConfig)];
                    case 10:
                        res = _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_3 = _a.sent();
                        vm.fail();
                        throw e_3;
                    case 12: return [3 /*break*/, 13];
                    case 13:
                        asyncWarn = '';
                        _a.label = 14;
                    case 14:
                        _a.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, function_async_config_1.makeDestination({
                                serviceName: serviceName,
                                functionName: functionName,
                                asyncConfiguration: asyncConfiguration,
                            })];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        e_4 = _a.sent();
                        if (lodash_1.default.isEmpty(asyncConfiguration) && e_4.message.includes('failed with 403')) {
                            asyncWarn = e_4.message;
                        }
                        else {
                            vm.fail();
                            throw e_4;
                        }
                        return [3 /*break*/, 17];
                    case 17:
                        vm.succeed("Make function " + serviceName + "/" + functionName + " success.");
                        if (asyncWarn) {
                            this.logger.warn("Reminder function.asyncConfig: " + asyncWarn);
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Component.makeTrigger = function (fcClient, serviceName, functionName, triggerConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var triggerName, vm, res, ex_4, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerName = triggerConfig.triggerName;
                        vm = core_1.spinner("Make trigger " + serviceName + "/" + functionName + "/" + triggerName + "...");
                        if (triggerConfig.qualifier) {
                            triggerConfig.qualifier = triggerConfig.qualifier.toString();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 8]);
                        return [4 /*yield*/, fcClient.createTrigger(serviceName, functionName, triggerConfig)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 8];
                    case 3:
                        ex_4 = _a.sent();
                        if (ex_4.code !== 'TriggerAlreadyExists') {
                            this.logger.debug("ex code: " + ex_4.code + ", ex: " + ex_4.message);
                            vm.fail();
                            throw ex_4;
                        }
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, fcClient.updateTrigger(serviceName, functionName, triggerName, triggerConfig)];
                    case 5:
                        res = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_5 = _a.sent();
                        if (e_5.message.includes('Updating trigger is not supported yet.')) {
                            vm.warn("Updating " + serviceName + "/" + functionName + "/" + triggerName + " is not supported yet.");
                            return [2 /*return*/, triggerConfig];
                        }
                        vm.fail();
                        throw e_5;
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        vm.succeed("Make trigger " + serviceName + "/" + functionName + "/" + triggerName + " success.");
                        return [2 /*return*/, res];
                }
            });
        });
    };
    var _a;
    __decorate([
        core_1.HLogger('FC-BASE-SDK'),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], Component, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLDJDQUEyQztBQUMzQyw4Q0FBa0U7QUFDbEUsMENBQW9CO0FBQ3BCLGtEQUF1QjtBQUN2QiwyQkFBMkI7QUFDM0IsMkRBQXFDO0FBQ3JDLHdDQUF3RDtBQUV4RCxrREFBd0U7QUFDeEUsaUVBQTBEO0FBRTFEO0lBQUE7SUF3UUEsQ0FBQztJQXJRYyxnQkFBTSxHQUFuQixVQUFvQixLQUFrQixFQUFFLEVBQXdDO1lBQXRDLE9BQU8sYUFBQSxFQUFFLElBQUksVUFBQSxFQUFFLHFCQUFxQiwyQkFBQTs7Ozs7Ozt3QkFDcEUsTUFBTSxHQUFrRCxLQUFLLE9BQXZELEVBQUUsT0FBTyxHQUF5QyxLQUFLLFFBQTlDLEVBQVksY0FBYyxHQUFlLEtBQUssU0FBcEIsRUFBRSxRQUFRLEdBQUssS0FBSyxTQUFWLENBQVc7d0JBQ2hFLFFBQVEsR0FBRyxnQkFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM3QixTQUFTLEdBQVEsRUFBRSxDQUFDO3dCQUVwQixZQUFZLEdBQUcsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDOzZCQUNyRCxDQUFBLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxLQUFLLFNBQVMsQ0FBQyxJQUFJLFlBQVksQ0FBQSxFQUFuRCx3QkFBbUQ7d0JBQ3JELEtBQUEsU0FBUyxDQUFBO3dCQUFXLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFBOzt3QkFBN0QsR0FBVSxPQUFPLEdBQUcsU0FBeUMsQ0FBQzs7O3dCQUcxRCxpQkFBaUIsR0FBRyxPQUFPLEtBQUssVUFBVSxDQUFDO3dCQUNqRCxJQUFJLGlCQUFp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