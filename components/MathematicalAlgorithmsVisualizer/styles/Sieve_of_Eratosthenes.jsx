import React, { useState, useEffect } from 'react';
import './styles/Sieve_of_Eratosthenes.css';

const Sieve_of_Eratosthenes = ({ inputValue }) => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (inputValue) {
      const n = parseInt(inputValue, 10);
      const sieve = new Array(n + 1).fill(true);
      sieve[0] = sieve[1] = false;
      const steps = [];

      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (sieve[i]) {
          steps.push({
            message: `Marking multiples of ${i} as non-prime.`,
          });
          for (let j = i * i; j <= n; j += i) {
            sieve[j] = false;
          }
        }
      }

      const primes = sieve
        .map((isPrime, index) => (isPrime ? index : null))
        .filter((prime) => prime !== null);

      steps.push({
        message: `Prime numbers up to ${n}: ${primes.join(', ')}`,
      });

      setSteps(steps);
    }
  }, [inputValue]);

  return (
    <div className="sieve-container">
      <h2>Sieve of Eratosthenes</h2>
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

export default Sieve_of_Eratosthenes;