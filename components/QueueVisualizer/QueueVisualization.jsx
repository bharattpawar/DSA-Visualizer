import React from 'react';
import './styles/QueueVisualization.css';

const QueueVisualization = ({ queue }) => {
  return (
    <div className="queue-container">
      {queue.map((item, index) => (
        <div key={index} className="queue-item">
          <span className="value">{item}</span>
          {index < queue.length - 1 && <span className="arrow">→</span>}
        </div>
      ))}
    </div>
  );
};

export default QueueVisualization;