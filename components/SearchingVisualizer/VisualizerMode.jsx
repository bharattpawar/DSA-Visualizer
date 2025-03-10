import React, { useState, useRef, useEffect } from 'react';
import { linearSearch, binarySearch } from './SearchingAlgorithm';
import './styles1.css';

const VisualizerMode = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState('');
  const [searching, setSearching] = useState(false);
  const [algorithm, setAlgorithm] = useState('linear');
  const [speed, setSpeed] = useState(500);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [explanations, setExplanations] = useState([]);
  const [manualArrayInput, setManualArrayInput] = useState('');
  const [complexity, setComplexity] = useState({
    time: '',
    space: '',
  });
  const intervalRef = useRef(null);

  // Generate a random array (unsorted)
  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(randomArray); // Do not sort the array
    setFoundIndex(-1);
    setCurrentIndex(-1);
    setExplanations([]);
  };

  // Handle manual array input (unsorted)
  const handleManualArrayInput = () => {
    const manualArray = manualArrayInput
      .split(',')
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));
    setArray(manualArray); // Do not sort the array
    setFoundIndex(-1);
    setCurrentIndex(-1);
    setExplanations([]);
  };

  // Handle search start
  const startSearch = () => {
    if (!target || array.length === 0) return;
    setSearching(true);
    setFoundIndex(-1);
    setCurrentIndex(-1);
    setExplanations([]);

    const searchFunction = algorithm === 'linear' ? linearSearch : binarySearch;
    const { steps, explanations: searchExplanations, found, error } = searchFunction(array, parseInt(target));

    if (error) {
      setExplanations(searchExplanations);
      setSearching(false);
      return;
    }

    let stepIndex = 0;
    intervalRef.current = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentIndex(steps[stepIndex]);
        setExplanations((prev) => [...prev, searchExplanations[stepIndex]]);
        stepIndex++;
      } else {
        clearInterval(intervalRef.current);
        setSearching(false);
        if (found) {
          setFoundIndex(steps[steps.length - 1]);
        } else {
          setExplanations((prev) => [...prev, `${target} not found in the array.`]);
        }
      }
    }, speed);
  };

  // Handle search stop
  const stopSearch = () => {
    clearInterval(intervalRef.current);
    setSearching(false);
  };

  // Handle search restart
  const restartSearch = () => {
    setFoundIndex(-1);
    setCurrentIndex(-1);
    setExplanations([]);
  };

  // Update complexity information when algorithm changes
  useEffect(() => {
    if (algorithm === 'linear') {
      setComplexity({
        time: 'O(n)',
        space: 'O(1)',
      });
    } else if (algorithm === 'binary') {
      setComplexity({
        time: 'O(log n)',
        space: 'O(1)',
      });
    }
  }, [algorithm]);

  return (
    <div className="dsa-visualizer-mode">
      <h2>Visualizer Mode</h2>
      <div className="dsa-controls">
        <button onClick={generateRandomArray}>Generate Random Array</button>
        <div className="dsa-manual-array-input">
          <input
            type="text"
            placeholder="Enter array manually (e.g., 1, 4, 2, 3)"
            value={manualArrayInput}
            onChange={(e) => setManualArrayInput(e.target.value)}
          />
          <button onClick={handleManualArrayInput}>Set Array</button>
        </div>
        <input
          type="text"
          placeholder="Enter target number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="linear">Linear Search</option>
          <option value="binary">Binary Search</option>
        </select>
        <input
          type="range"
          min="100"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <span>Speed: {speed}ms</span>
        <button onClick={startSearch} disabled={searching}>
          Start
        </button>
        <button onClick={stopSearch} disabled={!searching}>
          Stop
        </button>
        <button onClick={restartSearch}>Restart</button>
      </div>
      <div className="dsa-array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`dsa-array-bar ${index === currentIndex ? 'dsa-array-bar-active' : ''} ${index === foundIndex ? 'dsa-array-bar-found' : ''}`}
            style={{ height: `${value}px` }}
            data-value={value}
          ></div>
        ))}
      </div>
      <div className="dsa-calculations">
        <h3>Calculations:</h3>
        {explanations.map((explanation, index) => (
          <p key={index}>{explanation}</p>
        ))}
      </div>
      <div className="dsa-complexity">
        <h3>Algorithm Complexity:</h3>
        <p>Time Complexity: {complexity.time}</p>
        <p>Space Complexity: {complexity.space}</p>
      </div>
    </div>
  );
};

export default VisualizerMode;