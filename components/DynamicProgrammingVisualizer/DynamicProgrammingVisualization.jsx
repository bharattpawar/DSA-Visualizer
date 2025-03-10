import React from 'react';
import Fibonacci from './Fibonacci';
import Knapsack from './Knapsack';
import LCS from './LCS';
import LIS from './LIS';
import "./styles4.css"

function DynamicProgrammingVisualization() {
  return (
    <div className="dp-visualization">
      <h2>Dynamic Programming Algorithms</h2>
      <Fibonacci />
      <Knapsack />
      <LCS />
      <LIS />
    </div>
  );
}

export default DynamicProgrammingVisualization;