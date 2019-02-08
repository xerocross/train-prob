"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var xerocross_fu_1 = __importDefault(require("xerocross.fu"));
var ArrayHelper_1 = __importDefault(require("../helpers/ArrayHelper"));
var route_1 = __importDefault(require("./route"));
// A digraph is immutable.  All data must be passed in at construction.
var Digraph = /** @class */ (function () {
    function Digraph(edges) {
        this.edges = [];
        this.simpleNodes = [];
        this.edgeMatrix = [];
        this.nodeIndex = {};
        // collect all of the distinct nodes into an array
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            var nodeA = edge.nodeA;
            var nodeB = edge.nodeB;
            if (!ArrayHelper_1.default.contains(this.simpleNodes, nodeA, function (x, y) { return x.equals(y); })) {
                this.simpleNodes.push(nodeA);
                this.nodeIndex[nodeA.name] = nodeA;
            }
            if (!ArrayHelper_1.default.contains(this.simpleNodes, nodeB, function (x, y) { return x.equals(y); })) {
                this.simpleNodes.push(nodeB);
                this.nodeIndex[nodeB.name] = nodeB;
            }
        }
        // prepare a matrix to contain the weights
        var numNodes = this.simpleNodes.length;
        this.edgeMatrix = new Array(numNodes);
        // add all distinct paths and populate the edgeMatrix
        // array
        for (var i = 0; i < numNodes; i++) {
            this.edgeMatrix[i] = new Array(numNodes);
        }
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            var nodeA = edge.nodeA;
            var nodeB = edge.nodeB;
            if (!ArrayHelper_1.default.contains(this.edges, edge, function (x, y) { return x.equals(y); })) {
                this.edges.push(edge);
            }
            else {
                throw new Error("It looks like you tried to build a digraph with two edges between " + edge.nodeA.name + " and " + edge.nodeB.name + ", possibly having different weights.  This data structure does not support that.");
            }
            var nodeIndexA = ArrayHelper_1.default.indexOf(this.simpleNodes, nodeA, function (x, y) { return x.equals(y); });
            var nodeIndexB = ArrayHelper_1.default.indexOf(this.simpleNodes, nodeB, function (x, y) { return x.equals(y); });
            if (this.edgeMatrix[nodeIndexA] === undefined) {
                this.edgeMatrix[nodeIndexA] = [];
            }
            this.edgeMatrix[nodeIndexA][nodeIndexB] = edge.weight;
        }
        this._shortestPathMatrix = this.generatesShortestPathMatrix();
    }
    Digraph.prototype.getRoutesBetween = function (initNodeKey, terminalNodeKey, maxStops) {
        var nodeA = this.getNodeByKey(initNodeKey);
        var nodeB = this.getNodeByKey(terminalNodeKey);
        var totalLen = maxStops + 1;
        var routes = this.getRoutesRecursion([new route_1.default([nodeA])], totalLen);
        if (nodeA.equals(nodeB)) {
            // if nodeA == nodeB, then routes will contain a route that is just [nodeA]
            // specifications seem to require that we do not count that as a route
            // remove it
            if (routes[0].nodeArray.length === 1) { // This check is causion.  It should always be true
                routes.shift(); // remove
            }
        }
        return routes.filter(function (x) { return x.nodeArray[x.nodeArray.length - 1].equals(nodeB); });
    };
    Digraph.prototype.getRoutesMaxDistance = function (initNodeKey, terminalNodeKey, maxDist) {
        var nodeA = this.getNodeByKey(initNodeKey);
        var nodeB = this.getNodeByKey(terminalNodeKey);
        var routes = this.getRoutesRecursion([new route_1.default([nodeA])], undefined, maxDist).filter(function (x) { return x.nodeArray[x.nodeArray.length - 1].equals(nodeB); });
        if (nodeA.equals(nodeB)) {
            if (routes[0].nodeArray.length === 1) { // This check is causion.  It should always be true
                routes.shift(); // remove
            }
        }
        return routes;
    };
    Digraph.prototype.getEdgeWeight = function (initNodeKey, terminalNodeKey) {
        var nodeA = this.getNodeByKey(initNodeKey);
        var nodeB = this.getNodeByKey(terminalNodeKey);
        return this.edgeMatrix[this.getIndex(nodeA)][this.getIndex(nodeB)];
    };
    Digraph.prototype.buildRoute = function (routeKeys) {
        var nodes = [];
        for (var i = 0; i < routeKeys.length; i++) {
            nodes.push(this.getNodeByKey(routeKeys[i]));
        }
        return new route_1.default(nodes);
    };
    Digraph.prototype.getRouteDistance = function (route) {
        var nodeArray = route.nodeArray;
        var sum = 0;
        for (var i = 0; i < nodeArray.length - 1; i++) {
            var dist = this.getEdgeWeight(nodeArray[i].name, nodeArray[i + 1].name);
            if (typeof dist === "number") {
                sum += dist;
            }
            else {
                throw new Error("NO SUCH ROUTE");
            }
        }
        return sum;
    };
    Digraph.prototype.getRoutesBetweenWithStops = function (initNodeKey, terminalNodeKey, exactStops) {
        var routes = this.getRoutesBetween(initNodeKey, terminalNodeKey, exactStops);
        var actualLen = exactStops + 1;
        return routes.filter(function (x) { return x.nodeArray.length === actualLen; });
    };
    Digraph.prototype.getShortestDistance = function (initNodeKey, terminalNodeKey) {
        return this._shortestPathMatrix[this.getIndex(this.getNodeByKey(initNodeKey))][this.getIndex(this.getNodeByKey(terminalNodeKey))];
    };
    Digraph.prototype.getNodeByKey = function (key) {
        return this.nodeIndex[key];
    };
    Digraph.prototype.getAdjacentNodes = function (nodeKey) {
        var node = this.getNodeByKey(nodeKey);
        var numNodes = this.simpleNodes.length;
        var nodeIndex = ArrayHelper_1.default.indexOf(this.simpleNodes, node, function (x, y) { return x.equals(y); });
        var result = [];
        for (var i = 0; i < numNodes; i++) {
            if (nodeIndex === i) {
                // do nothing
            }
            else {
                if (typeof this.edgeMatrix[nodeIndex][i] === "number") {
                    result.push(this.simpleNodes[i]);
                }
            }
        }
        return result;
    };
    Digraph.prototype.sortestPathMatrixUpToIndex = function (index, lesserPathMatrix) {
        var numNodes = this.simpleNodes.length;
        var newPathMatrix = new Array();
        for (var i = 0; i < numNodes; i++) {
            newPathMatrix[i] = new Array();
            for (var j = 0; j < numNodes; j++) {
                newPathMatrix[i][j] = Math.min(lesserPathMatrix[i][j], lesserPathMatrix[i][index] + lesserPathMatrix[index][j]);
            }
        }
        return newPathMatrix;
    };
    Digraph.prototype.generatesShortestPathMatrix = function () {
        var weightMatrix = this.buildInitialPathMatrix();
        var numNodes = this.simpleNodes.length;
        for (var i = 0; i < numNodes; i++) {
            weightMatrix = this.sortestPathMatrixUpToIndex(i, weightMatrix);
        }
        return weightMatrix;
    };
    Digraph.prototype.buildInitialPathMatrix = function () {
        var inf = this.computeInfinity();
        var numNodes = this.simpleNodes.length;
        var newPathMatrix = new Array();
        for (var i = 0; i < numNodes; i++) {
            newPathMatrix[i] = new Array();
            for (var j = 0; j < numNodes; j++) {
                if (i === j) {
                    newPathMatrix[i][j] = inf;
                }
                else {
                    var weight = this.edgeMatrix[i][j];
                    if (weight) {
                        newPathMatrix[i][j] = this.edgeMatrix[i][j];
                    }
                    else {
                        newPathMatrix[i][j] = inf;
                    }
                }
            }
        }
        return newPathMatrix;
    };
    Digraph.prototype.getIndex = function (node) {
        return ArrayHelper_1.default.indexOf(this.simpleNodes, node, function (x, y) { return x.equals(y); });
    };
    Digraph.prototype.getRoutesRecursion = function (routes, maxLength, maxDistance) {
        var resultRoutes = xerocross_fu_1.default.array.clone(routes);
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            var routeDistance = void 0;
            if (maxLength && route.nodeArray.length >= maxLength) {
                continue;
            }
            var finalNode = route.nodeArray[route.nodeArray.length - 1];
            if (maxDistance) {
                routeDistance = this.getRouteDistance(route);
            }
            var adjacentNodes = this.getAdjacentNodes(finalNode.name);
            for (var j = 0; j < adjacentNodes.length; j++) {
                if (maxDistance && routeDistance && routeDistance + this.getEdgeWeight(finalNode.name, adjacentNodes[i].name) >= maxDistance) {
                    continue;
                }
                var newRoute = new route_1.default(xerocross_fu_1.default.array.clone(route.nodeArray));
                newRoute.nodeArray.push(adjacentNodes[j]);
                var newRoutes = this.getRoutesRecursion([newRoute], maxLength, maxDistance);
                resultRoutes = xerocross_fu_1.default.array.joinTwoArrays(resultRoutes, newRoutes);
            }
        }
        return resultRoutes;
    };
    Digraph.prototype.computeInfinity = function () {
        var inf = 0;
        for (var i = 0; i < this.edges.length; i++) {
            inf += this.edges[i].weight;
        }
        inf += 10;
        return inf;
    };
    return Digraph;
}());
exports.default = Digraph;
