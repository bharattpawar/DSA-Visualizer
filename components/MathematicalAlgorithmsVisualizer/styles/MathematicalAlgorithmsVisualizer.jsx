import React, { useState } from 'react';
import MathematicalAlgorithmsVisualization from './MathematicalAlgorithmsVisualization';
import './styles/MathematicalAlgorithmsVisualizer.css';
import { FaRandom, FaPlay } from 'react-icons/fa';

const MathematicalAlgorithmsVisualizer = () => {
  const [algorithm, setAlgorithm] = useState('gcd');
  const [inputValue, setInputValue] = useState('');
  const [randomValue, setRandomValue] = useState('');
  const [start, setStart] = useState(false);

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
    setInputValue('');
    setRandomValue('');
    setStart(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleRandomValue = () => {
    let randomValue = '';
    if (algorithm === 'gcd') {
      const randomA = Math.floor(Math.random() * 100) + 1;
      const randomB = Math.floor(Math.random() * 100) + 1;
      randomValue = `${randomA},${randomB}`;
    } else if (algorithm === 'sieve' || algorithm === 'prime') {
      randomValue = Math.floor(Math.random() * 100) + 1;
    }
    setRandomValue(randomValue);
    setInputValue(randomValue);
  };

  const handleStart = () => {
    setStart(true);
  };

  return (
    <div className="visualizer-container">
      <h1 className="visualizer-title">Mathematical Algorithms Visualizer</h1>
      <div className="visualizer-controls">
        <select
          value={algorithm}
          onChange={handleAlgorithmChange}
          className="visualizer-select"
        >
          <option value="gcd">GCD (Euclidean)</option>
          <option value="sieve">Sieve of Eratosthenes</option>
          <option value="prime">Prime Factorization</option>
        </select>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={
            algorithm === 'gcd'
              ? 'Enter two numbers separated by a comma (e.g., 48,18)'
              : 'Enter a number'
          }
          className="visualizer-input"
        />
        <button onClick={handleRandomValue} className="visualizer-button random-button">
          <FaRandom /> Generate Random
        </button>
        <button onClick={handleStart} className="visualizer-button start-button">
          <FaPlay /> Start
        </button>
      </div>
      {start && (
        <MathematicalAlgorithmsVisualization
          algorithm={algorithm}
          inputValue={inputValue || randomValue}
        />
      )}
    </div>
  );
};

export default MathematicalAlgorithmsVisualizer;