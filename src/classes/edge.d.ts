import SimpleNode from "./simple-node";
declare class Edge {
    nodeA: SimpleNode;
    nodeB: SimpleNode;
    weight: number;
    constructor(nodeA: SimpleNode, nodeB: SimpleNode, weight: number);
    equals(o: Edge): boolean;
    toString(): string;
}
export default Edge;
