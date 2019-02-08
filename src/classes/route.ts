import ArrayHelper from "../helpers/ArrayHelper";
import SimpleNode from "./simple-node";
class Route {
    private _nodeArray: SimpleNode[];
    constructor (nodeArray: SimpleNode[]) {
        this._nodeArray = nodeArray;
    }

    public contains (node: SimpleNode) {
        return ArrayHelper.contains(this._nodeArray, node, (x, y) => x.equals(y) ) ;
    }
    public toString () {
        let str = "[";
        let i;
        for (i = 0; i < this._nodeArray.length - 1; i++) {
            str += this._nodeArray[i].toString() + ", ";
        }
        str += this._nodeArray[i].toString() + "]";
        return str;
    }
    public getNodeArray (): SimpleNode[] {
        // you may have a copy of the array of nodes, but you may not directly
        // access the internal data
        return ArrayHelper.shallowClone(this._nodeArray);
    }
    public length () {
        return this._nodeArray.length;
    }
}
export default Route;
