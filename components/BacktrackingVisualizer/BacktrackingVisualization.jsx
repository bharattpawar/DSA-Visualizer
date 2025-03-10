import React, { useEffect, useState, useRef } from 'react';
import N_Queens from './N_Queens';
import Sudoku_Solver from './Sudoku_Solver';
import './styles/BacktrackingVisualization.css';

const BacktrackingVisualization = ({
  selectedProblem,
  nQueensSize,
  sudokuBoard,
  isSolving,
  setIsSolving,
  speed,
}) => {
  const [progress, setProgress] = useState('');
  const [nQueensSolution, setNQueensSolution] = useState([]);
  const [sudokuSolution, setSudokuSolution] = useState([]);
  const [message, setMessage] = useState('');
  const solvingRef = useRef(isSolving);

  // Update solvingRef whenever isSolving changes
  useEffect(() => {
    solvingRef.current = isSolving;
  }, [isSolving]);

  // Start solving when isSolving is true
  useEffect(() => {
    if (isSolving) {
      setProgress('Solving...');
      if (selectedProblem === 'nqueens') {
        solveNQueens(nQueensSize);
      } else if (selectedProblem === 'sudoku') {
        solveSudoku([...sudokuBoard.map((row) => [...row])]);
      }
    } else {
      // Reset progress and message when solving stops
      setProgress('');
      setMessage('');
    }
  }, [isSolving, selectedProblem, nQueensSize, sudokuBoard]);

  // N-Queens solver with delays for visualization
  const solveNQueens = async (n) => {
    const result = [];
    const board = Array.from({ length: n }, () => Array(n).fill(0));

    const isSafe = (board, row, col) => {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) {
          setMessage(`🚫 Conflict: Queen at row ${i}, column ${col} is attacking. Backtracking...`);
          return false;
        }
      }
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) {
          setMessage(`🚫 Conflict: Queen at row ${i}, column ${j} is attacking diagonally. Backtracking...`);
          return false;
        }
      }
      for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 1) {
          setMessage(`🚫 Conflict: Queen at row ${i}, column ${j} is attacking diagonally. Backtracking...`);
          return false;
        }
      }
      return true;
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const backtrack = async (row) => {
      if (!solvingRef.current) return; // Stop if solving is turned off

      if (row === n) {
        // Save the final solution
        result.push(board.map((row) => [...row]));
        setMessage(`✅ Solution found! All queens are placed safely.`);
        setNQueensSolution([...result]); // Update the solution state
        setIsSolving(false);
        return;
      }

      for (let col = 0; col < n; col++) {
        if (!solvingRef.current) return; // Stop if solving is turned off

        if (isSafe(board, row, col)) {
          board[row][col] = 1; // Place the queen
          setMessage(`👑 Placing queen at row ${row}, column ${col}`);
          setNQueensSolution([board.map((row) => [...row])]); // Update UI
          await sleep(speed); // Delay for visualization

          await backtrack(row + 1); // Move to the next row

          if (result.length > 0) return; // Stop if a solution is found

          board[row][col] = 0; // Remove the queen (backtrack)
          setMessage(`↩️ Backtracking: Removing queen from row ${row}, column ${col}`);
          setNQueensSolution([board.map((row) => [...row])]); // Update UI
          await sleep(speed); // Delay for visualization
        }
      }
    };

    await backtrack(0);
    setIsSolving(false); // Ensure solving is turned off after completion
  };

  // Sudoku solver with delays for visualization
  const solveSudoku = async (board) => {
    const isValid = (row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
      }
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[startRow + i][startCol + j] === num) return false;
        }
      }
      return true;
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const backtrack = async () => {
      if (!solvingRef.current) return false; // Stop if solving is turned off

      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (!solvingRef.current) return false; // Stop if solving is turned off

          if (board[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (!solvingRef.current) return false; // Stop if solving is turned off

              if (isValid(row, col, num)) {
                board[row][col] = num;
                setMessage(`🔢 Placing ${num} at row ${row + 1}, column ${col + 1}`);
                setSudokuSolution([...board.map((row) => [...row])]); // Update UI
                await sleep(speed); // Delay for visualization

                if (await backtrack()) return true;

                board[row][col] = 0; // Backtrack
                setMessage(`↩️ Backtracking: Removing ${num} from row ${row + 1}, column ${col + 1}`);
                setSudokuSolution([...board.map((row) => [...row])]); // Update UI
                await sleep(speed); // Delay for visualization
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    const solved = await backtrack();
    setIsSolving(false); // Ensure solving is turned off after completion
    setProgress(solved ? 'Sudoku Solved!' : 'No solution found');
  };

  return (
    <div className="btv-viz-container">
      <h2>Visualization</h2>
      <div className="btv-viz-progress">{progress}</div>
      <div className="btv-viz-message">{message}</div>
      {selectedProblem === 'nqueens' && (
        <N_Queens size={nQueensSize} solution={nQueensSolution} message={message} />
      )}
      {selectedProblem === 'sudoku' && <Sudoku_Solver board={sudokuSolution.length ? sudokuSolution : sudokuBoard} />}
    </div>
  );
};

export default BacktrackingVisualization;