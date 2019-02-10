import SimpleNode from "./simple-node";
declare class Edge {
    private _nodeA;
    private _nodeB;
    private _weight;
    constructor(nodeA: SimpleNode, nodeB: SimpleNode, weight: number);
    getNodeA(): SimpleNode;
    getNodeB(): SimpleNode;
    weight(): number;
    equals(o: Edge): boolean;
    toString(): string;
}
export default Edge;
