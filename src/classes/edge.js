"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Edge = /** @class */ (function () {
    function Edge(nodeA, nodeB, weight) {
        if (weight < 0) {
            throw new Error("You tried to make a path with a negative weight/distance.\n            This data structure does not allow that.");
        }
        if (nodeA.equals(nodeB)) {
            throw new Error("You tried to make a path with the same node at both beginning and end.\n            This data structure does not allow that.");
        }
        this._nodeA = nodeA;
        this._nodeB = nodeB;
        this._weight = weight;
    }
    Edge.prototype.getNodeA = function () {
        return this._nodeA;
    };
    Edge.prototype.getNodeB = function () {
        return this._nodeB;
    };
    Edge.prototype.weight = function () {
        return this._weight;
    };
    Edge.prototype.equals = function (o) {
        return (this._nodeA.equals(o._nodeA) && this._nodeB.equals(o._nodeB));
    };
    Edge.prototype.toString = function () {
        return "[" + this._nodeA.toString() + ", " + this._nodeB.toString() + ", " + this._weight + "]";
    };
    return Edge;
}());
exports.default = Edge;
