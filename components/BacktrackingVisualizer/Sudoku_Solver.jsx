import React from 'react';
import './styles/Sudoku_Solver.css'; // Ensure the CSS file is imported

const Sudoku_Input = ({ board, handleInputChange }) => {
  return (
    <div className="btv-sudoku-input-board">
      {board.flat().map((cell, index) => (
        <div
          key={index}
          className={`btv-sudoku-input-cell ${cell !== 0 ? 'btv-sudoku-cell--fixed' : ''}`}
        >
          {cell !== 0 ? (
            cell
          ) : (
            <input
              type="text"
              maxLength="1"
              value=""
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="btv-sudoku-input"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Sudoku_Input;