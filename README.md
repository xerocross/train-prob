# train-prob

I built this for a hiring manager.  There is a note specifically to him below.

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

## Note to Hiring Manager

Most of the logic here is in ```./src/classes/digraph.ts```.  The battery of tests you wanted 
run is contained in a file called ```./src/primary-test.test.ts```.  There are other test files 
also, and if you run ```npm test``` at the command line, it will execute all tests.

Since this was a test of my abilities, I made a decision to write things from scratch instead 
of using any libraries of relevant data structures or algorithms.  I'm well aware that is 
not the smartest approach for production programming.

There is never a point when I think: "ah, this project is perfect and done".  But I have 
submitted this GitHub repo to my recruiter for your review.  I don't know when you will look at it, but
I will probably add more testing over the weekend and do some cleanup.

At current state, it appears functional.  All the tests pass.  To finish this project to my own
standard, I would have preferred to have at least 3 days.  Day one for writing the bulk of the code.  Day two for writing a _lot_ more unit tests and cleaning up any bugs I discovered that way.  Day three because everything always takes longer than expected.  But I did rush this because I don't want you to pass me 
over for taking too long.

## Usage

A Digraph must be constructed with a list of Edge objects.  An Edge object 
must be constructed with an initial SimpleNode a terminal SimpleNode, and a weight.
Weight can represent anything---literal distance, monetary cost, time duration, etc.
Some of the methods have been named to suggest that weight means distance.  That is
something I may deprecate in the future in favor of a more generic word.

Here is a simple usage example:
```
    import Digraph from "./digraph";
    import Edge from "./edge";
    import Route from "./route";
    import SimpleNode from "./simple-node";
    const nodeA = new SimpleNode("A");
    const nodeB = new SimpleNode("B");
    const nodeC = new SimpleNode("C");
    const path1 = new Edge(nodeA, nodeB, 10);
    const path2 = new Edge(nodeB, nodeC, 20);
    const digraph = new Digraph([path1, path2]);
```


My intention is for a Digraph to be immutable.  It contains no public methods for 
mutating the data.  But I have not enforced immutability (yet).  It is possible 
to gain direct access to internal data and mutate it.  If you do that, the Digraph 
is corrupted and none of the methods are guaranteed to work anymore.

## Graph and Route Specifications

In accordance with the specifications I was given when building this package, 
cyclic routes are allowed.  If the edges exist and you search for a route between 
A and B you might get something like ACDECDEB.  This is why you must specify a 
maximum weight/cost/distance _or_ specify a maximum number of stops.  The process of 
finding routes among nodes that may include cycles does not terminate unless you 
explicitly set a termination point.

## Dev Notes

In two cases, I wrapped simple data in an object for no apparent reason.
I defined a class SimpleNode that is nothing but a string wrapped in an object.
I defined a Route object with is nothing but an array of SimpleNodes.
At first I did that because I thought I might end up needing to attch more data 
to each node or route maybe.  Eventually I decided to _leave_ these data structures in
place because it makes the code more re-usable.  If someone else comes along 
and _does_ want to attach more data to the nodes or routes, then that will require very 
little change.

For the purpose of finding the _shortest_ route from one node to another, I used the 
classic Floyd's algorithm.  We have not enforced that the graph does not contain 
negative cycles.  So, if you build a graph with negative cycles, the method for 
finding the shortest route will fail.  It will go into an infinite loop.

We expect "weight" to model a cost or distance or otherwise a positive number (perhaps 0).  
Assuming that is the case, Floyd's algorithm is the best known method to find 
the shortest path.  (That is to say: it has the lowest complexity among known algorithms).



## To Do

I will make all of the classes here truly immutable by encapsulating the data.

Some of the public interface methods probably need to be renamed.  Naming is one 
of the hard problems in programming.

More testing.  