"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var digraph_1 = __importDefault(require("./digraph"));
var edge_1 = __importDefault(require("./edge"));
var simple_node_1 = __importDefault(require("./simple-node"));
// some general tests to see if digraph is working as expected.
describe("getNodeByKey", function () {
    test("can add and get node by key, valid", function () {
        var A = new simple_node_1.default("Atlanta");
        var B = new simple_node_1.default("Boston");
        var edge = new edge_1.default(A, B, 10);
        var digraph = new digraph_1.default([edge]);
        expect(digraph.getNodeByKey("Atlanta")).toBe(A);
    });
    test("can add and get node by key, invalid", function () {
        var A = new simple_node_1.default("Atlanta");
        var B = new simple_node_1.default("Boston");
        var edge = new edge_1.default(A, B, 10);
        var digraph = new digraph_1.default([edge]);
        expect(function () {
            digraph.getNodeByKey("Drake");
        }).toThrow();
    });
});
describe("getRouteCost", function () {
    test("internal distance matrix works on simple input", function () {
        var A = new simple_node_1.default("A");
        var B = new simple_node_1.default("B");
        var weight = 10;
        var edge = new edge_1.default(A, B, weight);
        var digraph = new digraph_1.default([edge]);
        expect(digraph.getEdgeWeight("A", "B")).toBe(10);
    });
    test("internal distance matrix works input with three s, two paths (20)", function () {
        var A = new simple_node_1.default("A");
        var B = new simple_node_1.default("B");
        var C = new simple_node_1.default("C");
        var edge1 = new edge_1.default(A, B, 10);
        var edge2 = new edge_1.default(B, C, 20);
        var digraph = new digraph_1.default([edge1, edge2]);
        expect(digraph.getEdgeWeight("B", "C")).toBe(20);
    });
});
describe("getRouteCost", function () {
    test("getRouteCost (30)", function () {
        var A = new simple_node_1.default("A");
        var B = new simple_node_1.default("B");
        var C = new simple_node_1.default("C");
        var edge1 = new edge_1.default(A, B, 10);
        var edge2 = new edge_1.default(B, C, 20);
        var digraph = new digraph_1.default([edge1, edge2]);
        var route = digraph.buildRoute(["A", "B", "C"]);
        expect(digraph.getRouteCost(route)).toBe(30);
    });
    test("getRouteCost (15)", function () {
        var A = new simple_node_1.default("A");
        var B = new simple_node_1.default("B");
        var C = new simple_node_1.default("C");
        var D = new simple_node_1.default("D");
        var edge1 = new edge_1.default(A, B, 5);
        var edge2 = new edge_1.default(B, C, 5);
        var edge3 = new edge_1.default(C, D, 5);
        var digraph = new digraph_1.default([edge1, edge2, edge3]);
        var route = digraph.buildRoute(["A", "B", "C", "D"]);
        expect(digraph.getRouteCost(route)).toBe(15);
    });
    test("getRouteCost invalid route throws", function () {
        var A = new simple_node_1.default("A");
        var B = new simple_node_1.default("B");
        var C = new simple_node_1.default("C");
        var edge1 = new edge_1.default(A, B, 10);
        var edge2 = new edge_1.default(B, C, 20);
        var digraph = new digraph_1.default([edge1, edge2]);
        var route = digraph.buildRoute(["A", "C"]);
        expect(function () {
            digraph.getRouteCost(route);
        }).toThrow();
    });
});
describe("getting routes", function () {
    test("getRoutesBetween, no such route (from A to B)", function () {
        var A = new simple_node_1.default("A");
        var B = new simple_node_1.default("B");
        var C = new simple_node_1.default("C");
        var D = new simple_node_1.default("D");
        var weight = 5;
        var maxStops = 5;
        var edge1 = new edge_1.default(A, C, weight);
        var edge2 = new edge_1.default(B, D, weight);
        var digraph = new digraph_1.default([edge1, edge2]);
        var routes = digraph.getRoutesBetween("A", "B", maxStops);
        expect(routes.length).toBe(0);
    });
    test("getRoutesBetween, no such route (from A to A)", function () {
        var A = new simple_node_1.default("A");
        var B = new simple_node_1.default("B");
        var C = new simple_node_1.default("C");
        var weight = 5;
        var maxStops = 5;
        var edge1 = new edge_1.default(A, C, weight);
        var digraph = new digraph_1.default([edge1]);
        var routes = digraph.getRoutesBetween("A", "A", maxStops);
        expect(routes.length).toBe(0);
    });
    test("getRoutesBetween, no cycles (2)", function () {
        var A = new simple_node_1.default("A");
        var B = new simple_node_1.default("B");
        var C = new simple_node_1.default("C");
        var D = new simple_node_1.default("D");
        var edge1 = new edge_1.default(A, B, 5);
        var edge2 = new edge_1.default(B, C, 5);
        var edge3 = new edge_1.default(A, D, 5);
        var edge4 = new edge_1.default(D, C, 5);
        var digraph = new digraph_1.default([edge1, edge2, edge3, edge4]);
        var maxStops = 5;
        var routes = digraph.getRoutesBetween("A", "C", maxStops);
        expect(routes.length).toBe(2);
    });
    test("getRoutesBetween, no cycles (3)", function () {
        var A = new simple_node_1.default("A");
        var B = new simple_node_1.default("B");
        var C = new simple_node_1.default("C");
        var D = new simple_node_1.default("D");
        var E = new simple_node_1.default("E");
        var weight = 5;
        var maxStops = 5;
        var edge1 = new edge_1.default(A, B, weight);
        var edge2 = new edge_1.default(B, C, weight);
        var edge3 = new edge_1.default(A, D, weight);
        var edge4 = new edge_1.default(D, C, weight);
        var edge5 = new edge_1.default(A, E, weight);
        var edge6 = new edge_1.default(E, C, weight);
        var digraph = new digraph_1.default([edge1, edge2, edge3, edge4, edge5, edge6]);
        var routes = digraph.getRoutesBetween("A", "C", maxStops);
        expect(routes.length).toBe(3);
    });
});
// getShortestDistance
test("getShortestDistance", function () {
    var A = new simple_node_1.default("A");
    var B = new simple_node_1.default("B");
    var C = new simple_node_1.default("C");
    var D = new simple_node_1.default("D");
    var E = new simple_node_1.default("E");
    var edge1 = new edge_1.default(A, B, 20);
    var edge2 = new edge_1.default(B, C, 20);
    var edge3 = new edge_1.default(A, D, 2);
    var edge4 = new edge_1.default(D, C, 2);
    var edge5 = new edge_1.default(A, E, 5);
    var edge6 = new edge_1.default(E, C, 5);
    var digraph = new digraph_1.default([edge1, edge2, edge3, edge4, edge5, edge6]);
    var d = digraph.getShortestDistance("A", "C");
    expect(d).toBe(4);
});
