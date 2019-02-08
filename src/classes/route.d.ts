import SimpleNode from "./simple-node";
declare class Route {
    nodeArray: SimpleNode[];
    isTerminal: boolean | undefined;
    constructor(nodeArray: SimpleNode[]);
    contains(node: SimpleNode): boolean;
    toString(): string;
}
export default Route;
