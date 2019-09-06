"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var file_utils_1 = require("./file-utils");
var fs_1 = require("fs");
var Logger = /** @class */ (function () {
    function Logger(logDir, logName) {
        var _this = this;
        this.logDir = logDir;
        this.logName = logName;
        this.ready = new Promise(function (resolve) {
            _this._setUp().then(function () {
                resolve();
            });
        });
    }
    Logger.prototype._setUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file_utils_1.FileUtils.isDirectory(this.logDir)];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        console.log("creating log directory...");
                        return [4 /*yield*/, fs_1.mkdir(this.logDir, { recursive: true }, function (err) {
                                if (err)
                                    console.log("Error creating directory " + _this.logDir);
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Logger.prototype._dateStamp = function () {
        var date = new Date(Date.now());
        var year = date.getFullYear().toFixed();
        var month = (date.getMonth() + 1).toFixed();
        if (month.length == 1)
            month = "0" + month;
        return year + month;
    };
    Logger.prototype._timeStamp = function () {
        var date = new Date(Date.now());
        var year = date.getFullYear().toFixed();
        var month = (date.getMonth() + 1).toFixed();
        if (month.length == 1)
            month = "0" + month;
        var day = date.getDate().toFixed();
        if (day.length == 1)
            day = "0" + day;
        var hour = date.getHours().toFixed();
        if (hour.length == 1)
            hour = "0" + hour;
        var minute = date.getMinutes().toFixed();
        if (minute.length == 1)
            minute = "0" + minute;
        return year + month + day + " " + hour + ":" + minute;
    };
    Logger.prototype.log = function (line) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs_1.appendFile(this.logDir + "/" + this._dateStamp() + " " + this.logName, this._timeStamp() + ": " + line + "\n", function (err) {
                                if (err) {
                                    console.log("Error trying to write to log file '"
                                        + _this.logDir + _this.logName + ": " + err.message);
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Logger;
}()); // End of Logger class
exports.Logger = Logger;
