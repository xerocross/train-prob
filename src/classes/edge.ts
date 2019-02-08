import SimpleNode from "./simple-node";

class Edge {
    public nodeA: SimpleNode;
    public nodeB: SimpleNode;
    public weight: number;
    constructor (nodeA: SimpleNode, nodeB: SimpleNode, weight: number) {
        if (weight < 0) {
            throw new Error(`You tried to make a path with a negative weight/distance.
            This data structure does not allow that.`);
        }
        if (nodeA.equals(nodeB)) {
            throw new Error(`You tried to make a path with the same node at both beginning and end.
            This data structure does not allow that.`);
        }
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.weight = weight;
    }
    public equals (o: Edge) {
        return (this.nodeA.equals(o.nodeA) && this.nodeB.equals(o.nodeB));
    }
    public toString () {
        return `[${this.nodeA.toString()}, ${this.nodeB.toString()}, ${this.weight}]`;
    }
}
export default Edge;
