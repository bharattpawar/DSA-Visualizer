import React, { useState, useEffect } from 'react';
import "./styles4.css"
function LIS() {
  const [input, setInput] = useState([10, 22, 9, 33, 21, 50, 41, 60, 80]);
  const [result, setResult] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (animations.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < animations.length) {
          const currentAnimation = animations[index];
          if (currentAnimation && currentAnimation.sequence !== undefined && currentAnimation.message !== undefined) {
            setResult(prev => [...prev, currentAnimation.sequence]);
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

  const calculateLIS = (arr) => {
    let n = arr.length;
    let lis = Array(n).fill(1);
    let anim = [{ sequence: [...lis], message: "Initializing LIS array with 1s" }];

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[i] > arr[j] && lis[i] < lis[j] + 1) {
          lis[i] = lis[j] + 1;
          anim.push({
            sequence: [...lis],
            message: `Updating LIS[${i}] = LIS[${j}] + 1 = ${lis[i]}`,
          });
        }
      }
    }
    return anim;
  };

  const handleCalculate = () => {
    setResult([]);
    setMessages([]);
    const anim = calculateLIS(input);
    setAnimations(anim);
  };

  LIS.runAlgorithm = () => calculateLIS(input);

  return (
    <div className="dp-lis">
      <h3>Longest Increasing Subsequence</h3>
      <button onClick={handleCalculate}>Calculate</button>
      <div className="dp-result">
        {result.map((step, index) => (
          <div key={index} className="dp-lis-step">
            {step.map((num, idx) => (
              <span key={idx} className="dp-lis-number">{num}</span>
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

export default LIS;