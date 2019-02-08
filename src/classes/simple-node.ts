class SimpleNode {
    public name: string;
    constructor (name: string) {
        this.name = name;
    }
    public equals (other: SimpleNode) {
        return this.name === other.name;
    }
    public toString () {
        return this.name;
    }
}
export default SimpleNode;
