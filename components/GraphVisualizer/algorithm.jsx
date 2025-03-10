// Breadth-First Search (BFS)
export function bfs(graph, startNode) {
    let visited = new Set();
    let queue = [startNode];
    let result = [];
    let steps = [];

    while (queue.length > 0) {
        const node = queue.shift();
        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);
            steps.push({ visited: new Set(visited), queue: [...queue] }); // Capture visualization step

            if (graph[node]) { // Check for existence of neighbors
                queue.push(...graph[node].filter(neighbor => !visited.has(neighbor)));
            }
        }
    }

    return { result, steps };
}

// Depth-First Search (DFS)
export function dfs(graph, startNode) {
    let visited = new Set();
    let result = [];
    let steps = [];

    function traverse(node) {
        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);
            steps.push({ visited: new Set(visited) }); // Capture visualization step

            if (graph[node]) {  // Check for existence of neighbors
                graph[node].forEach(traverse);
            }
        }
    }

    traverse(startNode);
    return { result, steps };
}

// Dijkstra's Algorithm (Shortest Path)
export function dijkstra(graph, startNode) {
    const distances = {};
    const pq = [[startNode, 0]]; // Priority queue: [node, distance]
    const visited = new Set();
    const previousNodes = {}; // Track the previous node for path reconstruction
    const steps = [];

    for (const node in graph) {
        distances[node] = Infinity;
    }
    distances[startNode] = 0;

    while (pq.length > 0) {
        pq.sort((a, b) => a[1] - b[1]); // Sort by distance
        const [node, dist] = pq.shift();

        if (visited.has(node)) continue;
        visited.add(node);
        steps.push({ distances: { ...distances }, visited: new Set(visited), currentNode: node }); // Capture visualization step

        if (graph[node]) { // Check if neighbors exist
            for (const neighbor in graph[node]) {
                const newDist = dist + graph[node][neighbor];
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    previousNodes[neighbor] = node;
                    pq.push([neighbor, newDist]);
                }
            }
        }
    }

    return { distances, previousNodes, steps };
}

// Prim's Algorithm (Minimum Spanning Tree)
export function prim(graph) {
    const nodes = Object.keys(graph);
    const mst = {};
    const visited = new Set();
    const edges = [];
    const steps = [];

    function addEdges(node) {
        visited.add(node);
        if (graph[node]) { // Check for existence of neighbors
            for (const neighbor in graph[node]) {
                if (!visited.has(neighbor)) {
                    edges.push([node, neighbor, graph[node][neighbor]]);
                }
            }
        }
    }

    if (nodes.length > 0) {
        addEdges(nodes[0]);

        while (visited.size < nodes.length) {
            if (edges.length === 0) break; // Prevents destructuring from an empty array
            edges.sort((a, b) => a[2] - b[2]); // Sort by weight
            const [from, to, weight] = edges.shift();

            if (!visited.has(to)) {
                mst[from] = mst[from] || {};
                mst[from][to] = weight;
                mst[to] = mst[to] || {};
                mst[to][from] = weight;
                addEdges(to);
                steps.push({ mst: { ...mst }, visited: new Set(visited), currentEdge: [from, to, weight] }); // Capture visualization step
            }
        }
    }

    return { mst, steps };
}

// Kruskal's Algorithm (Minimum Spanning Tree)
export function kruskal(graph) {
    const nodes = Object.keys(graph);
    const edges = [];
    const mst = {};
    const parent = {};
    const steps = [];

    function find(node) {
        if (parent[node] !== node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    }

    function union(node1, node2) {
        const root1 = find(node1);
        const root2 = find(node2);
        if (root1 !== root2) {
            parent[root2] = root1;
        }
    }

    // Initialize parent pointers
    for (const node of nodes) {
        parent[node] = node;
    }

    // Collect all edges
    for (const from of nodes) {
        if (graph[from]) { // Check if neighbors exist
            for (const to in graph[from]) {
                edges.push([from, to, graph[from][to]]);
            }
        }
    }

    // Sort edges by weight
    edges.sort((a, b) => a[2] - b[2]);

    // Build MST
    for (const [from, to, weight] of edges) {
        if (find(from) !== find(to)) {
            mst[from] = mst[from] || {};
            mst[from][to] = weight;
            mst[to] = mst[to] || {};
            mst[to][from] = weight;
            union(from, to);
            steps.push({ mst: { ...mst }, currentEdge: [from, to, weight] }); // Capture visualization step
        }
    }

    return { mst, steps };
}