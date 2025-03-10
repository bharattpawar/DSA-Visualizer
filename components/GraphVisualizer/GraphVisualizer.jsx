import React, { useState } from "react";
import GraphAlgorithm from "./GraphAlgorithm";
import GraphRaceMode from "./GraphRaceMode";
import "./styles3.css";

const GraphVisualizer = () => {
  const [mode, setMode] = useState("algorithm");

  return (
    <div className="graph-viz-container">
      <div className="graph-viz-mode-selector">
        <button onClick={() => setMode("algorithm")}>Algorithm Mode</button>
        <button onClick={() => setMode("race")}>Race Mode</button>
      </div>

      {mode === "algorithm" && <GraphAlgorithm />}
      {mode === "race" && <GraphRaceMode />}
    </div>
  );
};

export default GraphVisualizer;