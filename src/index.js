import React, { Fragment, useRef } from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { reducer, addQuestion, getScore } from "./reducer";

const store = createStore(reducer);

store.dispatch(
  addQuestion({
    askee: "dog",
    question: "can you grab me a beer?",
    status: "Accepted"
  })
);

store.dispatch(
  addQuestion({
    askee: "dog",
    question: "can you grab me a beer?",
    status: "Accepted"
  })
);

const App = ({ state, getScore }) => {
  const questionInput = useRef(null);
  const askeeInput = useRef(null);

  const handler = status => event => {
    const question = questionInput.current.value;
    const askee = askeeInput.current.value;
    store.dispatch(addQuestion({
      askee,
      question,
      status
    }))
    questionInput.current.value = '';
    askeeInput.current.value = '';
  }
  return (
    <>
      Question: <input ref={questionInput} type="text" />
      Askee: <input ref={askeeInput} type="text" />
      <button id='acceptButton' onClick={handler('Accepted')}>Accepted</button>
      <button id='rejectButton' onClick={handler('Rejected')}>Rejected</button>
      Total Score: {getScore(state)}
    </>
  );
};

store.subscribe(() =>
  ReactDOM.render(
    <App state={store.getState()} getScore={getScore} />,
    document.querySelector("#app")
  )
);

ReactDOM.render(
  <App state={store.getState()} getScore={getScore} />,
  document.querySelector("#app")
)
