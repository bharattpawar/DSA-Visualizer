import React, { useState, useEffect } from 'react';
import './styles/PrimeFactorization.css';

const PrimeFactorization = ({ inputValue }) => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (inputValue) {
      const number = parseInt(inputValue, 10);
      const factors = [];
      let n = number;
      const steps = [];

      while (n % 2 === 0) {
        factors.push(2);
        steps.push({
          message: `Divide by 2: ${n} / 2 = ${n / 2}`,
        });
        n = n / 2;
      }

      for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
          factors.push(i);
          steps.push({
            message: `Divide by ${i}: ${n} / ${i} = ${n / i}`,
          });
          n = n / i;
        }
      }

      if (n > 2) {
        factors.push(n);
        steps.push({
          message: `Remaining prime factor: ${n}`,
        });
      }

      steps.push({
        message: `Prime factors of ${number}: ${factors.join(' × ')}`,
      });

      setSteps(steps);
    }
  }, [inputValue]);

  return (
    <div className="prime-factorization-container">
      <h2>Prime Factorization</h2>
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

export default PrimeFactorization;