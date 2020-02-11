import cuid from "cuid";

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case addQuestion.type:
      return [...state, action.payload];
    default:
      return state;
  }
};

// addQuestion action creator
const addQuestion = ({
  timestamp = Date.now(),
  id = cuid(),
  askee,
  question,
  status
}) => ({
  type: addQuestion.type,
  payload: {
    timestamp,
    id,
    askee,
    question,
    status
  }
});

addQuestion.type = "ADD_QUESTION";

const getScore = state => {
  return state.reduce((acc, next) => {
    if (next.status === "Accepted") return acc + 1;
    else if (next.status === "Rejected") return acc + 10;
    else return acc;
  }, 0);
};

export { reducer, addQuestion, getScore };
