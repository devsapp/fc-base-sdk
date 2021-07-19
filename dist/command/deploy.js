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
            var region, service, functionConfig, triggers, fcClient, deployRes, deployConfig, _b, commandIsFunction, _c, commandIsTirgger, triggersRes, deployOneTrigger, _i, triggers_1, triggerConfig, _d, _e, _f, triggers_2, triggerConfig, _g, _h;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        region = props.region, service = props.service, functionConfig = props.function, triggers = props.triggers;
                        fcClient = client_1.default.fcClient();
                        deployRes = {};
                        deployConfig = type === 'all' || type === 'config';
                        if (!((!command || command === 'service') && deployConfig)) return [3 /*break*/, 2];
                        _b = deployRes;
                        return [4 /*yield*/, this.makeService(fcClient, service)];
                    case 1:
                        _b.service = _j.sent();
                        _j.label = 2;
                    case 2:
                        commandIsFunction = command === 'function';
                        if (commandIsFunction && lodash_1.default.isEmpty(functionConfig)) {
                            throw new Error('The deployment function was specified, but the function configuration was not found');
                        }
                        if (!((!command || commandIsFunction) && functionConfig)) return [3 /*break*/, 4];
                        _c = deployRes;
                        return [4 /*yield*/, this.makeFunction(fcClient, functionConfig, type)];
                    case 3:
                        _c.function = _j.sent();
                        _j.label = 4;
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
                        _j.label = 5;
                    case 5:
                        if (!(_i < triggers_1.length)) return [3 /*break*/, 8];
                        triggerConfig = triggers_1[_i];
                        if (!(triggerConfig.name === onlyDelpoyTriggerName)) return [3 /*break*/, 7];
                        _e = (_d = triggersRes).push;
                        return [4 /*yield*/, deployOneTrigger(triggerConfig)];
                    case 6:
                        _e.apply(_d, [_j.sent()]);
                        return [2 /*return*/];
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: throw new Error("Not fount trigger: " + onlyDelpoyTriggerName);
                    case 9:
                        _f = 0, triggers_2 = triggers;
                        _j.label = 10;
                    case 10:
                        if (!(_f < triggers_2.length)) return [3 /*break*/, 13];
                        triggerConfig = triggers_2[_f];
                        _h = (_g = triggersRes).push;
                        return [4 /*yield*/, deployOneTrigger(triggerConfig)];
                    case 11:
                        _h.apply(_g, [_j.sent()]);
                        _j.label = 12;
                    case 12:
                        _f++;
                        return [3 /*break*/, 10];
                    case 13:
                        deployRes.triggers = triggersRes;
                        _j.label = 14;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLDJDQUEyQztBQUMzQyw4Q0FBa0U7QUFDbEUsMENBQW9CO0FBQ3BCLGtEQUF1QjtBQUN2QiwyQkFBMkI7QUFDM0IsMkRBQXFDO0FBQ3JDLHdDQUF3RDtBQUV4RCxrREFBd0U7QUFDeEUsaUVBQTBEO0FBRTFEO0lBQUE7SUFvUUEsQ0FBQztJQWpRYyxnQkFBTSxHQUFuQixVQUFvQixLQUFrQixFQUFFLEVBQXdDO1lBQXRDLE9BQU8sYUFBQSxFQUFFLElBQUksVUFBQSxFQUFFLHFCQUFxQiwyQkFBQTs7Ozs7Ozt3QkFDcEUsTUFBTSxHQUFrRCxLQUFLLE9BQXZELEVBQUUsT0FBTyxHQUF5QyxLQUFLLFFBQTlDLEVBQVksY0FBYyxHQUFlLEtBQUssU0FBcEIsRUFBRSxRQUFRLEdBQUssS0FBSyxTQUFWLENBQVc7d0JBQ2hFLFFBQVEsR0FBRyxnQkFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM3QixTQUFTLEdBQVEsRUFBRSxDQUFDO3dCQUVwQixZQUFZLEdBQUcsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDOzZCQUNyRCxDQUFBLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxLQUFLLFNBQVMsQ0FBQyxJQUFJLFlBQVksQ0FBQSxFQUFuRCx3QkFBbUQ7d0JBQ3JELEtBQUEsU0FBUyxDQUFBO3dCQUFXLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFBOzt3QkFBN0QsR0FBVSxPQUFPLEdBQUcsU0FBeUMsQ0FBQzs7O3dCQUcxRCxpQkFBaUIsR0FBRyxPQUFPLEtBQUssVUFBVSxDQUFDO3dCQUNqRCxJQUFJLGlCQUFpQixJQUFJLGdCQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFOzRCQUNsRCxNQUFNLElBQUksS0FBSyxDQUFDLHFGQUFxRixDQUFDLENBQUM7eUJBQ3hHOzZCQUNHLENBQUEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLGNBQWMsQ0FBQSxFQUFqRCx3QkFBaUQ7d0JBQ25ELEtBQUEsU0FBUyxDQUFBO3dCQUFZLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsRUFBQTs7d0JBQTVFLEdBQVUsUUFBUSxHQUFHLFNBQXVELENBQUM7Ozt3QkFHekUsZ0JBQWdCLEdBQUcsT0FBTyxLQUFLLFNBQVMsQ0FBQzt3QkFDL0MsSUFBSSxnQkFBZ0IsSUFBSSxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDO3lCQUN0Rzs2QkFDRyxDQUFBLENBQUMsQ0FBQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxRQUFRLENBQUEsRUFBMUMseUJBQTBDO3dCQUN0QyxXQUFXLEdBQUcsRUFBRSxDQUFDO3dCQUNqQixnQkFBZ0IsR0FBRyxVQUFPLGFBQWE7Ozs0Q0FDcEMscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FDM0IsUUFBUSxFQUNSLGFBQWEsQ0FBQyxPQUFPLEVBQ3JCLGFBQWEsQ0FBQyxRQUFRLEVBQ3RCLDhCQUFzQixDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQzVFLEVBQUE7NENBTEQsc0JBQU8sU0FLTixFQUFDOzs7NkJBQ0gsQ0FBQzs2QkFFRSxDQUFBLGdCQUFnQixJQUFJLHFCQUFxQixDQUFBLEVBQXpDLHdCQUF5Qzs4QkFDUCxFQUFSLHFCQUFROzs7NkJBQVIsQ0FBQSxzQkFBUSxDQUFBO3dCQUF6QixhQUFhOzZCQUNsQixDQUFBLGFBQWEsQ0FBQyxJQUFJLEtBQUsscUJBQXFCLENBQUEsRUFBNUMsd0JBQTRDO3dCQUM5QyxLQUFBLENBQUEsS0FBQSxXQUFXLENBQUEsQ0FBQyxJQUFJLENBQUE7d0JBQUMscUJBQU0sZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEVBQUE7O3dCQUF0RCxjQUFpQixTQUFxQyxFQUFDLENBQUM7d0JBQ3hELHNCQUFPOzt3QkFIaUIsSUFBUSxDQUFBOzs0QkFNcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBc0IscUJBQXVCLENBQUMsQ0FBQzs7OEJBRTdCLEVBQVIscUJBQVE7Ozs2QkFBUixDQUFBLHNCQUFRLENBQUE7d0JBQXpCLGFBQWE7d0JBQ3RCLEtBQUEsQ0FBQSxLQUFBLFdBQVcsQ0FBQSxDQUFDLElBQUksQ0FBQTt3QkFBQyxxQkFBTSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsRUFBQTs7d0JBQXRELGNBQWlCLFNBQXFDLEVBQUMsQ0FBQzs7O3dCQUQ5QixJQUFRLENBQUE7Ozt3QkFHcEMsU0FBUyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7OzZCQUduQyxzQkFBTyxTQUFTLEVBQUM7Ozs7S0FDbEI7SUFFWSxxQkFBVyxHQUF4QixVQUF5QixRQUFRLEVBQUUsYUFBYTs7Ozs7O3dCQUU1QyxJQUFJLEdBSUYsYUFBYSxLQUpYLEVBQ0osU0FBUyxHQUdQLGFBQWEsVUFITixFQUNULFNBQVMsR0FFUCxhQUFhLFVBRk4sRUFDVCxTQUFTLEdBQ1AsYUFBYSxVQUROLENBQ087d0JBRWxCLElBQUksQ0FBQyxTQUFTLEVBQUU7NEJBQ2QsYUFBYSxDQUFDLFNBQVMsR0FBRztnQ0FDeEIsT0FBTyxFQUFFLEVBQUU7Z0NBQ1gsUUFBUSxFQUFFLEVBQUU7Z0NBQ1osb0JBQW9CLEVBQUUsS0FBSztnQ0FDM0IscUJBQXFCLEVBQUUsS0FBSzs2QkFDN0IsQ0FBQzt5QkFDSDt3QkFFRCxJQUFJLENBQUMsU0FBUyxFQUFFOzRCQUNkLGFBQWEsQ0FBQyxTQUFTLEdBQUc7Z0NBQ3hCLFdBQVcsRUFBRSxFQUFFO2dDQUNmLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0NBQ1YsT0FBTyxFQUFFLENBQUMsQ0FBQzs2QkFDWixDQUFDO3lCQUNIO3dCQUNELElBQUksQ0FBQyxTQUFTLEVBQUU7NEJBQ2QsYUFBYSxDQUFDLFNBQVMsR0FBRztnQ0FDeEIsVUFBVSxFQUFFLEVBQUU7Z0NBQ2QsZUFBZSxFQUFFLEVBQUU7Z0NBQ25CLEtBQUssRUFBRSxFQUFFOzZCQUNWLENBQUM7eUJBQ0g7NkJBRUcsQ0FBQSxhQUFhLENBQUMsYUFBYSxLQUFLLFFBQVEsQ0FBQSxFQUF4Qyx3QkFBd0M7d0JBQ3BDLFlBQVksR0FBRyxnQkFBTSxDQUFDLFlBQVksRUFBRSxDQUFDOzs7O3dCQUVoQixxQkFBTSxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUE7O3dCQUF4RCxLQUFLLEdBQUssQ0FBQSxTQUE4QyxDQUFBLE1BQW5EO3dCQUNwQixhQUFhLENBQUMsYUFBYSxHQUFHOzRCQUM1QixJQUFJLEVBQUUsUUFBUTs0QkFDZCxNQUFNLEVBQUU7Z0NBQ04sUUFBUSxFQUFLLEtBQUssQ0FBQyxjQUFjLGVBQVUsS0FBSyxDQUFDLFVBQVUsU0FBSSxLQUFLLENBQUMsR0FBRyxnQkFBYTs2QkFDdEY7eUJBQ0YsQ0FBQzs7Ozt3QkFFRixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O3dCQUc3QixhQUFhLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQzs7O3dCQUc3QixFQUFFLEdBQUcsY0FBTyxDQUFDLGtCQUFnQixJQUFJLFFBQUssQ0FBQyxDQUFDOzs7O3dCQUl0QyxxQkFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsRUFBQTs7d0JBQXZELEdBQUcsR0FBRyxTQUFpRCxDQUFDOzs7O3dCQUV4RCxJQUFJLElBQUUsQ0FBQyxJQUFJLEtBQUssc0JBQXNCLEVBQUU7NEJBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQVksSUFBRSxDQUFDLElBQUksY0FBUyxJQUFFLENBQUMsT0FBUyxDQUFDLENBQUM7NEJBQzVELEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDVixNQUFNLElBQUUsQ0FBQzt5QkFDVjs7Ozt3QkFFTyxxQkFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsRUFBQTs7d0JBQXZELEdBQUcsR0FBRyxTQUFpRCxDQUFDOzs7O3dCQUV4RCxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ1YsTUFBTSxHQUFDLENBQUM7Ozt3QkFJWixFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFnQixJQUFJLGNBQVcsQ0FBQyxDQUFDO3dCQUM1QyxzQkFBTyxHQUFHLEVBQUM7Ozs7S0FDWjtJQUVZLHNCQUFZLEdBQXpCLFVBQTBCLFFBQVEsRUFBRSxjQUFjLEVBQUUsSUFBSTs7Ozs7O3dCQUNoRCxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQzt3QkFDckMsWUFBWSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7d0JBQ25DLEVBQUUsR0FBRyxjQUFPLENBQUMsbUJBQWlCLFdBQVcsU0FBSSxZQUFZLFFBQUssQ0FBQyxDQUFDO3dCQUNoRSxnQkFBZ0IsR0FBRyxJQUFJLEtBQUssUUFBUSxDQUFDO3dCQUNyQyxjQUFjLEdBQUcsSUFBSSxLQUFLLE1BQU0sQ0FBQzt3QkFHckMsUUFBUSxHQU9OLGNBQWMsU0FQUixFQUNSLE9BQU8sR0FNTCxjQUFjLFFBTlQsRUFDUCxxQkFBcUIsR0FLbkIsY0FBYyxzQkFMSyxFQUNyQixTQUFTLEdBSVAsY0FBYyxVQUpQLEVBQ1QsTUFBTSxHQUdKLGNBQWMsT0FIVixFQUNOLGtCQUFrQixHQUVoQixjQUFjLG1CQUZFLEVBQ2xCLHVCQUF1QixHQUNyQixjQUFjLHdCQURPLENBQ047d0JBQ25CLGNBQWMsQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7d0JBQzlELE9BQU8sY0FBYyxDQUFDLGtCQUFrQixDQUFDOzZCQUVyQyxDQUFDLGdCQUFnQixFQUFqQix3QkFBaUI7d0JBQ25CLElBQUksUUFBUSxFQUFFOzRCQUNaLGNBQWMsQ0FBQyxJQUFJLEdBQUc7Z0NBQ3BCLE9BQU8sRUFBRSxZQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7NkJBQzdDLENBQUM7eUJBQ0g7NkJBQU0sSUFBSSxTQUFTLElBQUksTUFBTSxFQUFFOzRCQUM5QixjQUFjLENBQUMsSUFBSSxHQUFHO2dDQUNwQixhQUFhLEVBQUUsU0FBUztnQ0FDeEIsYUFBYSxFQUFFLE1BQU07NkJBQ3RCLENBQUM7eUJBQ0g7NkJBRUcsY0FBYyxFQUFkLHdCQUFjOzs7O3dCQUVkLHFCQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBQTs7d0JBQXZGLFNBQXVGLENBQUM7d0JBQ3hGLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQWlCLFdBQVcsU0FBSSxZQUFZLG1CQUFnQixDQUFDLENBQUM7Ozs7d0JBRXpFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDVixNQUFNLElBQUUsQ0FBQzs0QkFFWCxzQkFBTzs7d0JBSUwsU0FBUyxHQUFHOzRCQUNoQixPQUFPLEVBQUUsRUFBRTt5QkFDWixDQUFDO3dCQUNGLGNBQWMsQ0FBQyx1QkFBdUIsR0FBRzs0QkFDdkMsU0FBUyxFQUFFLENBQUEsdUJBQXVCLGFBQXZCLHVCQUF1Qix1QkFBdkIsdUJBQXVCLENBQUUsU0FBUyxLQUFJLFNBQVM7NEJBQzFELE9BQU8sRUFBRSxDQUFBLHVCQUF1QixhQUF2Qix1QkFBdUIsdUJBQXZCLHVCQUF1QixDQUFFLE9BQU8sS0FBSSxTQUFTO3lCQUN2RCxDQUFDO3dCQUVGLElBQUksT0FBTyxLQUFLLGtCQUFrQixFQUFFOzRCQUNsQyxJQUFJLENBQUMsa0NBQXVCLENBQUMscUJBQXFCLENBQUMsRUFBRTtnQ0FDbkQsTUFBTSxJQUFJLEtBQUssQ0FBSSxXQUFXLFNBQUksWUFBWSwrRUFBNEUsQ0FBQyxDQUFDOzZCQUM3SDt5QkFDRjs2QkFBTSxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxpQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDNUQsTUFBTSxJQUFJLEtBQUssQ0FBSSxXQUFXLFNBQUksWUFBWSw2QkFBMEIsQ0FBQyxDQUFDO3lCQUMzRTt3QkFFRCxJQUFJLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRTs0QkFDdkMsY0FBYyxDQUFDLG9CQUFvQixHQUFHLGdCQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO3lCQUNySDs7Ozt3QkFJTyxxQkFBTSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLEVBQUE7O3dCQUE5RSxHQUFHLEdBQUcsU0FBd0UsQ0FBQzs7Ozt3QkFFL0UsSUFBSSxJQUFFLENBQUMsSUFBSSxLQUFLLGtCQUFrQixJQUFJLGdCQUFnQixFQUFFOzRCQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFZLElBQUUsQ0FBQyxJQUFJLGNBQVMsSUFBRSxDQUFDLE9BQVMsQ0FBQyxDQUFDOzRCQUM1RCxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ1YsTUFBTSxJQUFFLENBQUM7eUJBQ1Y7d0JBQ0QsY0FBYyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7Ozs7d0JBRW5DLHFCQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxFQUFBOzt3QkFBaEUsR0FBRyxHQUFHLFNBQTBELENBQUM7Ozs7d0JBRWpFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDVixNQUFNLEdBQUMsQ0FBQzs7O3dCQUlSLFNBQVMsR0FBRyxFQUFFLENBQUM7Ozs7d0JBRWpCLHFCQUFNLHVDQUFlLENBQUM7Z0NBQ3BCLFdBQVcsYUFBQTtnQ0FDWCxZQUFZLGNBQUE7Z0NBQ1osa0JBQWtCLG9CQUFBOzZCQUNuQixDQUFDLEVBQUE7O3dCQUpGLFNBSUUsQ0FBQzs7Ozt3QkFFSCxJQUFJLGdCQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTs0QkFDMUUsU0FBUyxHQUFHLEdBQUMsQ0FBQyxPQUFPLENBQUM7eUJBQ3ZCOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDVixNQUFNLEdBQUMsQ0FBQzt5QkFDVDs7O3dCQUVILEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQWlCLFdBQVcsU0FBSSxZQUFZLGNBQVcsQ0FBQyxDQUFDO3dCQUVwRSxJQUFJLFNBQVMsRUFBRTs0QkFDYixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBa0MsU0FBVyxDQUFDLENBQUM7eUJBQ2pFO3dCQUVELHNCQUFPLEdBQUcsRUFBQzs7OztLQUNaO0lBRVkscUJBQVcsR0FBeEIsVUFBeUIsUUFBUSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYTs7Ozs7O3dCQUNqRSxXQUFXLEdBQUssYUFBYSxZQUFsQixDQUFtQjt3QkFFaEMsRUFBRSxHQUFHLGNBQU8sQ0FBQyxrQkFBZ0IsV0FBVyxTQUFJLFlBQVksU0FBSSxXQUFXLFFBQUssQ0FBQyxDQUFDOzs7O3dCQUk1RSxxQkFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDLEVBQUE7O3dCQUE1RSxHQUFHLEdBQUcsU0FBc0UsQ0FBQzs7Ozt3QkFFN0UsSUFBSSxJQUFFLENBQUMsSUFBSSxLQUFLLHNCQUFzQixFQUFFOzRCQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFZLElBQUUsQ0FBQyxJQUFJLGNBQVMsSUFBRSxDQUFDLE9BQVMsQ0FBQyxDQUFDOzRCQUM1RCxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ1YsTUFBTSxJQUFFLENBQUM7eUJBQ1Y7Ozs7d0JBRU8scUJBQU0sUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsRUFBQTs7d0JBQXpGLEdBQUcsR0FBRyxTQUFtRixDQUFDOzs7O3dCQUUxRixJQUFJLEdBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLHdDQUF3QyxDQUFDLEVBQUU7NEJBQ2hFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBWSxXQUFXLFNBQUksWUFBWSxTQUFJLFdBQVcsMkJBQXdCLENBQUMsQ0FBQzs0QkFDeEYsc0JBQU8sYUFBYSxFQUFDO3lCQUN0Qjt3QkFDRCxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ1YsTUFBTSxHQUFDLENBQUM7Ozt3QkFJWixFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFnQixXQUFXLFNBQUksWUFBWSxTQUFJLFdBQVcsY0FBVyxDQUFDLENBQUM7d0JBQ2xGLHNCQUFPLEdBQUcsRUFBQzs7OztLQUNaOztJQWxRdUI7UUFBdkIsY0FBTyxDQUFDLGFBQWEsQ0FBQztzREFBZ0IsY0FBTyxvQkFBUCxjQUFPO21DQUFDO0lBbVFqRCxnQkFBQztDQUFBLEFBcFFELElBb1FDO2tCQXBRb0IsU0FBUyJ9