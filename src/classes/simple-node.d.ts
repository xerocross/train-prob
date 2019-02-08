declare class SimpleNode {
    private _name;
    constructor(name: string);
    equals(other: SimpleNode): boolean;
    toString(): string;
    getName(): string;
}
export default SimpleNode;
