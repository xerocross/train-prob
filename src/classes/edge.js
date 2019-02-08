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
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.weight = weight;
    }
    Edge.prototype.equals = function (o) {
        return (this.nodeA.equals(o.nodeA) && this.nodeB.equals(o.nodeB));
    };
    Edge.prototype.toString = function () {
        return "[" + this.nodeA.toString() + ", " + this.nodeB.toString() + ", " + this.weight + "]";
    };
    return Edge;
}());
exports.default = Edge;
