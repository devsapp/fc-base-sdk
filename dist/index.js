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
var client_1 = __importDefault(require("./utils/client"));
var lodash_1 = __importDefault(require("lodash"));
var deploy_1 = __importDefault(require("./command/deploy"));
var remove_1 = __importDefault(require("./command/remove"));
var static_1 = require("./static");
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.initInputs = function (inputs, command) {
        return __awaiter(this, void 0, void 0, function () {
            var region, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        region = inputs.props.region;
                        if (!!inputs.credentials) return [3 /*break*/, 2];
                        _a = inputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _a.credentials = _b.sent();
                        _b.label = 2;
                    case 2:
                        core_1.reportComponent('FC-BASE-SDK', {
                            command: command,
                            uid: inputs.credentials.AccountID,
                        });
                        client_1.default.credentials = inputs.credentials;
                        client_1.default.region = region;
                        this.logger.debug(JSON.stringify(lodash_1.default.pick(inputs, ['props', 'appName', 'project', 'args']), null, '  '));
                        return [2 /*return*/, inputs];
                }
            });
        });
    };
    Component.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var newInputs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initInputs(lodash_1.default.cloneDeep(inputs), 'deploy')];
                    case 1:
                        newInputs = _a.sent();
                        return [4 /*yield*/, deploy_1.default.deploy(newInputs.props)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Component.prototype.remove = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, args, props, apts, parsedArgs, nonOptionsArgs, _d, force, triggerName, silent, command, supportCommand, remove;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.initInputs(lodash_1.default.cloneDeep(inputs), 'remove')];
                    case 1:
                        _b = _e.sent(), _c = _b.args, args = _c === void 0 ? '' : _c, props = _b.props;
                        apts = {
                            boolean: ['help', 'y', 'only-local'],
                            string: ['trigger-name'],
                            alias: { help: 'h', triggerName: 'trigger-name', 'assume-yes': 'y' },
                        };
                        parsedArgs = core_1.commandParse({ args: args }, apts);
                        nonOptionsArgs = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._) || [];
                        _d = parsedArgs.data || {}, force = _d.y, triggerName = _d.triggerName, silent = _d["only-local"];
                        if (nonOptionsArgs.length > 1) {
                            this.logger.error(' error: expects argument.');
                            return [2 /*return*/, core_1.help(static_1.REMOVE_HELP_INFO)];
                        }
                        command = nonOptionsArgs[0] || 'service';
                        supportCommand = ['service', 'function', 'trigger'];
                        if (!supportCommand.includes(command)) {
                            this.logger.error(" remove " + command + " is not supported now.");
                            return [2 /*return*/, core_1.help(static_1.REMOVE_HELP_INFO)];
                        }
                        remove = new remove_1.default(props.region);
                        return [4 /*yield*/, remove[command](props, { force: force, triggerName: triggerName, silent: silent })];
                    case 2:
                        _e.sent();
                        return [2 /*return*/, remove.removeNameList];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNkc7QUFFN0csMERBQW9DO0FBQ3BDLGtEQUF1QjtBQUN2Qiw0REFBc0M7QUFDdEMsNERBQXNDO0FBQ3RDLG1DQUE0QztBQUU1QztJQUFBO0lBNkRBLENBQUM7SUExRE8sOEJBQVUsR0FBaEIsVUFBaUIsTUFBa0IsRUFBRSxPQUFlOzs7Ozs7d0JBQzFDLE1BQU0sR0FBSyxNQUFNLENBQUMsS0FBSyxPQUFqQixDQUFrQjs2QkFDNUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFuQix3QkFBbUI7d0JBQ3JCLEtBQUEsTUFBTSxDQUFBO3dCQUFlLHFCQUFNLG9CQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQS9ELEdBQU8sV0FBVyxHQUFHLFNBQTBDLENBQUM7Ozt3QkFHbEUsc0JBQWUsQ0FBQyxhQUFhLEVBQUU7NEJBQzdCLE9BQU8sU0FBQTs0QkFDUCxHQUFHLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTO3lCQUNsQyxDQUFDLENBQUM7d0JBRUgsZ0JBQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQzt3QkFDeEMsZ0JBQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO3dCQUV2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3ZHLHNCQUFPLE1BQU0sRUFBQzs7OztLQUNmO0lBRUssMEJBQU0sR0FB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