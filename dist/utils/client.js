"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var core = __importStar(require("@serverless-devs/core"));
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.fcClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, AccountID, AccessKeyID, AccessKeySecret, SecurityToken, endpoint;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.credentials, AccountID = _a.AccountID, AccessKeyID = _a.AccessKeyID, AccessKeySecret = _a.AccessKeySecret, SecurityToken = _a.SecurityToken;
                        return [4 /*yield*/, Client.getFcEndpoint()];
                    case 1:
                        endpoint = _b.sent();
                        return [2 /*return*/, new fc2_1.default(AccountID, {
                                accessKeyID: AccessKeyID,
                                accessKeySecret: AccessKeySecret,
                                securityToken: SecurityToken,
                                region: this.region,
                                timeout: 6000000,
                                endpoint: endpoint,
                            })];
                }
            });
        });
    };
    Client.xtraceClient = function () {
        var _a = this.credentials, AccessKeyID = _a.AccessKeyID, AccessKeySecret = _a.AccessKeySecret, SecurityToken = _a.SecurityToken;
        var endpoint = "https://xtrace." + this.region + ".aliyuncs.com";
        var apiVersion = '2019-08-08';
        return new pop_core_1.default({
            endpoint: endpoint,
            apiVersion: apiVersion,
            accessKeyId: AccessKeyID,
            accessKeySecret: AccessKeySecret,
            // @ts-ignore
            securityToken: SecurityToken,
            opts: {
                timeout: 6000000,
            },
        });
    };
    Client.getFcEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcDefault, fcEndpoint, enableFcEndpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-default')];
                    case 1:
                        fcDefault = _a.sent();
                        return [4 /*yield*/, fcDefault.get({ args: 'fc-endpoint' })];
                    case 2:
                        fcEndpoint = _a.sent();
                        if (!fcEndpoint) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, fcDefault.get({ args: 'enable-fc-endpoint' })];
                    case 3:
                        enableFcEndpoint = _a.sent();
                        return [2 /*return*/, (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBK0I7QUFDL0IsZ0VBQXFDO0FBRXJDLDBEQUE4QztBQUU5QztJQUFBO0lBbURBLENBQUM7SUEvQ2MsZUFBUSxHQUFyQjs7Ozs7O3dCQUNRLEtBS0YsSUFBSSxDQUFDLFdBQVcsRUFKbEIsU0FBUyxlQUFBLEVBQ1QsV0FBVyxpQkFBQSxFQUNYLGVBQWUscUJBQUEsRUFDZixhQUFhLG1CQUFBLENBQ007d0JBQ0oscUJBQU0sTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFBOzt3QkFBdkMsUUFBUSxHQUFHLFNBQTRCO3dCQUM3QyxzQkFBTyxJQUFJLGFBQUUsQ0FBQyxTQUFTLEVBQUU7Z0NBQ3ZCLFdBQVcsRUFBRSxXQUFXO2dDQUN4QixlQUFlLEVBQUUsZUFBZTtnQ0FDaEMsYUFBYSxFQUFFLGFBQWE7Z0NBQzVCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQ0FDbkIsT0FBTyxFQUFFLE9BQU87Z0NBQ2hCLFFBQVEsVUFBQTs2QkFDVCxDQUFDLEVBQUM7Ozs7S0FDSjtJQUVNLG1CQUFZLEdBQW5CO1FBQ1EsSUFBQSxLQUlGLElBQUksQ0FBQyxXQUFXLEVBSGxCLFdBQVcsaUJBQUEsRUFDWCxlQUFlLHFCQUFBLEVBQ2YsYUFBYSxtQkFDSyxDQUFDO1FBQ3JCLElBQU0sUUFBUSxHQUFHLG9CQUFrQixJQUFJLENBQUMsTUFBTSxrQkFBZSxDQUFDO1FBQzlELElBQU0sVUFBVSxHQUFHLFlBQVksQ0FBQztRQUVoQyxPQUFPLElBQUksa0JBQUcsQ0FBQztZQUNiLFFBQVEsVUFBQTtZQUNSLFVBQVUsWUFBQTtZQUNWLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGVBQWUsRUFBRSxlQUFlO1lBQ2hDLGFBQWE7WUFDYixhQUFhLEVBQUUsYUFBYTtZQUM1QixJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLE9BQU87YUFDakI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVksb0JBQWEsR0FBMUI7Ozs7OzRCQUNvQixxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEVBQUE7O3dCQUExRCxTQUFTLEdBQUcsU0FBOEM7d0JBQ3JDLHFCQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBQTs7d0JBQWpFLFVBQVUsR0FBVyxTQUE0Qzt3QkFDdkUsSUFBSSxDQUFDLFVBQVUsRUFBRTs0QkFBRSxzQkFBTyxTQUFTLEVBQUM7eUJBQUU7d0JBQ1IscUJBQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQUE7O3dCQUEzRSxnQkFBZ0IsR0FBUSxTQUFtRDt3QkFDakYsc0JBQU8sQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLElBQUksZ0JBQWdCLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFDOzs7O0tBQzVGO0lBQ0gsYUFBQztBQUFELENBQUMsQUFuREQsSUFtREMifQ==