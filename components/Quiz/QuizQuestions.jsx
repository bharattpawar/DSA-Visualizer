import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { quizData } from "./QuizData";
import QuizResult from "./QuizResult";
import "./Quiz.css";

const QuizQuestions = () => {
  const { topic } = useParams();

  // Transform the topic parameter to match the keys in quizData
  const formattedTopic = topic.replace("-", ""); // Remove hyphens
  const questions = quizData[formattedTopic] || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return <QuizResult questions={questions} userAnswers={userAnswers} />;
  }

  if (questions.length === 0) {
    return <div className="quiz-questions-container">No questions found for this topic.</div>;
  }

  return (
    <div className="quiz-questions-container">
      <h2>Question {currentQuestion + 1}</h2>
      <p>{questions[currentQuestion].question}</p>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestions;