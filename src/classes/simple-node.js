"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleNode = /** @class */ (function () {
    function SimpleNode(name) {
        this.name = name;
    }
    SimpleNode.prototype.equals = function (other) {
        return this.name == other.name;
    };
    SimpleNode.prototype.toString = function () {
        return this.name;
    };
    return SimpleNode;
}());
exports.default = SimpleNode;
