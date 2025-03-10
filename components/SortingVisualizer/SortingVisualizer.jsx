import React, { useState } from 'react';
import SortingVisualization from './SortingVisualization';
import SortingRaceMode from './SortingRaceMode';
import './styles2.css';

const SortingVisualizer = () => {
  const [mode, setMode] = useState('visualization'); // 'visualization' or 'race'

  return (
    <div className="sorting-visualizer">
      <h1>Sorting Algorithm Visualizer</h1>
      <div className="mode-switcher">
        <button onClick={() => setMode('visualization')}>Visualization Mode</button>
        <button onClick={() => setMode('race')}>Race Mode</button>
      </div>
      {mode === 'visualization' ? <SortingVisualization /> : <SortingRaceMode />}
    </div>
  );
};

export default SortingVisualizer;