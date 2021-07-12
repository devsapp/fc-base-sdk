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
    Component.deploy = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var region, service, functionConfig, triggers, serviceName, fcClient, _i, triggers_1, triggerConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        region = props.region, service = props.service, functionConfig = props.function, triggers = props.triggers;
                        serviceName = service.name;
                        fcClient = client_1.default.fcClient();
                        return [4 /*yield*/, this.makeService(fcClient, serviceName, service)];
                    case 1:
                        _a.sent();
                        if (!functionConfig) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.makeFunction(fcClient, serviceName, functionConfig.name, functionConfig)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!triggers) return [3 /*break*/, 7];
                        _i = 0, triggers_1 = triggers;
                        _a.label = 4;
                    case 4:
                        if (!(_i < triggers_1.length)) return [3 /*break*/, 7];
                        triggerConfig = triggers_1[_i];
                        return [4 /*yield*/, this.makeTrigger(fcClient, serviceName, triggerConfig.function, utils_1.transfromTriggerConfig(triggerConfig, region, client_1.default.credentials.AccountID))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Component.makeService = function (fcClient, name, serviceConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var vpcConfig, nasConfig, logConfig, xtraceClient, token, e_1, vm, res, ex_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vpcConfig = serviceConfig.vpcConfig, nasConfig = serviceConfig.nasConfig, logConfig = serviceConfig.logConfig;
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
    Component.makeFunction = function (fcClient, serviceName, functionName, functionConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, filename, runtime, customContainerConfig, ossBucket, ossKey, asyncConfiguration, instanceLifecycleConfig, emptyProp, res, ex_2, e_3, asyncWarn, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = core_1.spinner("Make function " + serviceName + "/" + functionName + "...");
                        filename = functionConfig.filename, runtime = functionConfig.runtime, customContainerConfig = functionConfig.customContainerConfig, ossBucket = functionConfig.ossBucket, ossKey = functionConfig.ossKey, asyncConfiguration = functionConfig.asyncConfiguration, instanceLifecycleConfig = functionConfig.instanceLifecycleConfig;
                        delete functionConfig.asyncConfiguration;
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
                        else if (!function_1.isCode(functionConfig.code)) {
                            throw new Error(serviceName + "/" + functionName + " code is not configured.");
                        }
                        if (functionConfig.environmentVariables) {
                            functionConfig.environmentVariables = lodash_1.default.mapValues(functionConfig.environmentVariables, function (value) { return value.toString(); });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 8]);
                        return [4 /*yield*/, fcClient.updateFunction(serviceName, functionName, functionConfig)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 8];
                    case 3:
                        ex_2 = _a.sent();
                        if (ex_2.code !== 'FunctionNotFound') {
                            this.logger.debug("ex code: " + ex_2.code + ", ex: " + ex_2.message);
                            vm.fail();
                            throw ex_2;
                        }
                        functionConfig.functionName = functionName;
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, fcClient.createFunction(serviceName, functionConfig)];
                    case 5:
                        res = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_3 = _a.sent();
                        vm.fail();
                        throw e_3;
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        asyncWarn = '';
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, function_async_config_1.makeDestination({
                                serviceName: serviceName,
                                functionName: functionName,
                                asyncConfiguration: asyncConfiguration,
                            })];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_4 = _a.sent();
                        if (lodash_1.default.isEmpty(asyncConfiguration) && e_4.message.includes('failed with 403')) {
                            asyncWarn = e_4.message;
                        }
                        else {
                            vm.fail();
                            throw e_4;
                        }
                        return [3 /*break*/, 12];
                    case 12:
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
            var triggerName, vm, res, ex_3, e_5;
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
                        ex_3 = _a.sent();
                        if (ex_3.code !== 'TriggerAlreadyExists') {
                            this.logger.debug("ex code: " + ex_3.code + ", ex: " + ex_3.message);
                            vm.fail();
                            throw ex_3;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTJDO0FBQzNDLDhDQUFrRTtBQUNsRSwwQ0FBb0I7QUFDcEIsa0RBQXVCO0FBQ3ZCLDJCQUEyQjtBQUMzQiwyREFBcUM7QUFDckMsd0NBQXdEO0FBRXhELGtEQUF3RTtBQUN4RSxpRUFBMEQ7QUFFMUQ7SUFBQTtJQWdOQSxDQUFDO0lBN01jLGdCQUFNLEdBQW5CLFVBQW9CLEtBQWtCOzs7Ozs7d0JBQzVCLE1BQU0sR0FBa0QsS0FBSyxPQUF2RCxFQUFFLE9BQU8sR0FBeUMsS0FBSyxRQUE5QyxFQUFZLGNBQWMsR0FBZSxLQUFLLFNBQXBCLEVBQUUsUUFBUSxHQUFLLEtBQUssU0FBVixDQUFXO3dCQUNoRSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDM0IsUUFBUSxHQUFHLGdCQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBRW5DLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQXRELFNBQXNELENBQUM7NkJBRW5ELGNBQWMsRUFBZCx3QkFBYzt3QkFDaEIscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLEVBQUE7O3dCQUFuRixTQUFtRixDQUFDOzs7NkJBR2xGLFFBQVEsRUFBUix3QkFBUTs4QkFDMEIsRUFBUixxQkFBUTs7OzZCQUFSLENBQUEsc0JBQVEsQ0FBQTt3QkFBekIsYUFBYTt3QkFDdEIscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsOEJB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