import SimpleNode from "./simple-node";

class Edge {
    private _nodeA: SimpleNode;
    private _nodeB: SimpleNode;
    private _weight: number;
    constructor (nodeA: SimpleNode, nodeB: SimpleNode, weight: number) {
        if (weight < 0) {
            throw new Error(`You tried to make a path with a negative weight/distance.
            This data structure does not allow that.`);
        }
        if (nodeA.equals(nodeB)) {
            throw new Error(`You tried to make a path with the same node at both beginning and end.
            This data structure does not allow that.`);
        }
        this._nodeA = nodeA;
        this._nodeB = nodeB;
        this._weight = weight;
    }
    public getNodeA () {
        return this._nodeA;
    }
    public getNodeB () {
        return this._nodeB;
    }
    public weight () {
        return this._weight;
    }
    public equals (o: Edge) {
        return (this._nodeA.equals(o._nodeA) && this._nodeB.equals(o._nodeB));
    }
    public toString () {
        return `[${this._nodeA.toString()}, ${this._nodeB.toString()}, ${this._weight}]`;
    }
}
export default Edge;
