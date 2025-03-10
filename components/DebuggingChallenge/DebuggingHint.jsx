import React, { useState } from "react";
import "./DebuggingChallenge.css";

const DebuggingHint = ({ hints }) => {
  const [currentHint, setCurrentHint] = useState(0);

  const handleNextHint = () => {
    setCurrentHint((prev) => (prev + 1) % hints.length);
  };

  return (
    <div className="hint-container">
      <h3>Hint {currentHint + 1}</h3>
      <p>{hints[currentHint]}</p>
      <button onClick={handleNextHint}>Next Hint</button>
    </div>
  );
};

export default DebuggingHint;