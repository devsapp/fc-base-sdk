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
var fs_1 = __importDefault(require("fs"));
var lodash_1 = __importDefault(require("lodash"));
// import path from 'path';
var client_1 = __importDefault(require("../utils/client"));
var utils_1 = require("../utils/utils");
var function_1 = require("../interface/function");
var function_async_config_1 = require("./function-async-config");
var errorCode = ['ServiceNotFound', 'FunctionNotFound', 'TriggerNotFound'];
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.remove = function (props, _a) {
        var nonOptionsArg = _a.nonOptionsArg, name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            var service, functionConfig, triggers, serviceName, functionName, fcClient, deleteService, deleteFunction, isContinue, onlyDeleteOneTrigger, _i, triggers_1, triggerName, vm, ex_1, vm, ex_2, vm, ex_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = props.service, functionConfig = props.function, triggers = props.triggers;
                        serviceName = service.name;
                        functionName = functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name;
                        fcClient = client_1.default.fcClient();
                        deleteService = nonOptionsArg === 'service';
                        deleteFunction = nonOptionsArg === 'function' || deleteService;
                        if (!triggers) return [3 /*break*/, 7];
                        isContinue = false;
                        onlyDeleteOneTrigger = name && nonOptionsArg === 'trigger';
                        _i = 0, triggers_1 = triggers;
                        _b.label = 1;
                    case 1:
                        if (!(_i < triggers_1.length)) return [3 /*break*/, 7];
                        triggerName = triggers_1[_i].name;
                        if (onlyDeleteOneTrigger) {
                            if (triggerName !== name) {
                                return [3 /*break*/, 6];
                            }
                            isContinue = true;
                        }
                        vm = core_1.spinner("Delete trigger " + serviceName + "/" + functionName + "/" + triggerName + "...");
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fcClient.deleteTrigger(serviceName, functionName, triggerName)];
                    case 3:
                        _b.sent();
                        vm.succeed("Delete trigger " + serviceName + "/" + functionName + "/" + triggerName + " success.");
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _b.sent();
                        if (errorCode.includes(ex_1.code)) {
                            vm.warn("[" + ex_1.code + "], " + ex_1.message);
                            return [3 /*break*/, 6];
                        }
                        vm.fail();
                        throw ex_1;
                    case 5:
                        if (isContinue) {
                            return [2 /*return*/];
                        }
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7:
                        if (!(functionName && deleteFunction)) return [3 /*break*/, 11];
                        vm = core_1.spinner("Delete function " + serviceName + "/" + functionName + "...");
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, fcClient.deleteFunction(serviceName, functionName)];
                    case 9:
                        _b.sent();
                        vm.succeed("Delete function " + serviceName + "/" + functionName + " success.");
                        return [3 /*break*/, 11];
                    case 10:
                        ex_2 = _b.sent();
                        if (!errorCode.includes(ex_2.code)) {
                            vm.fail();
                            throw ex_2;
                        }
                        vm.warn("[" + ex_2.code + "], " + ex_2.message);
                        return [3 /*break*/, 11];
                    case 11:
                        if (!deleteService) return [3 /*break*/, 15];
                        vm = core_1.spinner("Delete service " + serviceName + "...");
                        _b.label = 12;
                    case 12:
                        _b.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, fcClient.deleteService(serviceName)];
                    case 13:
                        _b.sent();
                        vm.succeed("Delete service " + serviceName + " success.");
                        return [3 /*break*/, 15];
                    case 14:
                        ex_3 = _b.sent();
                        if (!errorCode.includes(ex_3.code)) {
                            vm.fail();
                            throw ex_3;
                        }
                        vm.warn("[" + ex_3.code + "], " + ex_3.message);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    Component.deploy = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var region, service, functionConfig, triggers, serviceName, fcClient, _i, triggers_2, triggerConfig;
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
                        _i = 0, triggers_2 = triggers;
                        _a.label = 4;
                    case 4:
                        if (!(_i < triggers_2.length)) return [3 /*break*/, 7];
                        triggerConfig = triggers_2[_i];
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
            var vpcConfig, nasConfig, logConfig, xtraceClient, token, e_1, vm, res, ex_4, e_2;
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
                        ex_4 = _a.sent();
                        if (ex_4.code !== 'ServiceAlreadyExists') {
                            this.logger.debug("ex code: " + ex_4.code + ", ex: " + ex_4.message);
                            vm.fail();
                            throw ex_4;
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
            var vm, filename, runtime, customContainerConfig, ossBucket, ossKey, asyncConfiguration, instanceLifecycleConfig, emptyProp, res, ex_5, e_3;
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
                        ex_5 = _a.sent();
                        if (ex_5.code !== 'FunctionNotFound') {
                            this.logger.debug("ex code: " + ex_5.code + ", ex: " + ex_5.message);
                            vm.fail();
                            throw ex_5;
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
                    case 8: return [4 /*yield*/, function_async_config_1.makeDestination({
                            serviceName: serviceName,
                            functionName: functionName,
                            asyncConfiguration: asyncConfiguration,
                        })];
                    case 9:
                        _a.sent();
                        vm.succeed("Make function " + serviceName + "/" + functionName + " success.");
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Component.makeTrigger = function (fcClient, serviceName, functionName, triggerConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var triggerName, vm, res, ex_6, e_4;
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
                        ex_6 = _a.sent();
                        if (ex_6.code !== 'TriggerAlreadyExists') {
                            this.logger.debug("ex code: " + ex_6.code + ", ex: " + ex_6.message);
                            vm.fail();
                            throw ex_6;
                        }
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, fcClient.updateTrigger(serviceName, functionName, triggerName, triggerConfig)];
                    case 5:
                        res = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_4 = _a.sent();
                        if (e_4.message.includes('Updating trigger is not supported yet.')) {
                            vm.warn("Updating " + serviceName + "/" + functionName + "/" + triggerName + " is not supported yet.");
                            return [2 /*return*/, triggerConfig];
                        }
                        vm.fail();
                        throw e_4;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVzb3VyY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQWtFO0FBQ2xFLDBDQUFvQjtBQUNwQixrREFBdUI7QUFDdkIsMkJBQTJCO0FBQzNCLDJEQUFxQztBQUNyQyx3Q0FBd0Q7QUFFeEQsa0RBQXdFO0FBQ3hFLGlFQUEwRDtBQUUxRCxJQUFNLFNBQVMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFFN0U7SUFBQTtJQW1RQSxDQUFDO0lBaFFjLGdCQUFNLEdBQW5CLFVBQW9CLEtBQWtCLEVBQUUsRUFBdUI7WUFBckIsYUFBYSxtQkFBQSxFQUFFLElBQUksVUFBQTs7Ozs7O3dCQUNuRCxPQUFPLEdBQXlDLEtBQUssUUFBOUMsRUFBWSxjQUFjLEdBQWUsS0FBSyxTQUFwQixFQUFFLFFBQVEsR0FBSyxLQUFLLFNBQVYsQ0FBVzt3QkFDeEQsV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQzNCLFlBQVksR0FBRyxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsSUFBSSxDQUFDO3dCQUNwQyxRQUFRLEdBQUcsZ0JBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFFN0IsYUFBYSxHQUFHLGFBQWEsS0FBSyxTQUFTLENBQUM7d0JBQzVDLGNBQWMsR0FBRyxhQUFhLEtBQUssVUFBVSxJQUFJLGFBQWEsQ0FBQzs2QkFFakUsUUFBUSxFQUFSLHdCQUFRO3dCQUNOLFVBQVUsR0FBRyxLQUFLLENBQUM7d0JBQ2pCLG9CQUFvQixHQUFHLElBQUksSUFBSSxhQUFhLEtBQUssU0FBUyxDQUFDOzhCQUNyQixFQUFSLHFCQUFROzs7NkJBQVIsQ0FBQSxzQkFBUSxDQUFBO3dCQUF6QixXQUFXLHNCQUFBO3dC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