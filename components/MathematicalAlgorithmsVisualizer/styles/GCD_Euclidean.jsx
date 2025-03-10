import React, { useState, useEffect } from 'react';
import './styles/GCD_Euclidean.css';

const GCD_Euclidean = ({ inputValue }) => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (inputValue) {
      const [a, b] = inputValue.split(',').map(Number);

      if (isNaN(a) || isNaN(b)) {
        setSteps([{ message: 'Invalid input. Please enter two numbers separated by a comma.' }]);
        return;
      }

      const steps = [];
      let x = a;
      let y = b;

      while (y !== 0) {
        steps.push({
          x,
          y,
          message: `Compute GCD(${x}, ${y}): ${x} % ${y} = ${x % y}`,
        });
        const temp = y;
        y = x % y;
        x = temp;
      }

      steps.push({
        x,
        y,
        message: `GCD is ${x}`,
      });

      setSteps(steps);
    }
  }, [inputValue]);

  return (
    <div className="gcd-container">
      <h2>GCD (Euclidean Algorithm)</h2>
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <p>{step.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GCD_Euclidean;