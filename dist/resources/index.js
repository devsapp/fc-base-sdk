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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVzb3VyY2VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQWtFO0FBQ2xFLDBDQUFvQjtBQUNwQiwyQkFBMkI7QUFDM0IsMkRBQXFDO0FBQ3JDLHdDQUF3RDtBQUV4RCxrREFBd0U7QUFFeEU7SUFBQTtJQTJOQSxDQUFDO0lBdk5jLGdCQUFNLEdBQW5CLFVBQW9CLEtBQWtCLEVBQUUsRUFBdUI7WUFBckIsYUFBYSxtQkFBQSxFQUFFLElBQUksVUFBQTs7Ozs7O3dCQUNuRCxPQUFPLEdBQXlDLEtBQUssUUFBOUMsRUFBWSxjQUFjLEdBQWUsS0FBSyxTQUFwQixFQUFFLFFBQVEsR0FBSyxLQUFLLFNBQVYsQ0FBVzt3QkFDeEQsV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQzNCLFlBQVksR0FBRyxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsSUFBSSxDQUFDO3dCQUVwQyxhQUFhLEdBQUcsYUFBYSxLQUFLLFNBQVMsQ0FBQzt3QkFDNUMsY0FBYyxHQUFHLGFBQWEsS0FBSyxVQUFVLElBQUksYUFBYSxDQUFDOzZCQUVqRSxRQUFRLEVBQVIsd0JBQVE7d0JBQ04sVUFBVSxHQUFHLEtBQUssQ0FBQzt3QkFDakIsb0JBQW9CLEdBQUcsSUFBSSxJQUFJLGFBQWEsS0FBSyxTQUFTLENBQUM7OEJBQ3JCLEVBQVIscUJBQVE7Ozs2QkFBUixDQUFBLHNCQUFRLENBQUE7d0JBQXpCLFdBQVcsc0JBQUE7d0JBQzVCLElBQUksb0JBQW9CLEVBQUU7NEJBQ3hCLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtnQ0FDeEIsd0JBQVM7NkJBQ1Y7NEJBQ0QsVUFBVSxHQUFHLElBQUksQ0FBQzt5QkFDbkI7d0JBQ0ssRUFBRSxHQUFHLGNBQU8sQ0FBQyxvQkFB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