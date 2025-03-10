import React from 'react';
import './styles/StackVisualization.css';

const StackVisualization = ({ stack }) => {
  return (
    <div className="stack-container">
      {stack.map((item, index) => (
        <div key={index} className="stack-item">
          {item}
        </div>
      ))}
    </div>
  );
};

export default StackVisualization;