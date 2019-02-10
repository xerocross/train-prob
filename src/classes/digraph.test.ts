// @ts-ignore
import FU from "xerocross.fu";
import Digraph from "./digraph";
import Edge from "./edge";
import Route from "./route";
import SimpleNode from "./simple-node";

// some general tests to see if digraph is working as expected.


describe ("getNodeByKey", function() {
    test("can add and get node by key, valid", function () {
        const A = new SimpleNode ("Atlanta");
        const B = new SimpleNode("Boston");
        const edge = new Edge(A, B, 10);
        const digraph = new Digraph([edge]);
        expect(digraph.getNodeByKey("Atlanta")).toBe(A);
    });
    test("can add and get node by key, invalid", function () {
        const A = new SimpleNode ("Atlanta");
        const B = new SimpleNode("Boston");
        const edge = new Edge(A, B, 10);
        const digraph = new Digraph([edge]);

        expect(function() {
            digraph.getNodeByKey("Drake");
        }).toThrow();
    });
} );


describe("getRouteCost",function() {
    test("internal distance matrix works on simple input", function () {
        const A = new SimpleNode("A");
        const B = new SimpleNode("B");
        const weight = 10;
        const edge = new Edge(A, B, weight);
        const digraph = new Digraph([edge]);
        expect(digraph.getEdgeWeight("A", "B")).toBe(10);
    });

    test("internal distance matrix works input with three s, two paths (20)", function () {
        const A = new SimpleNode("A");
        const B = new SimpleNode("B");
        const C = new SimpleNode("C");
        const edge1 = new Edge(A, B, 10);
        const edge2 = new Edge(B, C, 20);
        const digraph = new Digraph([edge1, edge2]);
        expect(digraph.getEdgeWeight("B", "C")).toBe(20);
    });
});


describe("getRouteCost",function() {
    test("getRouteCost (30)", function () {
        const A = new SimpleNode("A");
        const B = new SimpleNode("B");
        const C = new SimpleNode("C");
        const edge1 = new Edge(A, B, 10);
        const edge2 = new Edge(B, C, 20);
        const digraph = new Digraph([edge1, edge2]);
        const route = digraph.buildRoute(["A", "B", "C"]);
        expect(digraph.getRouteCost(route)).toBe(30);
    });

    test("getRouteCost (15)", function () {
        const A = new SimpleNode("A");
        const B = new SimpleNode("B");
        const C = new SimpleNode("C");
        const D = new SimpleNode("D");
        const edge1 = new Edge(A, B, 5);
        const edge2 = new Edge(B, C, 5);
        const edge3 = new Edge(C, D, 5);
        const digraph = new Digraph([edge1, edge2, edge3]);
        const route = digraph.buildRoute(["A", "B", "C", "D"]);
        expect(digraph.getRouteCost(route)).toBe(15);
    });

    test("getRouteCost invalid route throws", function () {
        const A = new SimpleNode("A");
        const B = new SimpleNode("B");
        const C = new SimpleNode("C");
        const edge1 = new Edge(A, B, 10);
        const edge2 = new Edge(B, C, 20);
        const digraph = new Digraph([edge1, edge2]);
        const route = digraph.buildRoute(["A", "C"]);
        expect(function () {
            digraph.getRouteCost(route);
        }).toThrow();
    });
});


describe("getting routes", function() {
    test("getRoutesBetween, no such route (from A to B)", function () {
        const A = new SimpleNode("A");
        const B = new SimpleNode("B");
        const C = new SimpleNode("C");
        const D = new SimpleNode("D");
        const weight = 5;
        const maxStops = 5;
        const edge1 = new Edge(A, C, weight);
        const edge2 = new Edge(B, D,  weight);
        const digraph = new Digraph([edge1, edge2]);
        const routes = digraph.getRoutesBetween("A", "B", maxStops);
        expect(routes.length).toBe(0);
    });

    test("getRoutesBetween, no such route (from A to A)", function () {
        const A = new SimpleNode("A");
        const B = new SimpleNode("B");
        const C = new SimpleNode("C");
        const weight = 5;
        const maxStops = 5;
        const edge1 = new Edge(A, C, weight);
        const digraph = new Digraph([edge1]);
        const routes = digraph.getRoutesBetween("A", "A", maxStops);
        expect(routes.length).toBe(0);
    });

    test("getRoutesBetween, no cycles (2)", function () {
        const A = new SimpleNode("A");
        const B = new SimpleNode("B");
        const C = new SimpleNode("C");
        const D = new SimpleNode("D");
        const edge1 = new Edge(A, B, 5);
        const edge2 = new Edge(B, C, 5);
        const edge3 = new Edge(A, D, 5);
        const edge4 = new Edge(D, C, 5);
        const digraph = new Digraph([edge1, edge2, edge3, edge4]);
        const maxStops = 5;
        const routes = digraph.getRoutesBetween("A", "C", maxStops);
        expect(routes.length).toBe(2);
    });
    test("getRoutesBetween, no cycles (3)", function () {
        const A = new SimpleNode("A");
        const B = new SimpleNode("B");
        const C = new SimpleNode("C");
        const D = new SimpleNode("D");
        const E = new SimpleNode("E");
        const weight = 5;
        const maxStops = 5;
        const edge1 = new Edge(A, B, weight);
        const edge2 = new Edge(B, C, weight);
        const edge3 = new Edge(A, D, weight);
        const edge4 = new Edge(D, C, weight);
        const edge5 = new Edge(A, E, weight);
        const edge6 = new Edge(E, C, weight);
        const digraph = new Digraph([edge1, edge2, edge3, edge4, edge5, edge6]);
        const routes = digraph.getRoutesBetween("A", "C", maxStops);
        expect(routes.length).toBe(3);
    });
});



// getShortestDistance
test("getShortestDistance", function () {
    const A = new SimpleNode("A");
    const B = new SimpleNode("B");
    const C = new SimpleNode("C");
    const D = new SimpleNode("D");
    const E = new SimpleNode("E");
    const edge1 = new Edge(A, B, 20);
    const edge2 = new Edge(B, C, 20);
    const edge3 = new Edge(A, D, 2);
    const edge4 = new Edge(D, C, 2);
    const edge5 = new Edge(A, E, 5);
    const edge6 = new Edge(E, C, 5);
    const digraph = new Digraph([edge1, edge2, edge3, edge4, edge5, edge6]);
    const d = digraph.getShortestDistance("A", "C");
    expect(d).toBe(4);
});
