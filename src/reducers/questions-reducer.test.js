import { describe } from "riteway";

// reducer , actionCreator, and selector all in same file?
import { questionsReducer, addQuestion, getScore } from "./questions-reducer";

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

describe("questionsReducer()", async assert => {
  assert({
    given: "no arguments",
    should: "return an empty array",
    actual: questionsReducer(),
    expected: []
  });
});

describe("questionsReducer()", async assert => {
  assert({
    given: "current state and an addQuestion object",
    should: "return state with that question added",
    actual: questionsReducer(
      questionsReducer(),
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
  {
    const store = createState(
      createQuestion(),
      createQuestion(),
      createQuestion()
    );
    assert({
      given: "a state with 3 accepted asks",
      should: "return a score of 3",
      actual: getScore(store),
      expected: 3
    });
  }
  {
    const store = createState(
      createQuestion(),
      createQuestion(),
      createQuestion(),
      createQuestion({status: 'Rejected'})
    );
    assert({
      given: "a state with 3 accepted asks and 1 rejected ask",
      should: "return a score of 13",
      actual: getScore(store),
      expected: 13
    });
  }
  {
    const store = createState(
      createQuestion(),
      createQuestion(),
      createQuestion(),
      createQuestion({status: 'Unanswered'})
    );
    assert({
      given: "a state with 3 accepted asks and 1 unanswered ask",
      should: "return a score of 3",
      actual: getScore(store),
      expected: 3
    });
  }
  {
    const store = createState();
    assert({
      given: "a state with 0 questions",
      should: "return a score of 0",
      actual: getScore(store),
      expected: 0
    });
  }
  
});


