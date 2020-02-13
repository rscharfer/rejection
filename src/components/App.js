import React, { useRef } from "react";
import { addQuestion } from '../reducers/questions-reducer'



const App = ({ score, dispatch }) => {
  const questionInput = useRef(null);
  const askeeInput = useRef(null);

  const handler = status => () => {
    const question = questionInput.current.value;
    const askee = askeeInput.current.value;
    dispatch(
      addQuestion({
        askee,
        question,
        status
      })
    );
    questionInput.current.value = "";
    askeeInput.current.value = "";
  };
  return (
    <>
      Question: <input ref={questionInput} type="text" />
      Askee: <input ref={askeeInput} type="text" />
      <button id="acceptButton" onClick={handler("Accepted")}>
        Accepted
      </button>
      <button id="rejectButton" onClick={handler("Rejected")}>
        Rejected
      </button>
      Total Score: <span id="score">{score}</span>
    </>
  );
};


export { App }