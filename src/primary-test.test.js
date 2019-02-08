"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var digraph_1 = __importDefault(require("./classes/digraph"));
var edge_1 = __importDefault(require("./classes/edge"));
var simple_node_1 = __importDefault(require("./classes/simple-node"));
var A = new simple_node_1.default("A");
var B = new simple_node_1.default("B");
var C = new simple_node_1.default("C");
var D = new simple_node_1.default("D");
var E = new simple_node_1.default("E");
var createGraph = function () {
    // AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7
    return new digraph_1.default([
        new edge_1.default(A, B, 5),
        new edge_1.default(B, C, 4),
        new edge_1.default(C, D, 8),
        new edge_1.default(D, C, 8),
        new edge_1.default(D, E, 6),
        new edge_1.default(A, D, 5),
        new edge_1.default(C, E, 2),
        new edge_1.default(E, B, 3),
        new edge_1.default(A, E, 7),
    ]);
};
var graph = createGraph();
// #1
test("The distance of the route A-B-C.", function () {
    expect(graph.getRouteDistance(graph.buildRoute(["A", "B", "C"]))).toBe(9);
});
// #2
test("The distance of the route A-D.", function () {
    expect(graph.getRouteDistance(graph.buildRoute(["A", "D"]))).toBe(5);
});
// #3
test("The distance of the route A-D-C.", function () {
    expect(graph.getRouteDistance(graph.buildRoute(["A", "D", "C"]))).toBe(13);
});
// #4
test("The distance of the route A-E-B-C-D.", function () {
    expect(graph.getRouteDistance(graph.buildRoute(["A", "E", "B", "C", "D"]))).toBe(22);
});
// #5
test("The distance of the route A-E-D", function () {
    expect(graph.getRouteDistance(graph.buildRoute(["A", "E", "D"]))).toBe(undefined);
});
// #6
test("The number of trips starting at C and ending at C with a maximum of 3 stops.", function () {
    var routes = graph.getRoutesBetween("C", "C", 3);
    expect(routes.length).toBe(2);
});
// #7
test("The number of trips starting at A and ending at C with exactly 4 stops. ", function () {
    var routes = graph.getRoutesBetweenWithStops("A", "C", 4);
    expect(routes.length).toBe(3);
});
// #8
test("The length of the shortest route (in terms of distance to travel) from A to C", function () {
    var dist = graph.getShortestDistance("A", "C");
    expect(dist).toBe(9);
});
// #9
test("The length of the shortest route (in terms of distance to travel) from B to B", function () {
    var dist = graph.getShortestDistance("B", "B");
    expect(dist).toBe(9);
});
// # 10
test("The number of different routes from C to C with a distance of less than 30", function () {
    var routes = graph.getRoutesMaxDistance("C", "C", 30);
    expect(routes.length).toBe(7);
});
