// @ts-ignore
import FU from "xerocross.fu";
import Digraph from "./digraph";
import Edge from "./edge";
import Route from "./route";
import SimpleNode from "./simple-node";

// some general tests to see if digraph is working as expected.

test("can add and get node by key", function () {
    const nodeA = new SimpleNode ("Atlanta");
    const nodeB = new SimpleNode("Boston");
    const path = new Edge(nodeA, nodeB, 10);
    const digraph = new Digraph([path]);
    expect(digraph.getNodeByKey("Atlanta")).toBe(nodeA);
});

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

test("getRouteDistance (30)", function () {
    const nodeA = new SimpleNode("A");
    const nodeB = new SimpleNode("B");
    const nodeC = new SimpleNode("C");
    const path1 = new Edge(nodeA, nodeB, 10);
    const path2 = new Edge(nodeB, nodeC, 20);
    const digraph = new Digraph([path1, path2]);
    const route = digraph.buildRoute(["A", "B", "C"]);
    expect(digraph.getRouteDistance(route)).toBe(30);
});

test("getRouteDistance (15)", function () {
    const nodeA = new SimpleNode("A");
    const nodeB = new SimpleNode("B");
    const nodeC = new SimpleNode("C");
    const nodeD = new SimpleNode("D");
    const path1 = new Edge(nodeA, nodeB, 5);
    const path2 = new Edge(nodeB, nodeC, 5);
    const path3 = new Edge(nodeC, nodeD, 5);
    const digraph = new Digraph([path1, path2, path3]);
    const route = digraph.buildRoute(["A", "B", "C", "D"]);
    expect(digraph.getRouteDistance(route)).toBe(15);
});

test("getRouteDistance invalid route throws", function () {
    const nodeA = new SimpleNode("A");
    const nodeB = new SimpleNode("B");
    const nodeC = new SimpleNode("C");
    const path1 = new Edge(nodeA, nodeB, 10);
    const path2 = new Edge(nodeB, nodeC, 20);
    const digraph = new Digraph([path1, path2]);
    const route = digraph.buildRoute(["A", "C"]);
    expect(function () {
        digraph.getRouteDistance(route);
    }).toThrow();
});

test("getRoutesBetween (2)", function () {
    const nodeA = new SimpleNode("A");
    const nodeB = new SimpleNode("B");
    const nodeC = new SimpleNode("C");
    const nodeD = new SimpleNode("D");
    const path1 = new Edge(nodeA, nodeB, 5);
    const path2 = new Edge(nodeB, nodeC, 5);
    const path3 = new Edge(nodeA, nodeD, 5);
    const path4 = new Edge(nodeD, nodeC, 5);
    const digraph = new Digraph([path1, path2, path3, path4]);
    const routes = digraph.getRoutesBetween("A", "C", 5);
    expect(routes.length).toBe(2);
});

test("getRoutesBetween (3)", function () {
    const nodeA = new SimpleNode("A");
    const nodeB = new SimpleNode("B");
    const nodeC = new SimpleNode("C");
    const nodeD = new SimpleNode("D");
    const nodeE = new SimpleNode("E");
    const path1 = new Edge(nodeA, nodeB, 5);
    const path2 = new Edge(nodeB, nodeC, 5);
    const path3 = new Edge(nodeA, nodeD, 5);
    const path4 = new Edge(nodeD, nodeC, 5);
    const path5 = new Edge(nodeA, nodeE, 5);
    const path6 = new Edge(nodeE, nodeC, 5);
    const digraph = new Digraph([path1, path2, path3, path4, path5, path6]);
    const routes = digraph.getRoutesBetween("A", "C", 5);
    expect(routes.length).toBe(3);
});

// getShortestDistance
test("getShortestDistance", function () {
    const nodeA = new SimpleNode("A");
    const nodeB = new SimpleNode("B");
    const nodeC = new SimpleNode("C");
    const nodeD = new SimpleNode("D");
    const nodeE = new SimpleNode("E");
    const path1 = new Edge(nodeA, nodeB, 20);
    const path2 = new Edge(nodeB, nodeC, 20);
    const path3 = new Edge(nodeA, nodeD, 2);
    const path4 = new Edge(nodeD, nodeC, 2);
    const path5 = new Edge(nodeA, nodeE, 5);
    const path6 = new Edge(nodeE, nodeC, 5);
    const digraph = new Digraph([path1, path2, path3, path4, path5, path6]);
    const d = digraph.getShortestDistance("A", "C");
    expect(d).toBe(4);
});
