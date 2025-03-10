import React, { useState, useEffect } from 'react';
import "./styles4.css"

function Fibonacci() {
  const [input, setInput] = useState(10);
  const [result, setResult] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (animations.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < animations.length) {
          const currentAnimation = animations[index];
          if (currentAnimation && currentAnimation.value !== undefined) {
            setResult(prev => [...prev, currentAnimation.value]);
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

  const calculateFibonacci = (n) => {
    let fib = [0, 1];
    let anim = [
      { value: 0, message: "Starting Fibonacci sequence: F(0) = 0" },
      { value: 1, message: "Next Fibonacci number: F(1) = 1" },
    ];

    for (let i = 2; i <= n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
      anim.push({
        value: fib[i],
        message: `Calculating F(${i}) = F(${i - 1}) + F(${i - 2}) = ${fib[i]}`,
      });
    }
    return anim;
  };

  const handleCalculate = () => {
    setResult([]);
    setMessages([]);
    const anim = calculateFibonacci(input);
    setAnimations(anim);
  };

  Fibonacci.runAlgorithm = () => calculateFibonacci(input).map(a => a.value);

  return (
    <div className="dp-fibonacci">
      <h3>Fibonacci Sequence</h3>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(parseInt(e.target.value))}
        min="0"
      />
      <button onClick={handleCalculate}>Calculate</button>
      <div className="dp-result">
        {result.map((num, index) => (
          <span key={index} className="dp-fib-number">{num} </span>
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

export default Fibonacci;