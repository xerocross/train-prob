class SimpleNode {
    private _name: string;
    constructor (name: string) {
        this._name = name;
    }
    public equals (other: SimpleNode) {
        return this._name === other._name;
    }
    public toString () {
        return this._name;
    }
    public getName () {
        return this._name;
    }
}
export default SimpleNode;
