const FS = require("fs");
const path = require("path");
const SimpleNode = require("./src/classes/simple-node").default;
const Edge = require("./src/classes/edge").default;
const Digraph = require("./src/classes/digraph").default;

module.exports.build = function (pathString) {
    let resolvedPath = path.resolve(pathString);
    var contents = fs.readFileSync(resolvedPath, 'utf8');
    let data;
    try {
        data = JSON.parse(contents);
        let nodes = {};
        for (let i = 0; i < data.nodes.length; i++) {
            nodes[data.nodes[i]] = new SimpleNode(data.nodes[i]);
        }
        let edges = data.edges;
        let edgeObjects = [];
        for (let i = 0; i < edges.length; i++) {
            let newEdge = new Edge(nodes[edges[i].initNode] , nodes[edges[i].terminalNode], edges[i].weight);
            edgeObjects.push(newEdge);
            console.log(newEdge.toString());
        }
        return new Digraph(edgeObjects);


    } catch(e) {
        console.log(e);
        throw new Error("invalid data file")
    }
    
    
}
