import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  useEffect(() => {
    const timerRun = setTimeout(() => {
      setTimeRemaining((timeRemaining) => {
        if (timeRemaining > 1) return timeRemaining - 1;
        else {
          setTimeRemaining(10);
        }
      });
    }, 1000);
    return function cleanup() {
      clearTimeout(timerRun);
    };
  }, [timeRemaining]);

  useEffect(() => {
    setTimeout(() => {
      onAnswered(false);
    }, 10000);
  }, [onAnswered]);


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
