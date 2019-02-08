"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var digraph_1 = __importDefault(require("./digraph"));
var edge_1 = __importDefault(require("./edge"));
var simple_node_1 = __importDefault(require("./simple-node"));
// some general tests to see if digraph is working as expected.
test("can add and get node by key", function () {
    var nodeA = new simple_node_1.default("Atlanta");
    var nodeB = new simple_node_1.default("Boston");
    var path = new edge_1.default(nodeA, nodeB, 10);
    var digraph = new digraph_1.default([path]);
    expect(digraph.getNodeByKey("Atlanta")).toBe(nodeA);
});
test("internal distance matrix works on simple input", function () {
    var nodeA = new simple_node_1.default("A");
    var nodeB = new simple_node_1.default("B");
    var weight = 10;
    var path = new edge_1.default(nodeA, nodeB, weight);
    var digraph = new digraph_1.default([path]);
    expect(digraph.getEdgeWeight("A", "B")).toBe(10);
});
test("internal distance matrix works input with three nodes, two paths (20)", function () {
    var nodeA = new simple_node_1.default("A");
    var nodeB = new simple_node_1.default("B");
    var nodeC = new simple_node_1.default("C");
    var path1 = new edge_1.default(nodeA, nodeB, 10);
    var path2 = new edge_1.default(nodeB, nodeC, 20);
    var digraph = new digraph_1.default([path1, path2]);
    expect(digraph.getEdgeWeight("B", "C")).toBe(20);
});
test("getRouteDistance (30)", function () {
    var nodeA = new simple_node_1.default("A");
    var nodeB = new simple_node_1.default("B");
    var nodeC = new simple_node_1.default("C");
    var path1 = new edge_1.default(nodeA, nodeB, 10);
    var path2 = new edge_1.default(nodeB, nodeC, 20);
    var digraph = new digraph_1.default([path1, path2]);
    var route = digraph.buildRoute(["A", "B", "C"]);
    expect(digraph.getRouteDistance(route)).toBe(30);
});
test("getRouteDistance (15)", function () {
    var nodeA = new simple_node_1.default("A");
    var nodeB = new simple_node_1.default("B");
    var nodeC = new simple_node_1.default("C");
    var nodeD = new simple_node_1.default("D");
    var path1 = new edge_1.default(nodeA, nodeB, 5);
    var path2 = new edge_1.default(nodeB, nodeC, 5);
    var path3 = new edge_1.default(nodeC, nodeD, 5);
    var digraph = new digraph_1.default([path1, path2, path3]);
    var route = digraph.buildRoute(["A", "B", "C", "D"]);
    expect(digraph.getRouteDistance(route)).toBe(15);
});
test("getRouteDistance invalid route throws", function () {
    var nodeA = new simple_node_1.default("A");
    var nodeB = new simple_node_1.default("B");
    var nodeC = new simple_node_1.default("C");
    var path1 = new edge_1.default(nodeA, nodeB, 10);
    var path2 = new edge_1.default(nodeB, nodeC, 20);
    var digraph = new digraph_1.default([path1, path2]);
    var route = digraph.buildRoute(["A", "C"]);
    expect(function () {
        digraph.getRouteDistance(route);
    }).toThrow();
});
test("getRoutesBetween (2)", function () {
    var nodeA = new simple_node_1.default("A");
    var nodeB = new simple_node_1.default("B");
    var nodeC = new simple_node_1.default("C");
    var nodeD = new simple_node_1.default("D");
    var path1 = new edge_1.default(nodeA, nodeB, 5);
    var path2 = new edge_1.default(nodeB, nodeC, 5);
    var path3 = new edge_1.default(nodeA, nodeD, 5);
    var path4 = new edge_1.default(nodeD, nodeC, 5);
    var digraph = new digraph_1.default([path1, path2, path3, path4]);
    var routes = digraph.getRoutesBetween("A", "C", 5);
    expect(routes.length).toBe(2);
});
test("getRoutesBetween (3)", function () {
    var nodeA = new simple_node_1.default("A");
    var nodeB = new simple_node_1.default("B");
    var nodeC = new simple_node_1.default("C");
    var nodeD = new simple_node_1.default("D");
    var nodeE = new simple_node_1.default("E");
    var path1 = new edge_1.default(nodeA, nodeB, 5);
    var path2 = new edge_1.default(nodeB, nodeC, 5);
    var path3 = new edge_1.default(nodeA, nodeD, 5);
    var path4 = new edge_1.default(nodeD, nodeC, 5);
    var path5 = new edge_1.default(nodeA, nodeE, 5);
    var path6 = new edge_1.default(nodeE, nodeC, 5);
    var digraph = new digraph_1.default([path1, path2, path3, path4, path5, path6]);
    var routes = digraph.getRoutesBetween("A", "C", 5);
    expect(routes.length).toBe(3);
});
// getShortestDistance
test("getShortestDistance", function () {
    var nodeA = new simple_node_1.default("A");
    var nodeB = new simple_node_1.default("B");
    var nodeC = new simple_node_1.default("C");
    var nodeD = new simple_node_1.default("D");
    var nodeE = new simple_node_1.default("E");
    var path1 = new edge_1.default(nodeA, nodeB, 20);
    var path2 = new edge_1.default(nodeB, nodeC, 20);
    var path3 = new edge_1.default(nodeA, nodeD, 2);
    var path4 = new edge_1.default(nodeD, nodeC, 2);
    var path5 = new edge_1.default(nodeA, nodeE, 5);
    var path6 = new edge_1.default(nodeE, nodeC, 5);
    var digraph = new digraph_1.default([path1, path2, path3, path4, path5, path6]);
    var d = digraph.getShortestDistance("A", "C");
    expect(d).toBe(4);
});
