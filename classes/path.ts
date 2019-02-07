import SimpleNode from "./simple-node";

class Path {
    public nodeA: SimpleNode;
    public nodeB: SimpleNode;
    public weight: number;
    constructor (nodeA:SimpleNode, nodeB:SimpleNode, weight:number) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.weight = weight;
    }
}
export default Path;