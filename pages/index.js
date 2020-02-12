import { useRef } from "react";
import { connect } from 'react-redux';

import { addQuestion, getScore } from "../src/reducers/questions-reducer";

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
      Total Score: {score}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    score: getScore(state)
  }
}

// connect App to Redux store so that changes in the Redux store result in changes
// in the props to App
export default connect(mapStateToProps)(App);
