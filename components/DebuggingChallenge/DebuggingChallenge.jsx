import React, { useState } from "react";
import { debuggingData } from "./DebuggingData";
import DebuggingHint from "./DebuggingHint";
import "./DebuggingChallenge.css";

const DebuggingChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userSolution, setUserSolution] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHints, setShowHints] = useState(false);

  const challenge = debuggingData[currentChallenge];

  const handleCheckSolution = () => {
    const isSolutionCorrect =
      userSolution.trim() === challenge.solution.trim();
    setIsCorrect(isSolutionCorrect);
  };

  const handleNextChallenge = () => {
    setCurrentChallenge((prev) => (prev + 1) % debuggingData.length);
    setUserSolution("");
    setIsCorrect(null);
    setShowHints(false);
  };

  return (
    <div className="debugging-challenge-container">
      <h1>Debugging Challenge</h1>
      <div className="challenge-description">
        <p>{challenge.description}</p>
      </div>
      <div className="code-snippet">
        <pre>
          <code>{challenge.code}</code>
        </pre>
      </div>
      <div className="user-solution">
        <textarea
          placeholder="Fix the code here..."
          value={userSolution}
          onChange={(e) => setUserSolution(e.target.value)}
        />
      </div>
      <div className="actions">
        <button onClick={handleCheckSolution}>Check Solution</button>
        <button onClick={() => setShowHints(!showHints)}>
          {showHints ? "Hide Hints" : "Show Hints"}
        </button>
        <button onClick={handleNextChallenge}>Next Challenge</button>
      </div>
      {isCorrect !== null && (
        <div className={`result ${isCorrect ? "correct" : "incorrect"}`}>
          {isCorrect ? "✅ Correct!" : "❌ Incorrect. Try again!"}
        </div>
      )}
      {showHints && <DebuggingHint hints={challenge.hints} />}
    </div>
  );
};

export default DebuggingChallenge;