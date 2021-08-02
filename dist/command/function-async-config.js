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
        var accountId, region, fcClient, destination, onSuccess, onFailure, destinationConfig, hasAsyncConfig, data, asyncConfigCache, ex_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    accountId = client_1.default.credentials.AccountID;
                    region = client_1.default.region;
                    return [4 /*yield*/, client_1.default.fcClient()];
                case 1:
                    fcClient = _c.sent();
                    if (!lodash_1.default.isEmpty(asyncConfiguration)) {
                        destination = asyncConfiguration.destination || {};
                        onSuccess = destination.onSuccess, onFailure = destination.onFailure;
                        delete asyncConfiguration.destination;
                        destinationConfig = {};
                        if (onSuccess) {
                            destinationConfig.onSuccess = {
                                destination: onSuccess.replace(':::', ":" + region + ":" + accountId + ":"),
                            };
                        }
                        if (onFailure) {
                            destinationConfig.onFailure = {
                                destination: onFailure.replace(':::', ":" + region + ":" + accountId + ":"),
                            };
                        }
                        asyncConfiguration.destinationConfig = destinationConfig;
                    }
                    hasAsyncConfig = false;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fcClient.getFunctionAsyncConfig(serviceName, functionName, qualifier)];
                case 3:
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
                    return [3 /*break*/, 5];
                case 4:
                    ex_1 = _c.sent();
                    if (ex_1.code !== 'AsyncConfigNotExists') {
                        throw ex_1;
                    }
                    return [3 /*break*/, 5];
                case 5:
                    if (!hasAsyncConfig) return [3 /*break*/, 7];
                    return [4 /*yield*/, fcClient.deleteFunctionAsyncConfig(serviceName, functionName, qualifier)];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    if (!asyncConfiguration) return [3 /*break*/, 9];
                    return [4 /*yield*/, fcClient.putFunctionAsyncConfig(serviceName, functionName, qualifier, asyncConfiguration)];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.makeDestination = makeDestination;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24tYXN5bmMtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb24tYXN5bmMtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUF1QjtBQUN2QiwyREFBcUM7QUFFckMsU0FBc0IsZUFBZSxDQUFDLEVBS3JDO1FBSkMsV0FBVyxpQkFBQSxFQUNYLFlBQVksa0JBQUEsRUFDWixrQkFBa0Isd0JBQUEsRUFDbEIsaUJBQW9CLEVBQXBCLFNBQVMsbUJBQUcsUUFBUSxLQUFBOzs7Ozs7b0JBRWQsU0FBUyxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztvQkFDdkMsTUFBTSxHQUFLLGdCQUFNLE9BQVgsQ0FBWTtvQkFDVCxxQkFBTSxnQkFBTSxDQUFDLFFBQVEsRUFBRSxFQUFBOztvQkFBbEMsUUFBUSxHQUFHLFNBQXVCO29CQUV4QyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTt3QkFDNUIsV0FBVyxHQUFHLGtCQUFrQixDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7d0JBQ2pELFNBQVMsR0FBZ0IsV0FBVyxVQUEzQixFQUFFLFNBQVMsR0FBSyxXQUFXLFVBQWhCLENBQWlCO3dCQUM3QyxPQUFPLGtCQUFrQixDQUFDLFdBQVcsQ0FBQzt3QkFFaEMsaUJBQWlCLEdBQVEsRUFBRSxDQUFDO3dCQUNsQyxJQUFJLFNBQVMsRUFBRTs0QkFDYixpQkFBaUIsQ0FBQyxTQUFTLEdBQUc7Z0NBQzVCLFdBQVcsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFJLE1BQU0sU0FBSSxTQUFTLE1BQUcsQ0FBQzs2QkFDbEUsQ0FBQzt5QkFDSDt3QkFDRCxJQUFJLFNBQVMsRUFBRTs0QkFDYixpQkFBaUIsQ0FBQyxTQUFTLEdBQUc7Z0NBQzVCLFdBQVcsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFJLE1BQU0sU0FBSSxTQUFTLE1BQUcsQ0FBQzs2QkFDbEUsQ0FBQzt5QkFDSDt3QkFDRCxrQkFBa0IsQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztxQkFDMUQ7b0JBRUcsY0FBYyxHQUFHLEtBQUssQ0FBQzs7OztvQkFFUixxQkFBTSxRQUFRLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsRUFBQTs7b0JBQXBGLElBQUksR0FBSyxDQUFBLFNBQTJFLENBQUEsS0FBaEY7b0JBQ04sZ0JBQWdCLEdBQUc7d0JBQ3ZCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7d0JBQ3pDLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUI7d0JBQ3pELGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7d0JBQzNDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUI7cUJBQ2xELENBQUM7b0JBQ0YsSUFBSSxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFO3dCQUNuRCxzQkFBTztxQkFDUjtvQkFDRCxjQUFjLEdBQUcsSUFBSSxDQUFDOzs7O29CQUV0QixJQUFJLElBQUUsQ0FBQyxJQUFJLEtBQUssc0JBQXNCLEVBQUU7d0JBQ3RDLE1BQU0sSUFBRSxDQUFDO3FCQUNWOzs7eUJBR0MsY0FBYyxFQUFkLHdCQUFjO29CQUNoQixxQkFBTSxRQUFRLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsRUFBQTs7b0JBQTlFLFNBQThFLENBQUM7Ozt5QkFHN0Usa0JBQWtCLEVBQWxCLHdCQUFrQjtvQkFDcEIscUJBQU0sUUFBUSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixDQUFDLEVBQUE7O29CQUEvRixTQUErRixDQUFDOzs7Ozs7Q0FFbkc7QUF2REQsMENBdURDIn0=