# train-prob

So far this is a node project without any nice interface.  You can interact with 
it directly at the node console.  The source files are written in typescript except
graph-builder.js, which I wrote directly for use at a node console.

Once you have downloaded the source files, run ```npm install``` to pull all the 
dependencies.

For testing purposes, this package includes an example digraph in JSON format 
located at ```./my-graph.json```.

After installing, a standard battery of tests can be run
by executing ```npm test```.

There is a node module GraphBuilder at ```./graph-builder.js``` that you can use 
at the node command line to build a digraph from a properly formatted json file.
For example

```
node
> let graphBuilder = require("./graph-builder");
> let graph = graphBuilder.build("./my-graph.json");
```

For now, the GraphBuilder.build method is quite fragile.  It will only work at all
if the JSON file is formatted exactly, exactly correctly.  From the 
example, now from the ```graph``` object you have access to various methods in the 
public Digraph interface.  For example:

```
>  graph.getRouteDistance(graph.buildRoute(["A", "B"]))
// returns 5;
```

The public interface is as follows:

```
    constructor(edges: Edge[]);
    getRoutesBetween(initNodeKey: string, terminalNodeKey: string, maxStops: number): Route[];
    getRoutesMaxDistance(initNodeKey: string, terminalNodeKey: string, maxDist: number): Route[];
    getEdgeWeight(initNodeKey: string, terminalNodeKey: string): number;
    buildRoute(routeKeys: string[]): Route;
    getRouteDistance(route: Route): number;
    getRoutesBetweenWithStops(initNodeKey: string, terminalNodeKey: string, exactStops: number): Route[];
    getShortestDistance(initNodeKey: string, terminalNodeKey: string): number;
    getNodeByKey(key: string): SimpleNode;
    getAdjacentNodes(nodeKey: string): SimpleNode[];
```

Some of the behavior is rather strange by my own opinion.  For example, if there is 
not some explicit path from "A" to "A" then the route ["A","A"] is invalid.  This was done 
according with constraints I was given.