// @ts-ignore
import FU from "xerocross.fu";
import ArrayHelper from "../helpers/ArrayHelper";
import Edge from "./edge";
import Route from "./route";
import SimpleNode from "./simple-node";

// A digraph is immutable.  All data must be passed in at construction.
class Digraph {
    private edges: Edge[];
    private simpleNodes: SimpleNode[];
    private edgeMatrix: number[][];
    private _shortestPathMatrix: number[][];
    private nodeIndex: {[key: string]: SimpleNode };

    constructor (edges: Edge[]) {
        this.edges = [];
        this.simpleNodes = [];
        this.edgeMatrix = [];
        this.nodeIndex = {};
        // collect all of the distinct nodes into an array
        for (let i = 0; i < edges.length; i++) {
            const edge = edges[i];
            const nodeA = edge.nodeA;
            const nodeB = edge.nodeB;
            if (!ArrayHelper.contains(this.simpleNodes, nodeA, (x: SimpleNode, y: SimpleNode) => x.equals(y) )) {
                this.simpleNodes.push(nodeA);
                this.nodeIndex[nodeA.getName()] = nodeA;
            }
            if (!ArrayHelper.contains(this.simpleNodes, nodeB, (x: SimpleNode, y: SimpleNode) => x.equals(y) )) {
                this.simpleNodes.push(nodeB);
                this.nodeIndex[nodeB.getName()] = nodeB;
            }
        }
        // prepare a matrix to contain the weights
        const numNodes = this.simpleNodes.length;
        this.edgeMatrix = new Array(numNodes);
        // add all distinct paths and populate the edgeMatrix
        // array
        for (let i = 0; i < numNodes; i++) {
            this.edgeMatrix[i] = new Array(numNodes);
        }
        for (let i = 0; i < edges.length; i++) {
            const edge = edges[i];
            const nodeA = edge.nodeA;
            const nodeB = edge.nodeB;
            if (!ArrayHelper.contains(this.edges, edge, (x: Edge, y: Edge) => x.equals(y))) {
                this.edges.push(edge);
            } else {
                throw new Error(`It looks like you tried to build a digraph with two edges between ${edge.nodeA.getName()} and ${edge.nodeB.getName()}, possibly having different weights.  This data structure does not support that.`);
            }
            const nodeIndexA = ArrayHelper.indexOf(this.simpleNodes, nodeA,  (x: SimpleNode, y: SimpleNode) => x.equals(y));
            const nodeIndexB = ArrayHelper.indexOf(this.simpleNodes, nodeB,  (x: SimpleNode, y: SimpleNode) => x.equals(y));
            if (this.edgeMatrix[nodeIndexA] === undefined) {
                this.edgeMatrix[nodeIndexA] = [];
            }
            this.edgeMatrix[nodeIndexA][nodeIndexB] = edge.weight;
        }
        // The following line executes Floyd's algorithm on the digraph.
        // I decided to do this upon construction, but if a developer wants
        // faster construction and lazy execution for methods, this line can be
        // moved into the method for actually getting a shortest path, and
        // then saved when the computation is done.
        this._shortestPathMatrix = this.generatesShortestPathMatrix();
    }

    public getRoutesBetween (initNodeKey: string, terminalNodeKey: string, maxStops: number): Route[] {
        const nodeA = this.getNodeByKey(initNodeKey);
        const nodeB = this.getNodeByKey(terminalNodeKey);
        const totalLen = maxStops + 1;
        const routes = this.getRoutesRecursion([new Route([nodeA])], totalLen);

        if (nodeA.equals(nodeB)) {
            // if nodeA == nodeB, then routes will contain a route that is just [nodeA]
            // specifications seem to require that we do not count that as a route
            // remove it
            if (routes[0].length() === 1) {  // This check is causion.  It should always be true
                routes.shift(); // remove
            }
        }
        return routes.filter( (x: Route) => x.getNodeArray()[x.length() - 1].equals(nodeB));
    }
    public getRoutesMaxDistance (initNodeKey: string, terminalNodeKey: string, maxDist: number): Route[] {
        const nodeA = this.getNodeByKey(initNodeKey);
        const nodeB = this.getNodeByKey(terminalNodeKey);
        const routes = this.getRoutesRecursion([new Route([nodeA])], undefined, maxDist).filter((x: Route) => x.getNodeArray()[x.length() - 1].equals(nodeB));
        if (nodeA.equals(nodeB)) {
            if (routes[0].length() === 1) {  // This check is causion.  It should always be true
                routes.shift(); // remove
            }
        }
        return routes;
    }
    public getEdgeWeight (initNodeKey: string, terminalNodeKey: string) {
        const nodeA = this.getNodeByKey(initNodeKey);
        const nodeB = this.getNodeByKey(terminalNodeKey);
        return this.edgeMatrix[this.getIndex(nodeA)][this.getIndex(nodeB)];
    }

    public buildRoute (routeKeys: string[]) {
        const nodes = [];
        for (let i = 0; i < routeKeys.length; i++) {
            nodes.push(this.getNodeByKey(routeKeys[i]));
        }
        return new Route(nodes);
    }

