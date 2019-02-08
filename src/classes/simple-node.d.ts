declare class SimpleNode {
    name: string;
    constructor(name: string);
    equals(other: SimpleNode): boolean;
    toString(): string;
}
export default SimpleNode;
