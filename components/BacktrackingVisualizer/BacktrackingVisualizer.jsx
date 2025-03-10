import React, { useState } from 'react';
import BacktrackingVisualization from './BacktrackingVisualization';
import './styles/BacktrackingVisualizer.css';

const BacktrackingVisualizer = () => {
  const [selectedProblem, setSelectedProblem] = useState('nqueens');
  const [nQueensSize, setNQueensSize] = useState(8);
  const [sudokuBoard, setSudokuBoard] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [isSolving, setIsSolving] = useState(false);
  const [error, setError] = useState('');
  const [speed, setSpeed] = useState(500); // Default speed: 500ms

  const handleStart = () => {
    if (selectedProblem === 'nqueens' && (nQueensSize < 1 || nQueensSize > 10)) {
      setError('Board size must be between 1 and 10 for N-Queens.');
      return;
    }
    setError('');
    setIsSolving(true);
  };

  const handleStop = () => {
    setIsSolving(false);
  };

  const handleRestart = () => {
    setIsSolving(false);
    if (selectedProblem === 'sudoku') {
      setSudokuBoard(Array.from({ length: 9 }, () => Array(9).fill(0)));
    } else if (selectedProblem === 'nqueens') {
      setNQueensSize(8);
    }
    setError('');
    setSpeed(500);
  };

  return (
    <div className="btv-container">
      <h1>Backtracking Algorithm Visualizer</h1>
      <div className="btv-problem-selector">
        <label className="btv-problem-selector__label">
          <input
            type="radio"
            value="nqueens"
            checked={selectedProblem === 'nqueens'}
            onChange={() => setSelectedProblem('nqueens')}
          />
          N-Queens
        </label>
        <label className="btv-problem-selector__label">
          <input
            type="radio"
            value="sudoku"
            checked={selectedProblem === 'sudoku'}
            onChange={() => setSelectedProblem('sudoku')}
          />
          Sudoku Solver
        </label>
      </div>

      {selectedProblem === 'nqueens' && (
        <div className="btv-nqueens-input">
          <label>
            Board Size:
            <input
              type="number"
              value={nQueensSize}
              onChange={(e) => setNQueensSize(parseInt(e.target.value))}
              min="1"
              max="10"
              className="btv-nqueens-input__input"
            />
          </label>
        </div>
      )}

      {selectedProblem === 'sudoku' && (
        <div className="btv-sudoku-input">
          <h3>Enter Sudoku Board</h3>
          <div className="btv-sudoku-grid">
            {sudokuBoard.map((row, i) => (
              <div key={i} className="btv-sudoku-row">
                {row.map((cell, j) => (
                  <input
                    key={j}
                    type="number"
                    value={cell || ''}
                    onChange={(e) => {
                      const newBoard = sudokuBoard.map((row, rowIndex) => 
                        row.map((cell, colIndex) => (rowIndex === i && colIndex === j ? parseInt(e.target.value) || 0 : cell))
                      );
                      setSudokuBoard(newBoard);
                    }}
                    min="1"
                    max="9"
                    className="btv-sudoku-cell-input"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="btv-speed-control">
        <label>
          Speed:
          <input
            type="range"
            min="0"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
          <span>{speed}ms</span>
        </label>
      </div>

      {error && <div className="btv-error">{error}</div>}

      <div className="btv-buttons">
        <button onClick={handleStart} disabled={isSolving} className="btv-start-button">
          Start
        </button>
        <button onClick={handleStop} disabled={!isSolving} className="btv-stop-button">
          Stop
        </button>
        <button onClick={handleRestart} className="btv-restart-button">
          Restart
        </button>
      </div>

      <BacktrackingVisualization
        selectedProblem={selectedProblem}
        nQueensSize={nQueensSize}
        sudokuBoard={sudokuBoard}
        isSolving={isSolving}
        setIsSolving={setIsSolving}
        speed={speed}
      />
    </div>
  );
};

export default BacktrackingVisualizer;