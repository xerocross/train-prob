// @ts-ignore
import FU from "xerocross.fu";
import Digraph from "./digraph";
import Edge from "./edge";
import Route from "./route";
import SimpleNode from "./simple-node";

// some general tests to see if digraph is working as expected.

test("internal distance matrix works on simple input", function () {
    const nodeA = new SimpleNode("A");
    const nodeB = new SimpleNode("B");
    const weight = 10;
    const path = new Edge(nodeA, nodeB, weight);
    const digraph = new Digraph([path]);
    expect(digraph.getEdgeWeight("A", "B")).toBe(10);
});

test("internal distance matrix works input with three nodes, two paths (20)", function () {
    const nodeA = new SimpleNode("A");
    const nodeB = new SimpleNode("B");
    const nodeC = new SimpleNode("C");
    const path1 = new Edge(nodeA, nodeB, 10);
    const path2 = new Edge(nodeB, nodeC, 20);
    const digraph = new Digraph([path1, path2]);
    expect(digraph.getEdgeWeight("B", "C")).toBe(20);
});
