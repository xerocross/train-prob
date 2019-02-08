import Digraph from "./digraph";
import Edge from "./edge";
import SimpleNode from "./simple-node";
import Route from "./route";
//@ts-ignore
import FU from "xerocross.fu";

// some general tests to see if digraph is working as expected.  

test("internal distance matrix works on simple input", function() {
    let nodeA = new SimpleNode("A");
    let nodeB = new SimpleNode("B");
    let weight = 10;
    let path = new Edge(nodeA, nodeB, weight);
    let digraph = new Digraph([path]);
    expect(digraph.getEdgeWeight("A", "B")).toBe(10);
})

test("internal distance matrix works input with three nodes, two paths (20)", function() {
    let nodeA = new SimpleNode("A");
    let nodeB = new SimpleNode("B");
    let nodeC = new SimpleNode("C");
    let path1 = new Edge(nodeA, nodeB, 10);
    let path2 = new Edge(nodeB, nodeC, 20);
    let digraph = new Digraph([path1, path2]);
    expect(digraph.getEdgeWeight("B", "C")).toBe(20);
})

// test("internal distance matrix works input with three nodes, two paths (10)", function() {
//     let nodeA = new SimpleNode("A");
//     let nodeB = new SimpleNode("B");
//     let nodeC = new SimpleNode("C");
//     let path1 = new Edge(nodeA, nodeB, 10);
//     let path2 = new Edge(nodeB, nodeC, 20);
//     let digraph = new Digraph([path1, path2]);
//     expect(digraph.getDistance(nodeA, nodeB)).toBe(10);
// })
// test("internal distance matrix works input with three nodes, two paths (undefined)", function() {
//     let nodeA = new SimpleNode("A");
//     let nodeB = new SimpleNode("B");
//     let nodeC = new SimpleNode("C");
//     let path1 = new Edge(nodeA, nodeB, 10);
//     let path2 = new Edge(nodeB, nodeC, 20);
//     let digraph = new Digraph([path1, path2]);
//     expect(digraph.getDistance(nodeC, nodeB)).toBe(undefined);
// })
// test("duplicate path throws error", function() {
//     let nodeA = new SimpleNode("A");
//     let nodeB = new SimpleNode("B");
//     let path1 = new Edge(nodeA, nodeB, 10);
//     let path2 = new Edge(nodeA, nodeB, 20);
//     expect(function() {
//         new Digraph([path1, path2]);
//     }).toThrow();
// })
// test("route distance three nodes, positive", function() {
//     let nodeA = new SimpleNode("A");
//     let nodeB = new SimpleNode("B");
//     let nodeC = new SimpleNode("C");
//     let path1 = new Edge(nodeA, nodeB, 10);
//     let path2 = new Edge(nodeB, nodeC, 20);
//     let digraph = new Digraph([path1, path2]);
//     expect(digraph.getRouteDistance([nodeA, nodeB, nodeC])).toBe(30);
// })
// test("route distance three nodes, undefined", function() {
//     let nodeA = new SimpleNode("A");
//     let nodeB = new SimpleNode("B");
//     let nodeC = new SimpleNode("C");
//     let path1 = new Edge(nodeA, nodeB, 10);
//     let path2 = new Edge(nodeB, nodeC, 20);
//     let digraph = new Digraph([path1, path2]);
//     expect(digraph.getRouteDistance([nodeA, nodeB, nodeA])).toBe(undefined);
// })
// test("get next node", function() {
//     let nodeA = new SimpleNode("A");
//     let nodeB = new SimpleNode("B");
//     let nodeC = new SimpleNode("C");
//     let nodeD = new SimpleNode("D");
//     let path1 = new Edge(nodeA, nodeB, 10);
//     let path2 = new Edge(nodeA, nodeC, 20);
//     let digraph = new Digraph([path1, path2]);
//     let nextNodes = digraph.getNextNodes(nodeA);
//     expect(nextNodes.length == 2 && nextNodes[0] == nodeB && nextNodes[1] == nodeC).toBe(true);
// })
