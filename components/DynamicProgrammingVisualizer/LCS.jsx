import React, { useState, useEffect } from 'react';
import "./styles4.css"

function LCS() {
  const [str1, setStr1] = useState('AGGTAB');
  const [str2, setStr2] = useState('GXTXAYB');
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

  const calculateLCS = (X, Y, m, n) => {
    let L = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    let anim = [];

    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0 || j === 0) {
          L[i][j] = 0;
          anim.push({
            matrix: L.map(row => row.slice()),
            message: `Initializing base case: L[${i}][${j}] = 0`,
          });
        } else if (X[i - 1] === Y[j - 1]) {
          L[i][j] = L[i - 1][j - 1] + 1;
          anim.push({
            matrix: L.map(row => row.slice()),
            message: `Characters match at X[${i - 1}] and Y[${j - 1}]. Updating L[${i}][${j}] = ${L[i][j]}`,
          });
        } else {
          L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
          anim.push({
            matrix: L.map(row => row.slice()),
            message: `Characters do not match. Taking max of L[${i - 1}][${j}] and L[${i}][${j - 1}]: ${L[i][j]}`,
          });
        }
      }
    }
    return anim;
  };

  const handleCalculate = () => {
    setResult([]);
    setMessages([]);
    const anim = calculateLCS(str1, str2, str1.length, str2.length);
    setAnimations(anim);
  };

  LCS.runAlgorithm = () => calculateLCS(str1, str2, str1.length, str2.length);

  return (
    <div className="dp-lcs">
      <h3>Longest Common Subsequence</h3>
      <button onClick={handleCalculate}>Calculate</button>
      <div className="dp-result">
        {result.map((row, rowIndex) => (
          <div key={rowIndex} className="dp-lcs-step">
            {row.map((num, colIndex) => (
              <span key={colIndex} className="dp-lcs-number">{num}</span>
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

export default LCS;