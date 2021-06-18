"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.fcClient = function () {
        var _a = this.credentials, AccountID = _a.AccountID, AccessKeyID = _a.AccessKeyID, AccessKeySecret = _a.AccessKeySecret, SecurityToken = _a.SecurityToken;
        return new fc2_1.default(AccountID, {
            accessKeyID: AccessKeyID,
            accessKeySecret: AccessKeySecret,
            securityToken: SecurityToken,
            region: this.region,
            timeout: 6000000,
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
                timeout: 6000000
            }
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUErQjtBQUMvQixnRUFBcUM7QUFHckM7SUFBQTtJQTBDQSxDQUFDO0lBdENRLGVBQVEsR0FBZjtRQUNRLElBQUEsS0FLRixJQUFJLENBQUMsV0FBVyxFQUpsQixTQUFTLGVBQUEsRUFDVCxXQUFXLGlCQUFBLEVBQ1gsZUFBZSxxQkFBQSxFQUNmLGFBQWEsbUJBQ0ssQ0FBQztRQUVyQixPQUFPLElBQUksYUFBRSxDQUFDLFNBQVMsRUFBRTtZQUN2QixXQUFXLEVBQUUsV0FBVztZQUN4QixlQUFlLEVBQUUsZUFBZTtZQUNoQyxhQUFhLEVBQUUsYUFBYTtZQUM1QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLG1CQUFZLEdBQW5CO1FBQ1EsSUFBQSxLQUlGLElBQUksQ0FBQyxXQUFXLEVBSGxCLFdBQVcsaUJBQUEsRUFDWCxlQUFlLHFCQUFBLEVBQ2YsYUFBYSxtQkFDSyxDQUFDO1FBQ3JCLElBQU0sUUFBUSxHQUFHLG9CQUFrQixJQUFJLENBQUMsTUFBTSxrQkFBZSxDQUFDO1FBQzlELElBQU0sVUFBVSxHQUFHLFlBQVksQ0FBQztRQUVoQyxPQUFPLElBQUksa0JBQUcsQ0FBQztZQUNiLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLGVBQWUsRUFBRSxlQUFlO1lBQ2hDLGFBQWE7WUFDYixhQUFhLEVBQUUsYUFBYTtZQUM1QixJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLE9BQU87YUFDakI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0MifQ==