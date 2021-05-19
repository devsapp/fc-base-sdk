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
                        if (['ServiceNotFound', 'TriggerNotFound'].includes(ex_1.code)) {
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
                        if (ex_2.code !== 'ServiceNotFound') {
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
                        if (ex_3.code !== 'ServiceNotFound') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVzb3VyY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQWtFO0FBQ2xFLDBDQUFvQjtBQUNwQixrREFBdUI7QUFDdkIsMkJBQTJCO0FBQzNCLDJEQUFxQztBQUNyQyx3Q0FBd0Q7QUFFeEQsa0RBQXdFO0FBRXhFO0lBQUE7SUE4TkEsQ0FBQztJQTFOYyxnQkFBTSxHQUFuQixVQUFvQixLQUFrQixFQUFFLEVBQXVCO1lBQXJCLGFBQWEsbUJBQUEsRUFBRSxJQUFJLFVBQUE7Ozs7Ozt3QkFDbkQsT0FBTyxHQUF5QyxLQUFLLFFBQTlDLEVBQVksY0FBYyxHQUFlLEtBQUssU0FBcEIsRUFBRSxRQUFRLEdBQUssS0FBSyxTQUFWLENBQVc7d0JBQ3hELFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUMzQixZQUFZLEdBQUcsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLElBQUksQ0FBQzt3QkFFcEMsYUFBYSxHQUFHLGFBQWEsS0FBSyxTQUFTLENBQUM7d0JBQzVDLGNBQWMsR0FBRyxhQUFhLEtBQUssVUFBVSxJQUFJLGFBQWEsQ0FBQzs2QkFFakUsUUFBUSxFQUFSLHdCQUFRO3dCQUNOLFVBQVUsR0FBRyxLQUFLLENBQUM7d0JBQ2pCLG9CQUFvQixHQUFHLElBQUksSUFBSSxhQUFhLEtBQUssU0FBUyxDQUFDOzhCQUNyQixFQUFSLHFCQUFROzs7NkJBQVIsQ0FBQSxzQkFBUSxDQUFBO3dCQUF6QixXQUFXLHNCQUFBO3dCQUM1QixJQUFJLG9CQUFvQixFQUFFOzRCQUN4QixJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0NBQ3hCLHdCQUFTOzZCQUNWOzRCQUNELFVBQVUsR0FBRyxJQUFJLENBQUM7eUJBQ25CO3dCQUNLLEVBQUUsR0FBRyxj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