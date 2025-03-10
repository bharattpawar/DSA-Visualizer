import React, { useState, useRef } from 'react';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
} from './SortingAlgorithm';
import './styles2.css';

const SortingRaceMode = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(500); // Speed state for the slider
  const [algorithms, setAlgorithms] = useState([
    { name: 'Bubble Sort', progress: 0, steps: [], states: [], explanations: [], completed: false, currentArray: [] },
    { name: 'Selection Sort', progress: 0, steps: [], states: [], explanations: [], completed: false, currentArray: [] },
    { name: 'Insertion Sort', progress: 0, steps: [], states: [], explanations: [], completed: false, currentArray: [] },
    { name: 'Merge Sort', progress: 0, steps: [], states: [], explanations: [], completed: false, currentArray: [] },
    { name: 'Quick Sort', progress: 0, steps: [], states: [], explanations: [], completed: false, currentArray: [] },
  ]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [manualArrayInput, setManualArrayInput] = useState('');
  const intervalRef = useRef(null);

  // Generate a random array
  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(randomArray);
    setAlgorithms((prev) =>
      prev.map((algo) => ({
        ...algo,
        progress: 0,
        steps: [],
        states: [],
        explanations: [],
        completed: false,
        currentArray: [...randomArray],
      }))
    );
    setLeaderboard([]);
  };

  // Handle manual array input
  const handleManualArrayInput = () => {
    const manualArray = manualArrayInput
      .split(',')
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));
    setArray(manualArray);
    setAlgorithms((prev) =>
      prev.map((algo) => ({
        ...algo,
        progress: 0,
        steps: [],
        states: [],
        explanations: [],
        completed: false,
        currentArray: [...manualArray],
      }))
    );
    setLeaderboard([]);
  };

  // Handle race start
  const startRace = () => {
    if (array.length === 0) return;
    setSorting(true);
    setLeaderboard([]);

    const algorithmFunctions = {
      'Bubble Sort': bubbleSort,
      'Selection Sort': selectionSort,
      'Insertion Sort': insertionSort,
      'Merge Sort': mergeSort,
      'Quick Sort': quickSort,
    };

    const results = algorithms.map((algo) => {
      const { steps, states, explanations } = algorithmFunctions[algo.name]([...array]);
      return { ...algo, steps, states, explanations };
    });

    let stepIndex = 0;
    intervalRef.current = setInterval(() => {
      if (stepIndex < Math.max(...results.map((algo) => algo.steps.length))) {
        setAlgorithms((prev) =>
          prev.map((algo, index) => ({
            ...algo,
            progress: (stepIndex / results[index].steps.length) * 100,
            currentStep: results[index].steps[stepIndex] || [],
            currentState: results[index].states[stepIndex] || [],
            currentArray: results[index].steps[stepIndex] || algo.currentArray,
            explanations: results[index].explanations.slice(0, stepIndex + 1),
          }))
        );
        stepIndex++;
      } else {
        clearInterval(intervalRef.current);
        setSorting(false);
        setLeaderboard(
          results.map((algo) => ({
            name: algo.name,
            time: algo.steps.length,
            completed: true,
          }))
        );
      }
    }, speed);
  };

  // Handle race stop
  const stopRace = () => {
    clearInterval(intervalRef.current);
    setSorting(false);
  };

  // Handle race restart
  const restartRace = () => {
    setAlgorithms((prev) =>
      prev.map((algo) => ({
        ...algo,
        progress: 0,
        steps: [],
        states: [],
        explanations: [],
        completed: false,
        currentArray: [...array],
      }))
    );
    setLeaderboard([]);
  };

  return (
    <div className="sorting-race-mode">
      <h2>Sorting Race Mode</h2>
      <div className="controls">
        <button onClick={generateRandomArray}>Generate Random Array</button>
        <div className="manual-array-input">
          <input
            type="text"
            placeholder="Enter array manually (e.g., 10, 20, 30)"
            value={manualArrayInput}
            onChange={(e) => setManualArrayInput(e.target.value)}
          />
          <button onClick={handleManualArrayInput}>Set Array</button>
        </div>
        <input
          type="range"
          min="100"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <span className="speed">Speed: {speed}ms</span>
        <button onClick={startRace} disabled={sorting}>
          Start Race
        </button>
        <button onClick={stopRace} disabled={!sorting}>
          Stop Race
        </button>
        <button onClick={restartRace}>Restart Race</button>
      </div>
      <div className="algorithm-visualization">
        {algorithms.map((algo, index) => (
          <div key={index} className="algorithm-container">
            <h3>{algo.name}</h3>
            <div className="array-container">
              {algo.currentArray.map((value, idx) => (
                <div
                  key={idx}
                  className={`array-bar ${
                    algo.currentState?.[idx] === 'active' ? 'active' : ''
                  } ${
                    algo.currentState?.[idx] === 'sorted' ? 'sorted' : ''
                  }`}
                  style={{ height: `${value}px` }}
                  data-value={value}
                ></div>
              ))}
            </div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${algo.progress}%` }}
              ></div>
            </div>
            <div className="calculations">
              {algo.explanations.map((explanation, i) => (
                <p key={i}>{explanation}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="leaderboard">
        <h3>Leaderboard</h3>
        {leaderboard.map((algo, index) => (
          <div key={index} className="leaderboard-entry">
            <span>{algo.name}</span>
            <span>{algo.completed ? `Completed in ${algo.time} steps` : 'In Progress'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingRaceMode;