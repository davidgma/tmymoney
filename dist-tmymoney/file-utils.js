"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var FileUtils = /** @class */ (function () {
    function FileUtils() {
    }
    FileUtils.isFile = function (path) {
        if (path == null) {
            return new Promise(function (resolve, reject) {
                console.log("Error: null path sent to isFile.");
                resolve(false);
            });
        }
        return new Promise(function (resolve, reject) {
            fs_1.stat(path, function (err, stats) {
                if (err) {
                    resolve(false);
                }
                else if (stats.isFile()) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    FileUtils.isDirectory = function (path) {
        return new Promise(function (resolve, reject) {
            fs_1.stat(path, function (err, stats) {
                if (err) {
                    resolve(false);
                }
                else if (stats.isDirectory()) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    FileUtils.execute = function (command, args) {
        var ret = new Array();
        return new Promise(function (resolve, reject) {
            var process = child_process_1.spawn(command, args);
            process.on('error', function (err) {
                console.log("error: " + err.message);
            });
            if (process.stdout != null) {
                process.stdout.on('data', function (data) {
                    console.log(data.toString());
                    ret.push(data.toString());
                });
            }
            else
                console.log("Error: process.stdout is null");
            if (process.stderr != null) {
                process.stderr.on('data', function (data) {
                    console.log(data.toString());
                    ret.push(data.toString());
                });
            }
            process.on('close', function (code) {
                resolve(ret);
            });
        });
    };
    return FileUtils;
}()); // End of FileUtils class
exports.FileUtils = FileUtils;
