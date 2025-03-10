import React, { useState } from 'react';
import VisualizerMode from './VisualizerMode';
import RaceMode from './RaceMode';
import './styles1.css';

const SearchingVisualizer = () => {
  const [mode, setMode] = useState('visualizer'); // 'visualizer' or 'race'

  return (
    <div className="dsa-searching-visualizer">
      <h1>Searching Algorithm Visualizer</h1>
      <div className="dsa-mode-switcher">
        <button onClick={() => setMode('visualizer')}>Visualizer Mode</button>
        <button onClick={() => setMode('race')}>Race Mode</button>
      </div>
      {mode === 'visualizer' ? <VisualizerMode /> : <RaceMode />}
    </div>
  );
};

export default SearchingVisualizer;