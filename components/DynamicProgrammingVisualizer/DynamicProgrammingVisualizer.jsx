import React, { useState } from 'react';
import DynamicProgrammingVisualization from './DynamicProgrammingVisualization';
import "./styles4.css"

function DynamicProgrammingVisualizer() {
  const [view, setView] = useState('visualization');
  
  return (
    <div className="dp-visualizer-container">
      <h1>Dynamic Programming Visualizer</h1>
      <div className="dp-view-toggle">
        <button onClick={() => setView('visualization')}>Visualization</button>
      </div>
      {view === 'visualization' ? (
        <DynamicProgrammingVisualization />
      ) : (
        <DynamicProgrammingRaceMode />
      )}
    </div>
  );
}

export default DynamicProgrammingVisualizer;