"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var digraph_1 = __importDefault(require("./digraph"));
var edge_1 = __importDefault(require("./edge"));
var simple_node_1 = __importDefault(require("./simple-node"));
// some general tests to see if digraph is working as expected.
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
