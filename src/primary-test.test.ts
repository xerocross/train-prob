import Digraph from "./classes/digraph";
import Edge from "./classes/edge";
import SimpleNode from "./classes/simple-node";
const A = new SimpleNode("A");
const B = new SimpleNode("B");
const C = new SimpleNode("C");
const D = new SimpleNode("D");
const E = new SimpleNode("E");
const createGraph = function () {
    // AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7
    return new Digraph([
        new Edge(A, B, 5),
        new Edge(B, C, 4),
        new Edge(C, D, 8),
        new Edge(D, C, 8),
        new Edge(D, E, 6),
        new Edge(A, D, 5),
        new Edge(C, E, 2),
        new Edge(E, B, 3),
        new Edge(A, E, 7),
    ]);
};
const graph = createGraph();
// #1
test("The distance of the route A-B-C.", function () {
    expect(graph.getRouteDistance(graph.buildRoute(["A", "B", "C"])  ) ).toBe(9);
});
// #2
test("The distance of the route A-D.", function () {
    expect(graph.getRouteDistance(graph.buildRoute(["A", "D"]))).toBe(5);
});
// #3
test("The distance of the route A-D-C.", function () {
    expect(graph.getRouteDistance(graph.buildRoute(["A", "D", "C"])) ).toBe(13);
});
// #4
test("The distance of the route A-E-B-C-D.", function () {
    expect(graph.getRouteDistance( graph.buildRoute(["A", "E", "B", "C", "D"])) ).toBe(22);
});
// #5
test("The distance of the route A-E-D", function () {

    expect(function ()  {
        graph.getRouteDistance(graph.buildRoute(["A", "E", "D"]));
    }).toThrow();
});
// #6
test("The number of trips starting at C and ending at C with a maximum of 3 stops.", function () {
    const routes = graph.getRoutesBetween("C", "C", 3);
    expect(routes.length).toBe(2);
});
// #7
test("The number of trips starting at A and ending at C with exactly 4 stops. ", function () {
    const routes = graph.getRoutesBetweenWithStops("A", "C", 4);
    expect(routes.length).toBe(3);
});
// #8
test("The length of the shortest route (in terms of distance to travel) from A to C", function () {
    const dist = graph.getShortestDistance("A", "C");
    expect(dist).toBe(9);
});

// #9
test("The length of the shortest route (in terms of distance to travel) from B to B", function () {
    const dist = graph.getShortestDistance("B", "B");
    expect(dist).toBe(9);
});

// # 10
test("The number of different routes from C to C with a distance of less than 30", function () {
    const routes = graph.getRoutesMaxDistance("C", "C", 30);
    expect(routes.length).toBe(7);
});
