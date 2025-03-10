import React from 'react';
import './styles/N_Queens.css';

const N_Queens = ({ size, solution, message }) => {
  return (
    <div className="btv-nqueens-container">
      <div className="btv-nqueens-board" style={{ gridTemplateColumns: `repeat(${size}, 40px)` }}>
        {solution.length > 0 &&
          solution[0].map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`btv-nqueens-cell ${cell === 1 ? 'btv-nqueens-cell--queen' : ''}`}
              >
                {cell === 1 ? '👑' : ''}
              </div>
            ))
          )}
      </div>
      <div className="btv-nqueens-message">
        <h3>How It Works:</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default N_Queens;