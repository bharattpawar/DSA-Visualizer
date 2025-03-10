import React, { useState, useRef, useEffect } from "react";
import "./styles3.css";

// Mock algorithm implementations (replace with actual implementations)
const bfs = (adjList, startNode, callback) => {
  const visited = [];
  const queue = [startNode];
  const result = [];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (!visited.includes(currentNode)) {
      visited.push(currentNode);
      result.push(currentNode); // Store node ID, not object
      callback(`Visited node: ${currentNode}`);

      adjList[currentNode].forEach(neighbor => {
        if (!visited.includes(neighbor.node)) {
          queue.push(neighbor.node);
        }
      });
    }
  }

  return { result };
};

const dfs = (adjList, startNode, callback) => {
  const visited = [];
  const result = [];

  const dfsHelper = (node) => {
    if (!visited.includes(node)) {
      visited.push(node);
      result.push(node); // Store node ID, not object
      callback(`Visited node: ${node}`);

      adjList[node].forEach(neighbor => {
        dfsHelper(neighbor.node);
      });
    }
  };

  dfsHelper(startNode);
  return { result };
};

const dijkstra = (adjList, startNode, callback) => {
  const distances = {};
  const visited = new Set();
  const priorityQueue = [];

  // Initialize distances
  Object.keys(adjList).forEach(node => {
    distances[node] = Infinity;
  });
  distances[startNode] = 0;
  priorityQueue.push({ node: startNode, distance: 0 });

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.distance - b.distance); // Sort by distance
    const { node, distance } = priorityQueue.shift();

    if (visited.has(node)) continue;
    visited.add(node);
    callback(`Processing node: ${node} with distance: ${distance}`);

    adjList[node].forEach(neighbor => {
      const newDistance = distance + neighbor.weight;
      if (newDistance < distances[neighbor.node]) {
        distances[neighbor.node] = newDistance;
        priorityQueue.push({ node: neighbor.node, distance: newDistance });
      }
    });
  }

  return { distances };
};

const prim = (adjList, callback) => {
  const visited = new Set();
  const mst = [];
  const priorityQueue = [];

  // Start with the first node
  const startNode = Object.keys(adjList)[0];
  visited.add(startNode);
  callback(`Starting Prim's algorithm with node: ${startNode}`);

  adjList[startNode].forEach(neighbor => {
    priorityQueue.push({ from: startNode, to: neighbor.node, weight: neighbor.weight });
  });

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.weight - b.weight); // Sort by weight
    const { from, to, weight } = priorityQueue.shift();

    if (visited.has(to)) continue;
    visited.add(to);
    mst.push({ from, to, weight });
    callback(`Added edge: ${from} - ${to} (Weight: ${weight})`);

    adjList[to].forEach(neighbor => {
      if (!visited.has(neighbor.node)) {
        priorityQueue.push({ from: to, to: neighbor.node, weight: neighbor.weight });
      }
    });
  }

  return { mst };
};

const kruskal = (edges, numNodes, callback) => {
  const parent = Array.from({ length: numNodes }, (_, i) => i);
  const mst = [];

  const find = (node) => {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      parent[rootY] = rootX;
      return true;
    }
    return false;
  };

  edges.sort((a, b) => a.weight - b.weight); // Sort edges by weight
  edges.forEach(edge => {
    if (union(edge.from, edge.to)) {
      mst.push(edge);
      callback(`Added edge: ${edge.from} - ${edge.to} (Weight: ${edge.weight})`);
    }
  });

  return { mst };
};

