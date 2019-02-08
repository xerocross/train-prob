import SimpleNode from "./simple-node";
import ArrayHelper from "../helpers/ArrayHelper";;
class Route {
    public nodeArray: SimpleNode[];
    public isTerminal: boolean | undefined;
    constructor(nodeArray: SimpleNode[]) {
        this.nodeArray = nodeArray;
    }

    contains (node: SimpleNode) {
        return ArrayHelper.contains(this.nodeArray, node, (x,y)=> x.equals(y) ) ;
    }
    toString () {
        let str = "[";
        let i;
        for (i = 0; i < this.nodeArray.length - 1; i++) {
            str+= this.nodeArray[i].toString() + ", ";
        }
        str+= this.nodeArray[i].toString() + "]";
        return str;
    }
}
export default Route;