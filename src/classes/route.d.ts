import SimpleNode from "./simple-node";
declare class Route {
    private _nodeArray;
    constructor(nodeArray: SimpleNode[]);
    contains(node: SimpleNode): boolean;
    toString(): string;
    getNodeArray(): SimpleNode[];
    length(): number;
}
export default Route;
