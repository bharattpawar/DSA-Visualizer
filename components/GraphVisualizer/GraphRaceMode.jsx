import React, { useState, useRef, useEffect } from "react";
import { bfs, dfs, dijkstra, prim, kruskal } from "./algorithm";
import "./styles3.css";

const GraphRaceMode = () => {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [algorithms, setAlgorithms] = useState(["bfs", "dfs"]); // Default algorithms selected
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [customInput, setCustomInput] = useState("");
  const canvasRef = useRef(null);
  const [results, setResults] = useState({}); // Store results of each algorithm

  const generateRandomGraph = () => {
    const numNodes = Math.floor(Math.random() * 10) + 5;
    const newGraph = { nodes: Array.from({ length: numNodes }, (_, i) => i), edges: [] };

    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (Math.random() > 0.5) {
          const weight = Math.floor(Math.random() * 10) + 1;
          newGraph.edges.push({ from: i, to: j, weight });
          newGraph.edges.push({ from: j, to: i, weight }); // For undirected graph
        }
      }
    }
    setGraph(newGraph);
    setResults({}); // Clear previous results
  };

  const handleCustomInput = () => {
    try {
      const parsedGraph = JSON.parse(customInput);
      if (parsedGraph.nodes && parsedGraph.edges) {
        setGraph(parsedGraph);
        setResults({}); // Clear previous results
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

  const handleStartRace = () => {
    setIsRunning(true);
    const adjList = {};
    graph.nodes.forEach(node => adjList[node] = []);
    graph.edges.forEach(edge => {
      adjList[edge.from].push(edge.to);
      adjList[edge.to].push(edge.from); // For undirected graph
    });

    setResults({}); // Clear previous results

    algorithms.forEach(algo => {
      let result;
      switch (algo) {
        case "bfs": result = bfs(adjList, graph.nodes[0]); break;
        case "dfs": result = dfs(adjList, graph.nodes[0]); break;
        case "dijkstra": result = dijkstra(adjList, graph.nodes[0]); break;
        case "prim": result = prim(adjList); break;
        case "kruskal": result = kruskal(adjList); break;
        default: break;
      }
      setResults(prev => ({ ...prev, [algo]: result }));
    });
    setIsRunning(false);
  };

  const formatResultsComparison = () => {
    return (
      <div>
        <h3>Comparison of Algorithms:</h3>
        {Object.keys(results).map(algo => (
          <div key={algo}>
            <h4>{algo.toUpperCase()} Result:</h4>
            {algo === "bfs" || algo === "dfs" ? (
              <div>
                <p><strong>Visited Nodes:</strong> {results[algo].result.join(", ")}</p>
                <p><strong>Steps:</strong></p>
                <pre>{JSON.stringify(results[algo].steps, null, 2)}</pre>
              </div>
            ) : algo === "dijkstra" ? (
              <div>
                <p><strong>Shortest Distances:</strong></p>
                <ul>
                  {Object.entries(results[algo].distances).map(([node, dist]) => (
                    <li key={node}>{node}: {dist === Infinity ? "Infinity" : dist}</li>
                  ))}
                </ul>
                <p><strong>Previous Nodes:</strong></p>
                <pre>{JSON.stringify(results[algo].previousNodes, null, 2)}</pre>
                <p><strong>Steps:</strong></p>
                <pre>{JSON.stringify(results[algo].steps, null, 2)}</pre>
              </div>
            ) : algo === "kruskal" ? (
              <div>
                <p><strong>Minimum Spanning Tree:</strong></p>
                <ul>
                  {Object.entries(results[algo].mst).map(([node, connections]) => (
                    <li key={node}>
                      {node}: {Object.entries(connections).map(([neighbor, weight]) => `${neighbor}(${weight})`).join(", ")}
                    </li>
                  ))}
                </ul>
                <p><strong>Steps:</strong></p>
                <pre>{JSON.stringify(results[algo].steps, null, 2)}</pre>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="graph-viz-race-mode">
      <div className="graph-viz-controls">
        <button onClick={generateRandomGraph} disabled={isRunning}>Generate Random Graph</button>
        <label>Speed: <input type="range" min="0.5" max="5" step="0.5" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} disabled={isRunning} /></label>
      </div>

      <div className="graph-viz-custom-input">
        <textarea placeholder='Example:{"nodes": [0, 1, 2, 3],"edges": [{ "from": 0, "to": 1, "weight": 2 },{ "from": 1, "to": 2, "weight": 3 },{ "from": 2, "to": 3, "weight": 1 }]}' value={customInput} onChange={(e) => setCustomInput(e.target.value)} disabled={isRunning} />
        <button onClick={handleCustomInput} disabled={isRunning}>Load Custom Graph</button>
      </div>

      <div className="graph-viz-algorithm-selector">
        <label><input type="checkbox" checked={algorithms.includes("bfs")} onChange={(e) => setAlgorithms(prev => e.target.checked ? [...prev, "bfs"] : prev.filter(algo => algo !== "bfs"))} disabled={isRunning} />BFS</label>
        <label><input type="checkbox" checked={algorithms.includes("dfs")} onChange={(e) => setAlgorithms(prev => e.target.checked ? [...prev, "dfs"] : prev.filter(algo => algo !== "dfs"))} disabled={isRunning} />DFS</label>
        <label><input type="checkbox" checked={algorithms.includes("dijkstra")} onChange={(e) => setAlgorithms(prev => e.target.checked ? [...prev, "dijkstra"] : prev.filter(algo => algo !== "dijkstra"))} disabled={isRunning} />Dijkstra’s</label>
        <label><input type="checkbox" checked={algorithms.includes("prim")} onChange={(e) => setAlgorithms(prev => e.target.checked ? [...prev, "prim"] : prev.filter(algo => algo !== "prim"))} disabled={isRunning} />Prim’s</label>
        <label><input type="checkbox" checked={algorithms.includes("kruskal")} onChange={(e) => setAlgorithms(prev => e.target.checked ? [...prev, "kruskal"] : prev.filter(algo => algo !== "kruskal"))} disabled={isRunning} />Kruskal’s</label>
      </div>

      <button onClick={handleStartRace} disabled={isRunning}>Start Race</button>

      <div className="graph-viz-results">
        {formatResultsComparison()}
      </div>

      <canvas ref={canvasRef} width={800} height={600} className="graph-viz-canvas" />
    </div>
  );
};

export default GraphRaceMode;