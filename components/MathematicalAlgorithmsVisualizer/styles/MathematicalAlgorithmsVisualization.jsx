import React from 'react';
import GCD_Euclidean from './GCD_Euclidean';
import Sieve_of_Eratosthenes from './Sieve_of_Eratosthenes';
import PrimeFactorization from './PrimeFactorization';
import './styles/MathematicalAlgorithmsVisualization.css';

const MathematicalAlgorithmsVisualization = ({ algorithm, inputValue }) => {
  const renderVisualization = () => {
    switch (algorithm) {
      case 'gcd':
        return <GCD_Euclidean inputValue={inputValue} />;
      case 'sieve':
        return <Sieve_of_Eratosthenes inputValue={inputValue} />;
      case 'prime':
        return <PrimeFactorization inputValue={inputValue} />;
      default:
        return <div>Select an algorithm to visualize</div>;
    }
  };

  return (
    <div className="visualization-container">
      {renderVisualization()}
    </div>
  );
};

export default MathematicalAlgorithmsVisualization;