    public getRouteDistance (route: Route) {
        const nodeArray = route.getNodeArray();
        let sum = 0;
        for (let i = 0; i < nodeArray.length - 1; i++) {
            const dist = this.getEdgeWeight(nodeArray[i].getName(), nodeArray[i + 1].getName());
            if (typeof dist === "number") {
                sum += dist;
            } else {
                throw new Error("NO SUCH ROUTE");
            }
        }
        return sum;
    }

    public getRoutesBetweenWithStops (initNodeKey: string, terminalNodeKey: string, exactStops: number) {
        const routes = this.getRoutesBetween(initNodeKey, terminalNodeKey, exactStops);
        const actualLen = exactStops + 1;
        return routes.filter((x: Route) => x.length() === actualLen);
    }

    public getShortestDistance (initNodeKey: string, terminalNodeKey: string): number {
        return this._shortestPathMatrix[this.getIndex(this.getNodeByKey(initNodeKey))][this.getIndex(this.getNodeByKey(terminalNodeKey))];
    }

    // possibly this should be a private method, but there
    // may be some reason why a user would want to be able to
    // directly access nodes
    public getNodeByKey (key: string) {
        return this.nodeIndex[key];
    }

    public getAdjacentNodes (nodeKey: string): SimpleNode[] {
        const node = this.getNodeByKey(nodeKey);
        const numNodes = this.simpleNodes.length;
        const nodeIndex = ArrayHelper.indexOf(this.simpleNodes, node,  (x: SimpleNode, y: SimpleNode) => x.equals(y));
        const result = [];
        for (let i = 0; i < numNodes; i++) {
            if (nodeIndex === i) {
                // do nothing
            } else {
                if (typeof this.edgeMatrix[nodeIndex][i] === "number") {
                    result.push(this.simpleNodes[i]);
                }
            }
        }
        return result;
    }

    private sortestPathMatrixUpToIndex (index: number, lesserPathMatrix: number[][]): number[][] {
        const numNodes = this.simpleNodes.length;
        const newPathMatrix = new Array();

        for (let i = 0; i < numNodes; i++) {
            newPathMatrix[i] = new Array();
            for (let j = 0; j < numNodes; j++) {
                newPathMatrix[i][j] = Math.min(lesserPathMatrix[i][j], lesserPathMatrix[i][index] + lesserPathMatrix[index][j]);
            }
        }
        return newPathMatrix;
    }

    private generatesShortestPathMatrix (): number[][] {
        let weightMatrix = this.buildInitialPathMatrix();
        const numNodes = this.simpleNodes.length;
        for (let i = 0; i < numNodes; i++) {
            weightMatrix = this.sortestPathMatrixUpToIndex(i, weightMatrix);
        }
        return weightMatrix;
    }

    private buildInitialPathMatrix (): number[][] {
        const inf = this.computeInfinity();
        const numNodes = this.simpleNodes.length;
        const newPathMatrix = new Array();

        for (let i = 0; i < numNodes; i++) {
            newPathMatrix[i] = new Array();
            for (let j = 0; j < numNodes; j++) {
                if (i === j) {
                    newPathMatrix[i][j] = inf;
                } else {
                    const weight = this.edgeMatrix[i][j];
                    if (weight) {
                        newPathMatrix[i][j] =  this.edgeMatrix[i][j];
                    } else {
                        newPathMatrix[i][j] = inf;
                    }
                }
            }
        }
        return newPathMatrix;
    }

    private getIndex (node: SimpleNode) {
        return ArrayHelper.indexOf(this.simpleNodes, node,  (x: SimpleNode, y: SimpleNode) => x.equals(y));
    }

    private getRoutesRecursion (routes: Route[], maxLength: number | undefined, maxDistance?: number) {
        let resultRoutes = FU.array.clone(routes);
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            let routeDistance;

            if (maxLength && route.length() >= maxLength) {
                continue;
            }
            const finalNode = route.getNodeArray()[route.length() - 1];
            if (maxDistance) {
                routeDistance = this.getRouteDistance(route);
            }

            const adjacentNodes = this.getAdjacentNodes(finalNode.getName());
            for (let j = 0; j < adjacentNodes.length; j++) {
                if (maxDistance && routeDistance && routeDistance + this.getEdgeWeight(finalNode.getName(), adjacentNodes[i].getName()) >= maxDistance) {
                    continue;
                }
                const nodeArray = route.getNodeArray();
                nodeArray.push(adjacentNodes[j]);
                const newRoute = new Route(nodeArray);
                const newRoutes = this.getRoutesRecursion([newRoute], maxLength, maxDistance);
                resultRoutes = FU.array.joinTwoArrays(resultRoutes, newRoutes);
            }
        }
        return resultRoutes;
    }

    private computeInfinity () {
        let inf = 0;
        for (let i = 0; i < this.edges.length; i++) {
            inf += this.edges[i].weight;
        }
        inf += 10;
        return inf;
    }

}
export default Digraph;
