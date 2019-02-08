"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleNode = /** @class */ (function () {
    function SimpleNode(name) {
        this._name = name;
    }
    SimpleNode.prototype.equals = function (other) {
        return this._name === other._name;
    };
    SimpleNode.prototype.toString = function () {
        return this._name;
    };
    SimpleNode.prototype.getName = function () {
        return this._name;
    };
    return SimpleNode;
}());
exports.default = SimpleNode;
