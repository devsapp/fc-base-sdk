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
        this.fcClient = client_1.default.fcClient();
    }
    Component.prototype.trigger = function (props, _a, command) {
        var force = _a.force, silent = _a.silent, triggerName = _a.triggerName;
        return __awaiter(this, void 0, void 0, function () {
            var service, functionConfig, _b, triggers, serviceName, functionName, _i, triggers_1, name_1, deleteTriggerList, yamlTriggerNames, listTrigger, listTriggerNames, showTip, _c, deleteTriggerList_1, name_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        service = props.service, functionConfig = props.function, _b = props.triggers, triggers = _b === void 0 ? [] : _b;
                        serviceName = (service === null || service === void 0 ? void 0 : service.name) || (functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.service);
                        functionName = functionConfig === null || functionConfig === void 0 ? void 0 : functionConfig.name;
                        if (lodash_1.default.isEmpty(serviceName)) {
                            throw new Error('Delete trigger, service name cannot be empty');
                        }
                        if (lodash_1.default.isEmpty(functionName)) {
                            throw new Error('Delete trigger, function name cannot be empty');
                        }
                        if (!triggerName) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deleteTrigger(serviceName, functionName, triggerName)];
                    case 1: return [2 /*return*/, _d.sent()];
                    case 2:
                        if (!(silent || command === 'trigger')) return [3 /*break*/, 7];
                        _i = 0, triggers_1 = triggers;
                        _d.label = 3;
                    case 3:
                        if (!(_i < triggers_1.length)) return [3 /*break*/, 6];
                        name_1 = triggers_1[_i].name;
                        return [4 /*yield*/, this.deleteTrigger(serviceName, functionName, name_1)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                    case 7:
                        yamlTriggerNames = triggers.map(function (_a) {
                            var name = _a.name;
                            return name;
                        });
                        return [4 /*yield*/, this.getListData("/services/" + serviceName + "/functions/" + functionName + "/triggers", 'triggers')];
                    case 8:
                        listTrigger = _d.sent();
                        listTriggerNames = listTrigger.map(function (item) { return item.triggerName; });
                        if (!force) return [3 /*break*/, 9];
                        deleteTriggerList = Array.from(yamlTriggerNames.concat(listTriggerNames));
                        return [3 /*break*/, 11];
                    case 9:
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
                    case 10:
                        deleteTriggerList = _d.sent();
                        _d.label = 11;
                    case 11:
                        this.logger.debug("delete trigger list: " + JSON.stringify(deleteTriggerList));
                        _c = 0, deleteTriggerList_1 = deleteTriggerList;
                        _d.label = 12;
                    case 12:
                        if (!(_c < deleteTriggerList_1.length)) return [3 /*break*/, 15];
                        name_2 = deleteTriggerList_1[_c];
                        return [4 /*yield*/, this.deleteTrigger(serviceName, functionName, name_2)];
                    case 13:
                        _d.sent();
                        _d.label = 14;
                    case 14:
                        _c++;
                        return [3 /*break*/, 12];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.function = function (props, _a, command) {
        var _b, _c, _d;
        var force = _a.force, silent = _a.silent;
        return __awaiter(this, void 0, void 0, function () {
            var serviceName, functionName, listFunctions, listFunctionNames, deleteFunctionList, yamlNames, showTip, _i, deleteFunctionList_1, name_3, cloneProps;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        serviceName = ((_b = props.service) === null || _b === void 0 ? void 0 : _b.name) || ((_c = props.function) === null || _c === void 0 ? void 0 : _c.service);
                        functionName = ((_d = props.function) === null || _d === void 0 ? void 0 : _d.name) || '';
                        if (lodash_1.default.isEmpty(serviceName)) {
                            throw new Error('Delete function, service name cannot be empty');
                        }
                        if (!(silent || command === 'function')) return [3 /*break*/, 3];
                        if (lodash_1.default.isEmpty(functionName)) {
                            throw new Error('Delete function, function name cannot be empty');
                        }
                        return [4 /*yield*/, this.trigger(props, { force: force, silent: silent }, 'function')];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, this.deleteFunction(serviceName, functionName)];
                    case 2: return [2 /*return*/, _e.sent()];
                    case 3: return [4 /*yield*/, this.getListData("/services/" + serviceName + "/functions", 'functions')];
                    case 4:
                        listFunctions = _e.sent();
                        listFunctionNames = listFunctions.map(function (item) { return item.functionName; });
                        if (!force) return [3 /*break*/, 5];
                        deleteFunctionList = listFunctionNames;
                        return [3 /*break*/, 7];
                    case 5:
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
                    case 6:
                        deleteFunctionList = _e.sent();
                        _e.label = 7;
                    case 7:
                        this.logger.debug("delete function list: " + JSON.stringify(deleteFunctionList));
                        _i = 0, deleteFunctionList_1 = deleteFunctionList;
                        _e.label = 8;
                    case 8:
                        if (!(_i < deleteFunctionList_1.length)) return [3 /*break*/, 12];
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
                    case 9:
                        _e.sent();
                        return [4 /*yield*/, this.deleteFunction(serviceName, name_3)];
                    case 10:
                        _e.sent();
                        _e.label = 11;
                    case 11:
                        _i++;
                        return [3 /*break*/, 8];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Component.prototype.service = function (props, _a) {
        var _b;
        var force = _a.force, silent = _a.silent;
        return __awaiter(this, void 0, void 0, function () {
            var serviceName;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        serviceName = (_b = props.service) === null || _b === void 0 ? void 0 : _b.name;
                        if (lodash_1.default.isEmpty(serviceName)) {
                            throw new Error('Delete service, service name cannot be empty');
                        }
                        return [4 /*yield*/, this.function(props, { force: force, silent: silent }, 'service')];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, this.deleteService(serviceName)];
                    case 2:
                        _c.sent();
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
                        this.removeNameList.functions.push({ serviceName: serviceName, functionName: functionName });
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
                        this.removeNameList.triggers.push({ serviceName: serviceName, functionName: functionName, triggerName: triggerName });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvcmVtb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLDJDQUEyQztBQUMzQyw4Q0FBc0Y7QUFDdEYsa0RBQXVCO0FBQ3ZCLDJEQUFxQztBQUVyQyx3Q0FBc0U7QUFFdEUsSUFBTSxTQUFTLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBTzdFO0lBTUUsbUJBQVksTUFBTTtRQUZsQixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUd2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVLLDJCQUFPLEdBQWIsVUFBYyxLQUFrQixFQUFFLEVBQWlELEVBQUUsT0FBZ0I7WUFBakUsS0FBSyxXQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsV0FBVyxpQkFBQTs7Ozs7O3dCQUNwRCxPQUFPLEdBQThDLEtBQUssUUFBbkQsRUFBWSxjQUFjLEdBQW9CLEtBQUssU0FBekIsRUFBRSxLQUFrQixLQUFLLFNBQVYsRUFBYixRQUFRLG1CQUFHLEVBQUUsS0FBQSxDQUFXO3dCQUM3RCxXQUFXLEdBQUcsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxNQUFJLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxPQUFPLENBQUEsQ0FBQzt3QkFDdkQsWUFBWSxHQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxJQUFJLENBQUM7d0JBRTFDLElBQUksZ0JBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7NEJBQzFCLE1BQU0sSUFBSSxLQUFL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