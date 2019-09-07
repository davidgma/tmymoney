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
var logger_1 = require("./logger");
var file_utils_1 = require("./file-utils");
var fs_1 = require("fs");
var os_1 = require("os");
var http_1 = require("http");
//import {  } from 'express';
var express_1 = __importDefault(require("express"));
var logDir = os_1.homedir + "/.local/tmymoney";
var logName = "tmymoney.log";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var logger, command, args;
        return __generator(this, function (_a) {
            logger = new logger_1.Logger(logDir, logName);
            console.log("homedir: " + os_1.homedir);
            console.log("Converting the KMyMoney file...");
            command = "./convert-xml";
            args = new Array();
            // args.push("../../../kmymoney/KMyMoney_David.xml");
            file_utils_1.FileUtils.execute(command, args).then(function (res) {
                for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                    var line = res_1[_i];
                    console.log(line);
                }
                fs_1.readFile("/dev/shm/tmymoney/test.json", 'utf8', function (err, data) {
                    //let jo = data.toJSON();
                    var jo = JSON.parse(data);
                    for (var _i = 0, _a = Object.keys(jo["KMYMONEY-FILE"]); _i < _a.length; _i++) {
                        var key = _a[_i];
                        console.log(key);
                    }
                });
            });
            return [2 /*return*/];
        });
    });
}
function servers() {
    return __awaiter(this, void 0, void 0, function () {
        var router_ssl, router_cl, _a, PORT_SSL, _b, PORT_CL, server_ssl, server_cl;
        return __generator(this, function (_c) {
            router_ssl = express_1.default();
            router_cl = express_1.default();
            _a = process.env.PORT_SSL, PORT_SSL = _a === void 0 ? 4210 : _a;
            _b = process.env.PORT_CL, PORT_CL = _b === void 0 ? 4211 : _b;
            server_ssl = http_1.createServer(router_ssl);
            server_cl = http_1.createServer(router_cl);
            router_ssl.get('/', function (req, res) {
                //console.log("here");
                res.send('Hello World via ssl!');
            });
            router_cl.get('/', function (req, res) {
                //console.log("here");
                res.send('Hello World via clear http!');
            });
            server_ssl.listen(PORT_SSL, function () {
                return console.log("SSL server is running http://localhost:" + PORT_SSL + "...");
            });
            server_cl.listen(PORT_CL, function () {
                return console.log("Clear server is running http://localhost:" + PORT_CL + "...");
            });
            return [2 /*return*/];
        });
    });
}
// main();
servers();
