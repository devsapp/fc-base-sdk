"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.setFcClient = function (region, credentials) {
        var AccountID = credentials.AccountID, AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret, SecurityToken = credentials.SecurityToken;
        var fcClient = new fc2_1.default(AccountID, {
            accessKeyID: AccessKeyID,
            accessKeySecret: AccessKeySecret,
            securityToken: SecurityToken,
            region: region,
            timeout: 6000000,
        });
        this.fcClient = fcClient;
        return fcClient;
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUErQjtBQUcvQjtJQUFBO0lBdUJBLENBQUM7SUFwQlEsa0JBQVcsR0FBbEIsVUFBbUIsTUFBYyxFQUFFLFdBQXlCO1FBRXhELElBQUEsU0FBUyxHQUlQLFdBQVcsVUFKSixFQUNULFdBQVcsR0FHVCxXQUFXLFlBSEYsRUFDWCxlQUFlLEdBRWIsV0FBVyxnQkFGRSxFQUNmLGFBQWEsR0FDWCxXQUFXLGNBREEsQ0FDQztRQUVoQixJQUFNLFFBQVEsR0FBRyxJQUFJLGFBQUUsQ0FBQyxTQUFTLEVBQUU7WUFDakMsV0FBVyxFQUFFLFdBQVc7WUFDeEIsZUFBZSxFQUFFLGVBQWU7WUFDaEMsYUFBYSxFQUFFLGFBQWE7WUFDNUIsTUFBTSxRQUFBO1lBQ04sT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDIn0=