const GraphAlgorithm = () => {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [algorithm, setAlgorithm] = useState("bfs");
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [customInput, setCustomInput] = useState("");
  const canvasRef = useRef(null);
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState([]);

  const generateRandomGraph = () => {
    const numNodes = Math.floor(Math.random() * 10) + 5;
    const newGraph = { nodes: Array.from({ length: numNodes }, (_, i) => i), edges: [] };

    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (Math.random() > 0.5) {
          const weight = Math.floor(Math.random() * 10) + 1;
          newGraph.edges.push({ from: i, to: j, weight });
          newGraph.edges.push({ from: j, to: i, weight });
        }
      }
    }
    setGraph(newGraph);
    setResult(null);
    setExplanation(["Random graph generated. Click 'Start Visualization' to run the selected algorithm."]);
  };

  const handleCustomInput = () => {
    try {
      const parsedGraph = JSON.parse(customInput);
      if (parsedGraph.nodes && parsedGraph.edges) {
        setGraph(parsedGraph);
        setResult(null);
        setExplanation(["Custom graph loaded. Click 'Start Visualization' to run the selected algorithm."]);
      } else {
        alert("Invalid graph format.");
      }
    } catch (e) {
      alert("Invalid JSON input.");
    }
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodePositions = {};

    graph.nodes.forEach((node, i) => {
      const x = 100 + (i % 5) * 150;
      const y = 100 + Math.floor(i / 5) * 150;
      nodePositions[node] = { x, y };
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "#007bff";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node, x, y);
    });

    graph.edges.forEach((edge) => {
      const fromPos = nodePositions[edge.from];
      const toPos = nodePositions[edge.to];
      if (fromPos && toPos) {
        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.lineTo(toPos.x, toPos.y);
        ctx.strokeStyle = "#333";
        ctx.stroke();
        ctx.fillStyle = "#333";
        ctx.fillText(edge.weight, (fromPos.x + toPos.x) / 2, (fromPos.y + toPos.y) / 2);
      }
    });
  };

  useEffect(() => {
    drawGraph();
  }, [graph]);

  const handleStart = async () => {
    setIsRunning(true);
    setExplanation([`Running ${algorithm.toUpperCase()} algorithm...`]);

    const adjList = {};
    graph.nodes.forEach(node => adjList[node] = []);
    graph.edges.forEach(edge => {
      adjList[edge.from].push({ node: edge.to, weight: edge.weight });
      adjList[edge.to].push({ node: edge.from, weight: edge.weight });
    });

    let result;
    switch (algorithm) {
      case "bfs":
        result = bfs(adjList, graph.nodes[0], (message) => {
          setExplanation((prev) => [...prev, message]);
        });
        break;
      case "dfs":
        result = dfs(adjList, graph.nodes[0], (message) => {
          setExplanation((prev) => [...prev, message]);
        });
        break;
      case "dijkstra":
        result = dijkstra(adjList, graph.nodes[0], (message) => {
          setExplanation((prev) => [...prev, message]);
        });
        break;
      case "prim":
        result = prim(adjList, (message) => {
          setExplanation((prev) => [...prev, message]);
        });
        break;
      case "kruskal":
        result = kruskal(graph.edges, graph.nodes.length, (message) => {
          setExplanation((prev) => [...prev, message]);
        });
        break;
      default:
        setIsRunning(false);
        break;
    }

    setResult(result);
    setIsRunning(false);
  };

  const formatResult = (result) => {
    if (!result) return <p>No result yet.</p>;

    switch (algorithm) {
      case "bfs":
      case "dfs":
        return (
          <div>
            <p><strong>Visited Nodes:</strong> {result && result.result && result.result.join(", ")}</p>
          </div>
        );
      case "dijkstra":
        return (
          <div>
            <p><strong>Shortest Distances:</strong></p>
            <ul>
              {result && result.distances && Object.entries(result.distances).map(([node, dist]) => (
                <li key={node}>{node}: {dist === Infinity ? "Infinity" : dist}</li>
              ))}
            </ul>
          </div>
        );
      case "prim":
      case "kruskal":
        return (
          <div>
            <p><strong>Minimum Spanning Tree:</strong></p>
            <ul>
              {result && result.mst && result.mst.map((edge, index) => (
                <li key={index}>
                  {edge.from} - {edge.to} (Weight: {edge.weight})
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return <pre>{JSON.stringify(result, null, 2)}</pre>;
    }
  };

  return (
    <div className="graph-viz-app">
      <h1>Graph Algorithm Visualizer</h1>
      <div className="graph-viz-container">
        <div className="graph-viz-controls">
          <button onClick={generateRandomGraph} disabled={isRunning}>Generate Random Graph</button>
          <label>Speed: <input type="range" min="0.5" max="5" step="0.5" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} disabled={isRunning} /></label>
        </div>

        <div className="graph-viz-custom-input">
          <textarea placeholder='Example:{"nodes": [0, 1, 2, 3],"edges": [{ "from": 0, "to": 1, "weight": 2 },{ "from": 1, "to": 2, "weight": 3 },{ "from": 2, "to": 3, "weight": 1 }]}' value={customInput} onChange={(e) => setCustomInput(e.target.value)} disabled={isRunning} />
          <button onClick={handleCustomInput} disabled={isRunning}>Load Custom Graph</button>
        </div>

        <div className="graph-viz-algorithm-selector">
          <button onClick={() => setAlgorithm("bfs")} disabled={isRunning}>BFS</button>
          <button onClick={() => setAlgorithm("dfs")} disabled={isRunning}>DFS</button>
          <button onClick={() => setAlgorithm("dijkstra")} disabled={isRunning}>Dijkstra’s</button>
          <button onClick={() => setAlgorithm("prim")} disabled={isRunning}>Prim’s</button>
          <button onClick={() => setAlgorithm("kruskal")} disabled={isRunning}>Kruskal’s</button>
        </div>

        <button onClick={handleStart} disabled={isRunning}>Start Visualization</button>

        <div className="graph-viz-result">
          <h3>{algorithm.toUpperCase()} Result:</h3>
          {formatResult(result)}
        </div>

        <div className="graph-viz-explanation">
          <h3>Step-by-Step Explanation:</h3>
          <ul>
            {explanation.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        <canvas ref={canvasRef} width={800} height={600} className="graph-viz-canvas" />
      </div>
    </div>
  );
};

export default GraphAlgorithm;