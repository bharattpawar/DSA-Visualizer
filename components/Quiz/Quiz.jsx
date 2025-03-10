import React from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const dataStructures = ["Arrays", "LinkedLists", "Stacks", "Queues", "Trees", "Graphs"];

  return (
    <div className="quiz-container">
      <h1>Choose a Data Structure to Start the Quiz</h1>
      <div className="data-structure-list">
        {dataStructures.map((ds, index) => (
          <Link key={index} to={`/quiz/${ds.toLowerCase()}`} className="ds-card">
            {ds}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Quiz;