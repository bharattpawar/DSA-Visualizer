import React, { useState, useRef } from 'react';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
} from './SortingAlgorithm';
import './styles2.css';

const SortingVisualization = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(500);
  const [steps, setSteps] = useState([]);
  const [explanations, setExplanations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [manualArrayInput, setManualArrayInput] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const intervalRef = useRef(null);

  // Generate a random array
  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(randomArray);
    setSteps([]);
    setExplanations([]);
    setCurrentStep(0);
  };

  // Handle manual array input
  const handleManualArrayInput = () => {
    const manualArray = manualArrayInput
      .split(',')
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));
    setArray(manualArray);
    setSteps([]);
    setExplanations([]);
    setCurrentStep(0);
  };

  // Handle sort start
  const startSort = () => {
    if (array.length === 0) return;
    setSorting(true);
    setSteps([]);
    setExplanations([]);
    setCurrentStep(0);

    let sortFunction;
    switch (algorithm) {
      case 'bubble':
        sortFunction = bubbleSort;
        break;
      case 'selection':
        sortFunction = selectionSort;
        break;
      case 'insertion':
        sortFunction = insertionSort;
        break;
      case 'merge':
        sortFunction = mergeSort;
        break;
      case 'quick':
        sortFunction = quickSort;
        break;
      default:
        return;
    }

    const { steps: sortSteps, explanations: sortExplanations } = sortFunction([...array]);
    setSteps(sortSteps);
    setExplanations(sortExplanations);

    let stepIndex = 0;
    intervalRef.current = setInterval(() => {
      if (stepIndex < sortSteps.length) {
        setArray(sortSteps[stepIndex]);
        setCurrentStep(stepIndex);
        stepIndex++;
      } else {
        clearInterval(intervalRef.current);
        setSorting(false);
      }
    }, speed);
  };

  // Handle sort stop
  const stopSort = () => {
    clearInterval(intervalRef.current);
    setSorting(false);
  };

  // Handle sort restart
  const restartSort = () => {
    setSteps([]);
    setExplanations([]);
    setCurrentStep(0);
  };

 

  return (
    <div className={`sorting-visualization ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Sorting Visualization</h2>
      
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
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
        <input
          type="range"
          min="100"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <span className='speed'>Speed: {speed}ms</span>
        <button onClick={startSort} disabled={sorting}>
          Start
        </button>
        <button onClick={stopSort} disabled={!sorting}>
          Stop
        </button>
        <button onClick={restartSort}>Restart</button>
      </div>
      <div className="array-container">
  {array.map((value, index) => (
    <div
      key={index}
      className="array-bar"
      style={{ height: `${value+8}px` }}
      data-value={value} // Add this line
    ></div>
  ))}
</div>
      <div className="calculations">
        <h3>Calculations:</h3>
        {explanations[currentStep] && <p>{explanations[currentStep]}</p>}
      </div>
    </div>
  );
};

export default SortingVisualization;