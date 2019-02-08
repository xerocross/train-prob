import Edge from "./edge";
import Route from "./route";
import SimpleNode from "./simple-node";
declare class Digraph {
    private edges;
    private simpleNodes;
    private edgeMatrix;
    private _shortestPathMatrix;
    private nodeIndex;
    constructor(edges: Edge[]);
    getRoutesBetween(initNodeKey: string, terminalNodeKey: string, maxStops: number): Route[];
    getRoutesMaxDistance(initNodeKey: string, terminalNodeKey: string, maxDist: number): Route[];
    getEdgeWeight(initNodeKey: string, terminalNodeKey: string): number;
    buildRoute(routeKeys: string[]): Route;
    getRouteDistance(route: Route): number;
    getRoutesBetweenWithStops(initNodeKey: string, terminalNodeKey: string, exactStops: number): Route[];
    getShortestDistance(initNodeKey: string, terminalNodeKey: string): number;
    getNodeByKey(key: string): SimpleNode;
    getAdjacentNodes(nodeKey: string): SimpleNode[];
    private sortestPathMatrixUpToIndex;
    private generatesShortestPathMatrix;
    private buildInitialPathMatrix;
    private getIndex;
    private getRoutesRecursion;
    private computeInfinity;
}
export default Digraph;
