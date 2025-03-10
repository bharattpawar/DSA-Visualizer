import React from "react";
import "./Quiz.css";

const QuizResult = ({ questions, userAnswers }) => {
  const score = questions.reduce((acc, question, index) => {
    return acc + (question.answer === userAnswers[index] ? 1 : 0);
  }, 0);

  return (
    <div className="quiz-result-container">
      <h1>Quiz Result</h1>
      <p>You scored {score} out of {questions.length}.</p>
      <div className="review-section">
        {questions.map((question, index) => (
          <div key={index} className="question-review">
            <p><strong>Question {index + 1}:</strong> {question.question}</p>
            <p><strong>Your Answer:</strong> {userAnswers[index]}</p>
            <p><strong>Correct Answer:</strong> {question.answer}</p>
            {userAnswers[index] !== question.answer && (
              <p><strong>Explanation:</strong> {question.explanation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizResult;