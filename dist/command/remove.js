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
var lodash_1 = __importDefault(require("lodash"));
var client_1 = __importDefault(require("../utils/client"));
var utils_1 = require("../utils/utils");
var errorCode = ['ServiceNotFound', 'FunctionNotFound', 'TriggerNotFound'];
var Component = /** @class */ (function () {
    function Component(region) {
        this.removeNameList = {};
        this.region = region;
    }
    Component.prototype.trigger = function (props, _a, command) {
        var force = _a.force, silent = _a.silent, triggerName = _a.triggerName;
        return __awaiter(this, void 0, void 0, function () {
            var _b, service, functionConfig, _c, triggers, serviceName, functionName, _i, triggers_1, name_1, deleteTriggerList, yamlTriggerNames, listTrigger, listTriggerNames, showTip, _d, deleteTriggerList_1, name_2;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!!this.fcClient) return [3 /*break*/, 2];
                        _b = this;
                        return [4 /*yield*/, client_1.default.fcClient()];
                    case 1:
                        _b.fcClient = _e.sent();
                        _e.label = 2;
                    case 2:
                        service = props.service, functionConfig = props.function, _c = props.triggers, triggers = _c === void 0 ? [] : _c;
                        serviceName = (service === null || service === void 0 ? void 0 : service.name) || (functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.service);
                        functionName = functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name;
                        if (lodash_1.default.isEmpty(serviceName)) {
                            throw new Error('Delete trigger, service name cannot be empty');
                        }
                        if (lodash_1.default.isEmpty(functionName)) {
                            throw new Error('Delete trigger, function name cannot be empty');
                        }
                        if (!triggerName) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.deleteTrigger(serviceName, functionName, triggerName)];
                    case 3: return [2 /*return*/, _e.sent()];
                    case 4:
                        if (!(silent || command === 'trigger')) return [3 /*break*/, 9];
                        _i = 0, triggers_1 = triggers;
                        _e.label = 5;
                    case 5:
                        if (!(_i < triggers_1.length)) return [3 /*break*/, 8];
                        name_1 = triggers_1[_i].name;
                        return [4 /*yield*/, this.deleteTrigger(serviceName, functionName, name_1)];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                    case 9:
                        yamlTriggerNames = triggers.map(function (_a) {
                            var name = _a.name;
                            return name;
                        });
                        return [4 /*yield*/, this.getListData("/services/" + serviceName + "/functions/" + functionName + "/triggers", 'triggers')];
                    case 10:
                        listTrigger = _e.sent();
                        listTriggerNames = listTrigger.map(function (item) { return item.triggerName; });
                        if (!force) return [3 /*break*/, 11];
                        deleteTriggerList = Array.from(yamlTriggerNames.concat(listTriggerNames));
                        return [3 /*break*/, 13];
                    case 11:
                        showTip = {
                            prompt: serviceName + "/" + functionName + " has triggers outside the configuration, delete all?",
                            showKey: [
                                'serviceName',
                                'functionName',
                                'triggerName',
                                'qualifier',
                                'triggerType',
                                'description',
                            ],
                            data: listTrigger.map(function (item) { return ({
                                serviceName: serviceName,
                                functionName: functionName,
                                triggerName: item.triggerName,
                                qualifier: item.qualifier,
                                triggerType: item.triggerType,
                                description: item.description,
                            }); }),
                        };
                        return [4 /*yield*/, this.getDeleteList(yamlTriggerNames, listTriggerNames, showTip)];
                    case 12:
                        deleteTriggerList = _e.sent();
                        _e.label = 13;
                    case 13:
                        this.logger.debug("delete trigger list: " + JSON.stringify(deleteTriggerList));
                        _d = 0, deleteTriggerList_1 = deleteTriggerList;
                        _e.label = 14;
                    case 14:
                        if (!(_d < deleteTriggerList_1.length)) return [3 /*break*/, 17];
                        name_2 = deleteTriggerList_1[_d];
                        return [4 /*yield*/, this.deleteTrigger(serviceName, functionName, name_2)];
                    case 15:
                        _e.sent();
                        _e.label = 16;
                    case 16:
                        _d++;
                        return [3 /*break*/, 14];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.function = function (props, _a, command) {
        var _b, _c, _d;
        var force = _a.force, silent = _a.silent;
        return __awaiter(this, void 0, void 0, function () {
            var _e, serviceName, functionName, listFunctions, listFunctionNames, deleteFunctionList, yamlNames, showTip, _i, deleteFunctionList_1, name_3, cloneProps;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!!this.fcClient) return [3 /*break*/, 2];
                        _e = this;
                        return [4 /*yield*/, client_1.default.fcClient()];
                    case 1:
                        _e.fcClient = _f.sent();
                        _f.label = 2;
                    case 2:
                        serviceName = ((_b = props.service) === null || _b === void 0 ? void 0 : _b.name) || ((_c = props.function) === null || _c === void 0 ? void 0 : _c.service);
                        functionName = ((_d = props.function) === null || _d === void 0 ? void 0 : _d.name) || '';
                        if (lodash_1.default.isEmpty(serviceName)) {
                            throw new Error('Delete function, service name cannot be empty');
                        }
                        if (!(silent || command === 'function')) return [3 /*break*/, 5];
                        if (lodash_1.default.isEmpty(functionName)) {
                            throw new Error('Delete function, function name cannot be empty');
                        }
                        return [4 /*yield*/, this.trigger(props, { force: force, silent: silent }, 'function')];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, this.deleteFunction(serviceName, functionName)];
                    case 4: return [2 /*return*/, _f.sent()];
                    case 5: return [4 /*yield*/, this.getListData("/services/" + serviceName + "/functions", 'functions')];
                    case 6:
                        listFunctions = _f.sent();
                        listFunctionNames = listFunctions.map(function (item) { return item.functionName; });
                        if (!force) return [3 /*break*/, 7];
                        deleteFunctionList = listFunctionNames;
                        return [3 /*break*/, 9];
                    case 7:
                        yamlNames = lodash_1.default.isEmpty(functionName) ? [] : [functionName];
                        showTip = {
                            prompt: serviceName + " has function outside the configuration, delete all?",
                            showKey: [
                                'serviceName',
                                'functionName',
                                'runtime',
                                'description',
                            ],
                            data: listFunctions.map(function (item) { return ({
                                serviceName: serviceName,
                                functionName: item.functionName,
                                description: item.functionName,
                                runtime: item.runtime,
                            }); }),
                        };
                        return [4 /*yield*/, this.getDeleteList(yamlNames, listFunctionNames, showTip)];
                    case 8:
                        deleteFunctionList = _f.sent();
                        _f.label = 9;
                    case 9:
                        this.logger.debug("delete function list: " + JSON.stringify(deleteFunctionList));
                        _i = 0, deleteFunctionList_1 = deleteFunctionList;
                        _f.label = 10;
                    case 10:
                        if (!(_i < deleteFunctionList_1.length)) return [3 /*break*/, 14];
                        name_3 = deleteFunctionList_1[_i];
                        cloneProps = lodash_1.default.cloneDeep(props);
                        if (lodash_1.default.isEmpty(cloneProps.function)) {
                            cloneProps.function = {
                                name: name_3,
                                handler: '',
                                runtime: '',
                            };
                        }
                        else {
                            cloneProps.function.name = name_3;
                        }
                        return [4 /*yield*/, this.trigger(cloneProps, { force: force, silent: silent }, 'function')];
                    case 11:
                        _f.sent();
                        return [4 /*yield*/, this.deleteFunction(serviceName, name_3)];
                    case 12:
                        _f.sent();
                        _f.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 10];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.service = function (props, _a) {
        var _b;
        var force = _a.force, silent = _a.silent;
        return __awaiter(this, void 0, void 0, function () {
            var _c, serviceName;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.fcClient) return [3 /*break*/, 2];
                        _c = this;
                        return [4 /*yield*/, client_1.default.fcClient()];
                    case 1:
                        _c.fcClient = _d.sent();
                        _d.label = 2;
                    case 2:
                        serviceName = (_b = props.service) === null || _b === void 0 ? void 0 : _b.name;
                        if (lodash_1.default.isEmpty(serviceName)) {
                            throw new Error('Delete service, service name cannot be empty');
                        }
                        return [4 /*yield*/, this.function(props, { force: force, silent: silent }, 'service')];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, this.deleteService(serviceName)];
                    case 4:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.all = function (props, removeInputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service(props, removeInputs)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.deleteService = function (serviceName) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, stateId, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = core_1.spinner("Delete service " + serviceName + "...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.fcClient.deleteService(serviceName)];
                    case 2:
                        _a.sent();
                        vm.succeed("Delete service " + serviceName + " success.");
                        this.removeNameList.service = serviceName;
                        stateId = this.fcClient.accountid + "-" + this.region + "-" + serviceName;
                        return [4 /*yield*/, this.unsetState(stateId)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        if (!errorCode.includes(ex_1.code)) {
                            vm.fail();
                            throw ex_1;
                        }
                        vm.warn("[" + ex_1.code + "], " + ex_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.deleteFunction = function (serviceName, functionName) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, stateId, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = core_1.spinner("Delete function " + serviceName + "/" + functionName + "...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.fcClient.deleteFunction(serviceName, functionName)];
                    case 2:
                        _a.sent();
                        vm.succeed("Delete function " + serviceName + "/" + functionName + " success.");
                        this.removeNameList.functions || (this.removeNameList.functions = []);
                        this.removeNameList.functions.push(functionName);
                        stateId = this.fcClient.accountid + "-" + this.region + "-" + serviceName + "-" + functionName;
                        return [4 /*yield*/, this.unsetState(stateId)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_2 = _a.sent();
                        if (!errorCode.includes(ex_2.code)) {
                            vm.fail();
                            throw ex_2;
                        }
                        vm.warn("[" + ex_2.code + "], " + ex_2.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.deleteTrigger = function (serviceName, functionName, triggerName) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, stateId, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = core_1.spinner("Delete trigger " + serviceName + "/" + functionName + "/" + triggerName + "...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.fcClient.deleteTrigger(serviceName, functionName, triggerName)];
                    case 2:
                        _a.sent();
                        vm.succeed("Delete trigger " + serviceName + "/" + functionName + "/" + triggerName + " success.");
                        this.removeNameList.triggers || (this.removeNameList.triggers = []);
                        this.removeNameList.triggers.push(triggerName);
                        stateId = this.fcClient.accountid + "-" + this.region + "-" + serviceName + "-" + functionName + "-" + triggerName;
                        return [4 /*yield*/, this.unsetState(stateId)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_3 = _a.sent();
                        if (!errorCode.includes(ex_3.code)) {
                            vm.fail();
                            throw ex_3;
                        }
                        vm.warn("[" + ex_3.code + "], " + ex_3.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.unsetState = function (stateId) {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core_1.getState(stateId)];
                    case 1:
                        state = _a.sent();
                        if (!!lodash_1.default.isEmpty(state)) return [3 /*break*/, 3];
                        return [4 /*yield*/, core_1.setState(stateId, {})];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.getDeleteList = function (yamlArr, arr, showTip) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, arr_1, name_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, arr_1 = arr;
                        _a.label = 1;
                    case 1:
                        if (!(_i < arr_1.length)) return [3 /*break*/, 4];
                        name_4 = arr_1[_i];
                        if (!!yamlArr.includes(name_4)) return [3 /*break*/, 3];
                        utils_1.tableShow(showTip.data, showTip.showKey);
                        return [4 /*yield*/, utils_1.promptForConfirmOrDetails(showTip.prompt)];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, Array.from(yamlArr.concat(arr))];
                        }
                        else {
                            return [2 /*return*/, yamlArr];
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, yamlArr];
                }
            });
        });
    };
    Component.prototype.getListData = function (path, dataKeyword, options, headers) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var data, res, keywordData, ex_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        data = [];
                        _c.label = 1;
                    case 1: return [4 /*yield*/, this.fcClient.get(path, options, headers)];
                    case 2:
                        res = _c.sent();
                        keywordData = (_a = res.data) === null || _a === void 0 ? void 0 : _a[dataKeyword];
                        options.nextToken = (_b = res.data) === null || _b === void 0 ? void 0 : _b.nextToken;
                        if (!lodash_1.default.isEmpty(keywordData)) {
                            data = data.concat(keywordData);
                        }
                        _c.label = 3;
                    case 3:
                        if (options.nextToken) return [3 /*break*/, 1];
                        _c.label = 4;
                    case 4: return [2 /*return*/, data];
                    case 5:
                        ex_4 = _c.sent();
                        this.logger.warn("get " + path + " error: " + ex_4.code + "\n" + ex_4.message);
                        return [2 /*return*/, []];
                    case 6: return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvcmVtb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLDJDQUEyQztBQUMzQyw4Q0FBc0Y7QUFDdEYsa0RBQXVCO0FBQ3ZCLDJEQUFxQztBQUVyQyx3Q0FBc0U7QUFFdEUsSUFBTSxTQUFTLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBTzdFO0lBTUUsbUJBQVksTUFBTTtRQUZsQixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUd2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUssMkJBQU8sR0FBYixVQUFjLEtBQWtCLEVBQUUsRUFBaUQsRUFBRSxPQUFnQjtZQUFqRSxLQUFLLFdBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxXQUFXLGlCQUFBOzs7Ozs7NkJBQ3hELENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBZCx3QkFBYzt3QkFBSSxLQUFBLElBQUksQ0FBQTt3QkFBWSxxQkFBTSxnQkFBTSxDQUFDLFFBQVEsRUFBRSxFQUFBOzt3QkFBdkMsR0FBSyxRQUFRLEdBQUcsU0FBdUIsQ0FBQzs7O3dCQUN0RCxPQUFPLEdBQThDLEtBQUssUUFBbkQsRUFBWSxjQUFjLEdBQW9CLEtBQUssU0FBekIsRUFBRSxLQUFrQixLQUFLLFNBQVYsRUFBYixRQUFRLG1CQUFHLEVBQUUsS0FBQSxDQUFXO3dCQUM3RCxXQUFXLEdBQUcsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxNQUFJLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxPQUFPLENBQUEsQ0FBQzt3QkFDdkQsWUFBWSxHQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FB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