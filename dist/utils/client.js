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
        var AccountID = credentials.AccountID, AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret;
        var fcClient = new fc2_1.default(AccountID, {
            accessKeyID: AccessKeyID,
            accessKeySecret: AccessKeySecret,
            region: region,
            timeout: 6000000,
        });
        this.fcClient = fcClient;
        return fcClient;
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUErQjtBQUcvQjtJQUFBO0lBcUJBLENBQUM7SUFsQlEsa0JBQVcsR0FBbEIsVUFBbUIsTUFBYyxFQUFFLFdBQXlCO1FBRXhELElBQUEsU0FBUyxHQUdQLFdBQVcsVUFISixFQUNULFdBQVcsR0FFVCxXQUFXLFlBRkYsRUFDWCxlQUFlLEdBQ2IsV0FBVyxnQkFERSxDQUNEO1FBRWhCLElBQU0sUUFBUSxHQUFHLElBQUksYUFBRSxDQUFDLFNBQVMsRUFBRTtZQUNqQyxXQUFXLEVBQUUsV0FBVztZQUN4QixlQUFlLEVBQUUsZUFBZTtZQUNoQyxNQUFNLFFBQUE7WUFDTixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUV6QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUFyQkQsSUFxQkMifQ==