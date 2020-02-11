import { describe } from "riteway";

import { reducer, addQuestion, getScore } from "./reducer.js";

const DEFAULT_ID = 12344556,
  DEFAULT_TIMESTAMP = 909034,
  DEFAULT_ASKEE = "Boss",
  DEFAULT_QUESTION = "Can I have a raise?",
  DEFAULT_STATUS = "Accepted";

const createState = (...questions) => questions;

const createQuestion = ({
  id = DEFAULT_ID,
  timestamp = DEFAULT_TIMESTAMP,
  askee = DEFAULT_ASKEE,
  question = DEFAULT_QUESTION,
  status = DEFAULT_STATUS
} = {}) => ({
  timestamp,
  id,
  askee,
  question,
  status
});

describe("reducer()", async assert => {
  assert({
    given: "no arguments",
    should: "return an empty array",
    actual: reducer(),
    expected: []
  });
});

describe("addQuestion()", async assert => {
  assert({
    given: "state and an addQuestion object",
    should: "return state with that question added",
    actual: reducer(
      reducer(),
      addQuestion({
        timestamp: DEFAULT_TIMESTAMP,
        askee: DEFAULT_ASKEE,
        question: DEFAULT_QUESTION,
        status: DEFAULT_STATUS,
        id: DEFAULT_ID
      })
    ),
    expected: createState(createQuestion())
  });
});

describe("getScore()", async assert => {
  const store = createState(
    createQuestion(),
    createQuestion(),
    createQuestion()
  );
  assert({
    given: "a state with 3 accepted answers",
    should: "return a score of 3",
    actual: getScore(store),
    expected: 3
  });
});
