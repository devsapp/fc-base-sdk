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
var errorCode = ['ServiceNotFound', 'FunctionNotFound', 'TriggerNotFound'];
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.remove = function (props, _a) {
        var nonOptionsArg = _a.nonOptionsArg, name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            var service, functionConfig, triggers, serviceName, functionName, deleteService, deleteFunction, isContinue, onlyDeleteOneTrigger, _i, triggers_1, triggerName, vm, ex_1, vm, ex_2, vm, ex_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = props.service, functionConfig = props.function, triggers = props.triggers;
                        serviceName = service.name;
                        functionName = functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name;
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
                        return [4 /*yield*/, client_1.default.fcClient.deleteTrigger(serviceName, functionName, triggerName)];
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
                        return [4 /*yield*/, client_1.default.fcClient.deleteFunction(serviceName, functionName)];
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
                        return [4 /*yield*/, client_1.default.fcClient.deleteService(serviceName)];
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
            var region, service, functionConfig, triggers, serviceName, _i, triggers_2, triggerConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        region = props.region, service = props.service, functionConfig = props.function, triggers = props.triggers;
                        serviceName = service.name;
                        return [4 /*yield*/, this.makeService(serviceName, service)];
                    case 1:
                        _a.sent();
                        if (!functionConfig) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.makeFunction(serviceName, functionConfig.name, functionConfig)];
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
                        return [4 /*yield*/, this.makeTrigger(serviceName, triggerConfig.function, utils_1.transfromTriggerConfig(triggerConfig, region, client_1.default.fcClient.accountid))];
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
    Component.makeService = function (name, serviceConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var vpcConfig, nasConfig, logConfig, vm, res, ex_4, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vpcConfig = serviceConfig.vpcConfig, nasConfig = serviceConfig.nasConfig, logConfig = serviceConfig.logConfig;
                        if (!logConfig) {
                            serviceConfig.logConfig = {
                                project: '',
                                logstore: '',
                                enableRequestMetrics: false,
                            };
                        }
                        if (!nasConfig) {
                            serviceConfig.nasConfig = {
                                mountPoints: [],
                            };
                        }
                        if (!vpcConfig) {
                            serviceConfig.vpcConfig = {
                                vswitchIds: [],
                                securityGroupId: '',
                                vpcId: '',
                            };
                        }
                        vm = core_1.spinner("Make service " + name + "...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 8]);
                        return [4 /*yield*/, client_1.default.fcClient.createService(name, serviceConfig)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 8];
                    case 3:
                        ex_4 = _a.sent();
                        if (ex_4.code !== 'ServiceAlreadyExists') {
                            this.logger.debug("ex code: " + ex_4.code + ", ex: " + ex_4.message);
                            vm.fail();
                            throw ex_4;
                        }
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, client_1.default.fcClient.updateService(name, serviceConfig)];
                    case 5:
                        res = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        vm.fail();
                        throw e_1;
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        vm.succeed("Make service " + name + " success.");
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Component.makeFunction = function (serviceName, functionName, functionConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, filename, runtime, customContainerConfig, ossBucket, ossKey, res, ex_5, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = core_1.spinner("Make function " + serviceName + "/" + functionName + "...");
                        filename = functionConfig.filename, runtime = functionConfig.runtime, customContainerConfig = functionConfig.customContainerConfig, ossBucket = functionConfig.ossBucket, ossKey = functionConfig.ossKey;
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
                        return [4 /*yield*/, client_1.default.fcClient.updateFunction(serviceName, functionName, functionConfig)];
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
                        return [4 /*yield*/, client_1.default.fcClient.createFunction(serviceName, functionConfig)];
                    case 5:
                        res = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_2 = _a.sent();
                        vm.fail();
                        throw e_2;
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        vm.succeed("Make function " + serviceName + "/" + functionName + " success.");
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Component.makeTrigger = function (serviceName, functionName, triggerConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var triggerName, vm, res, ex_6, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        triggerName = triggerConfig.triggerName;
                        vm = core_1.spinner("Make trigger " + serviceName + "/" + functionName + "/" + triggerName + "...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 8]);
                        return [4 /*yield*/, client_1.default.fcClient.createTrigger(serviceName, functionName, triggerConfig)];
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
                        return [4 /*yield*/, client_1.default.fcClient.updateTrigger(serviceName, functionName, triggerName, triggerConfig)];
                    case 5:
                        res = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_3 = _a.sent();
                        if (e_3.message.includes('Updating trigger is not supported yet.')) {
                            vm.warn("Updating " + serviceName + "/" + functionName + "/" + triggerName + " is not supported yet.");
                            return [2 /*return*/, triggerConfig];
                        }
                        vm.fail();
                        throw e_3;
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        vm.succeed("Make trigger " + serviceName + "/" + functionName + "/" + triggerName + " success.");
                        return [2 /*return*/, res];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger('FC-BASE-SDK'),
        __metadata("design:type", Object)
    ], Component, "logger", void 0);
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVzb3VyY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQWtFO0FBQ2xFLDBDQUFvQjtBQUNwQixrREFBdUI7QUFDdkIsMkJBQTJCO0FBQzNCLDJEQUFxQztBQUNyQyx3Q0FBd0Q7QUFFeEQsa0RBQXdFO0FBRXhFLElBQU0sU0FBUyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUU3RTtJQUFBO0lBOE5BLENBQUM7SUExTmMsZ0JBQU0sR0FBbkIsVUFBb0IsS0FBa0IsRUFBRSxFQUF1QjtZQUFyQixhQUFhLG1CQUFBLEVBQUUsSUFBSSxVQUFBOzs7Ozs7d0JBQ25ELE9BQU8sR0FBeUMsS0FBSyxRQUE5QyxFQUFZLGNBQWMsR0FBZSxLQUFLLFNBQXBCLEVBQUUsUUFBUSxHQUFLLEtBQUssU0FBVixDQUFXO3dCQUN4RCxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDM0IsWUFBWSxHQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxJQUFJLENBQUM7d0JBRXBDLGFBQWEsR0FBRyxhQUFhLEtBQUssU0FBUyxDQUFDO3dCQUM1QyxjQUFjLEdBQUcsYUFBYSxLQUFLLFVBQVUsSUFBSSxhQUFhLENBQUM7NkJBRWpFLFFBQVEsRUFBUix3QkFBUTt3QkFDTixVQUFVLEdBQUcsS0FBSyxDQUFDO3dCQUNqQixvQkFBb0IsR0FBRyxJQUFJLElBQUksYUFBYSxLQUFLLFNBQVMsQ0FBQzs4QkFDckIsRUFBUixxQkFBUTs7OzZCQUFSLENBQUEsc0JBQVEsQ0FBQTt3QkFBekIsV0FBVyxzQkFBQTt3QkFDNUIsSUFBSSxvQkFBb0IsRUFBRTs0QkFDeEIsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO2dD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