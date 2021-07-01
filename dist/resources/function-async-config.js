"use strict";
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
exports.makeDestination = void 0;
var lodash_1 = __importDefault(require("lodash"));
var client_1 = __importDefault(require("../utils/client"));
function makeDestination(_a) {
    var serviceName = _a.serviceName, functionName = _a.functionName, asyncConfiguration = _a.asyncConfiguration, _b = _a.qualifier, qualifier = _b === void 0 ? 'LATEST' : _b;
    return __awaiter(this, void 0, void 0, function () {
        var accountId, region, fcClient, destination, onSuccess, onFailure, hasAsyncConfig, data, asyncConfigCache, ex_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (lodash_1.default.isEmpty(asyncConfiguration)) {
                        return [2 /*return*/];
                    }
                    accountId = client_1.default.credentials.AccountID;
                    region = client_1.default.region;
                    fcClient = client_1.default.fcClient();
                    destination = (asyncConfiguration === null || asyncConfiguration === void 0 ? void 0 : asyncConfiguration.destination) || {};
                    asyncConfiguration === null || asyncConfiguration === void 0 ? true : delete asyncConfiguration.destination;
                    asyncConfiguration.destinationConfig = destination;
                    onSuccess = destination.onSuccess, onFailure = destination.onFailure;
                    if (onSuccess) {
                        asyncConfiguration.destinationConfig.onSuccess = {
                            destination: onSuccess.replace(':::', ":" + region + ":" + accountId + ":"),
                        };
                    }
                    if (onFailure) {
                        asyncConfiguration.destinationConfig.onFailure = {
                            destination: onFailure.replace(':::', ":" + region + ":" + accountId + ":"),
                        };
                    }
                    hasAsyncConfig = false;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fcClient.getFunctionAsyncConfig(serviceName, functionName, qualifier)];
                case 2:
                    data = (_c.sent()).data;
                    asyncConfigCache = {
                        destinationConfig: data.destinationConfig,
                        maxAsyncEventAgeInSeconds: data.maxAsyncEventAgeInSeconds,
                        statefulInvocation: data.statefulInvocation,
                        maxAsyncRetryAttempts: data.maxAsyncRetryAttempts,
                    };
                    if (lodash_1.default.isEqual(asyncConfiguration, asyncConfigCache)) {
                        return [2 /*return*/];
                    }
                    hasAsyncConfig = true;
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _c.sent();
                    if (ex_1.code !== 'AsyncConfigNotExists') {
                        throw ex_1;
                    }
                    return [3 /*break*/, 4];
                case 4:
                    if (!hasAsyncConfig) return [3 /*break*/, 6];
                    return [4 /*yield*/, fcClient.deleteFunctionAsyncConfig(serviceName, functionName, qualifier)];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    if (!asyncConfiguration) return [3 /*break*/, 8];
                    return [4 /*yield*/, fcClient.putFunctionAsyncConfig(serviceName, functionName, qualifier, asyncConfiguration)];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.makeDestination = makeDestination;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24tYXN5bmMtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Jlc291cmNlcy9mdW5jdGlvbi1hc3luYy1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQXVCO0FBQ3ZCLDJEQUFxQztBQUVyQyxTQUFzQixlQUFlLENBQUMsRUFLckM7UUFKQyxXQUFXLGlCQUFBLEVBQ1gsWUFBWSxrQkFBQSxFQUNaLGtCQUFrQix3QkFBQSxFQUNsQixpQkFBb0IsRUFBcEIsU0FBUyxtQkFBRyxRQUFRLEtBQUE7Ozs7OztvQkFFcEIsSUFBSSxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO3dCQUFFLHNCQUFPO3FCQUFFO29CQUN4QyxTQUFTLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO29CQUN2QyxNQUFNLEdBQUssZ0JBQU0sT0FBWCxDQUFZO29CQUNwQixRQUFRLEdBQUcsZ0JBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFFN0IsV0FBVyxHQUFHLENBQUEsa0JBQWtCLGFBQWxCLGtCQUFrQix1QkFBbEIsa0JBQWtCLENBQUUsV0FBVyxLQUFJLEVBQUUsQ0FBQztvQkFDbkQsa0JBQWtCLGFBQWxCLGtCQUFrQiw0QkFBbEIsa0JBQWtCLENBQUUsV0FBVyxDQUFDO29CQUV2QyxrQkFBa0IsQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUM7b0JBQzNDLFNBQVMsR0FBZ0IsV0FBVyxVQUEzQixFQUFFLFNBQVMsR0FBSyxXQUFXLFVBQWhCLENBQWlCO29CQUM3QyxJQUFJLFNBQVMsRUFBRTt3QkFDYixrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUc7NEJBQy9DLFdBQVcsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFJLE1BQU0sU0FBSSxTQUFTLE1BQUcsQ0FBQzt5QkFDbEUsQ0FBQztxQkFDSDtvQkFDRCxJQUFJLFNBQVMsRUFBRTt3QkFDYixrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUc7NEJBQy9DLFdBQVcsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFJLE1BQU0sU0FBSSxTQUFTLE1BQUcsQ0FBQzt5QkFDbEUsQ0FBQztxQkFDSDtvQkFFRyxjQUFjLEdBQUcsS0FBSyxDQUFDOzs7O29CQUVSLHFCQUFNLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUFBOztvQkFBcEYsSUFBSSxHQUFLLENBQUEsU0FBMkUsQ0FBQSxLQUFoRjtvQkFDTixnQkFBZ0IsR0FBRzt3QkFDdkIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjt3QkFDekMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5Qjt3QkFDekQsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjt3QkFDM0MscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtxQkFDbEQsQ0FBQztvQkFDRixJQUFJLGdCQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLEVBQUU7d0JBQ25ELHNCQUFPO3FCQUNSO29CQUNELGNBQWMsR0FBRyxJQUFJLENBQUM7Ozs7b0JBRXRCLElBQUksSUFBRSxDQUFDLElBQUksS0FBSyxzQkFBc0IsRUFBRTt3QkFDdEMsTUFBTSxJQUFFLENBQUM7cUJBQ1Y7Ozt5QkFHQyxjQUFjLEVBQWQsd0JBQWM7b0JBQ2hCLHFCQUFNLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUFBOztvQkFBOUUsU0FBOEUsQ0FBQzs7O3lCQUc3RSxrQkFBa0IsRUFBbEIsd0JBQWtCO29CQUNwQixxQkFBTSxRQUFRLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsa0JBQWtCLENBQUMsRUFBQTs7b0JBQS9GLFNBQStGLENBQUM7Ozs7OztDQUVuRztBQXJERCwwQ0FxREMifQ==