import React, { useState, useEffect } from 'react';
import "./styles4.css"

function Knapsack() {
  const [weights, setWeights] = useState([2, 3, 4, 5]);
  const [values, setValues] = useState([3, 4, 5, 6]);
  const [capacity, setCapacity] = useState(5);
  const [result, setResult] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (animations.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < animations.length) {
          const currentAnimation = animations[index];
          if (currentAnimation && currentAnimation.matrix !== undefined && currentAnimation.message !== undefined) {
            setResult(currentAnimation.matrix);
            setMessages(prev => [...prev, currentAnimation.message]);
          }
          index++;
        } else {
          clearInterval(interval);
        }
      }, 1000); // Adjust delay for better readability
      return () => clearInterval(interval);
    }
  }, [animations]);

  const calculateKnapsack = (W, wt, val, n) => {
    let K = Array(n + 1).fill().map(() => Array(W + 1).fill(0));
    let anim = [];

    for (let i = 0; i <= n; i++) {
      for (let w = 0; w <= W; w++) {
        if (i === 0 || w === 0) {
          K[i][w] = 0;
          anim.push({
            matrix: K.map(row => row.slice()),
            message: `Initializing base case: K[${i}][${w}] = 0`,
          });
        } else if (wt[i - 1] <= w) {
          K[i][w] = Math.max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);
          anim.push({
            matrix: K.map(row => row.slice()),
            message: `Item ${i} (weight ${wt[i - 1]}, value ${val[i - 1]}) can fit. Choosing max value: ${K[i][w]}`,
          });
        } else {
          K[i][w] = K[i - 1][w];
          anim.push({
            matrix: K.map(row => row.slice()),
            message: `Item ${i} (weight ${wt[i - 1]}) is too heavy. Carrying over value: ${K[i][w]}`,
          });
        }
      }
    }
    return anim;
  };

  const handleCalculate = () => {
    setResult([]);
    setMessages([]);
    const anim = calculateKnapsack(capacity, weights, values, weights.length);
    setAnimations(anim);
  };

  Knapsack.runAlgorithm = () => calculateKnapsack(capacity, weights, values, weights.length);

  return (
    <div className="dp-knapsack">
      <h3>Knapsack Problem</h3>
      <button onClick={handleCalculate}>Calculate</button>
      <div className="dp-result">
        {result.map((row, rowIndex) => (
          <div key={rowIndex} className="dp-knapsack-step">
            {row.map((num, colIndex) => (
              <span key={colIndex} className="dp-knapsack-number">{num}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="dp-messages">
        {messages.map((msg, index) => (
          <p key={index} className="dp-message">{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default Knapsack;