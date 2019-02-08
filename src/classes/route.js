"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayHelper_1 = __importDefault(require("../helpers/ArrayHelper"));
;
var Route = /** @class */ (function () {
    function Route(nodeArray) {
        this.nodeArray = nodeArray;
    }
    Route.prototype.contains = function (node) {
        return ArrayHelper_1.default.contains(this.nodeArray, node, function (x, y) { return x.equals(y); });
    };
    Route.prototype.toString = function () {
        var str = "[";
        var i;
        for (i = 0; i < this.nodeArray.length - 1; i++) {
            str += this.nodeArray[i].toString() + ", ";
        }
        str += this.nodeArray[i].toString() + "]";
        return str;
    };
    return Route;
}());
exports.default = Route;
