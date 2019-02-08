"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayHelper_1 = __importDefault(require("../helpers/ArrayHelper"));
var Route = /** @class */ (function () {
    function Route(nodeArray) {
        this._nodeArray = nodeArray;
    }
    Route.prototype.contains = function (node) {
        return ArrayHelper_1.default.contains(this._nodeArray, node, function (x, y) { return x.equals(y); });
    };
    Route.prototype.toString = function () {
        var str = "[";
        var i;
        for (i = 0; i < this._nodeArray.length - 1; i++) {
            str += this._nodeArray[i].toString() + ", ";
        }
        str += this._nodeArray[i].toString() + "]";
        return str;
    };
    Route.prototype.getNodeArray = function () {
        // you may have a copy of the array of nodes, but you may not directly
        // access the internal data
        return ArrayHelper_1.default.shallowClone(this._nodeArray);
    };
    Route.prototype.length = function () {
        return this._nodeArray.length;
    };
    return Route;
}());
exports.default = Route;
