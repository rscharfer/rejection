import { describe } from "riteway";
import cuid from "cuid";

import {
  questionReducer, // reducer: questions
  addQuestion, // action creator: addQuestion
  editQuestion, // action creator: editQuestion
  getPoints
} from "./reducers";

const createState = (...questions) => [...questions];

const createQuestion = ({
  askee = "gardener",
  question = "can I have a flower?",
  status = "Rejected",
  timeStamp = TIME_STAMP,
  id = "acadsfad"
} = {}) => ({
  askee,
  question,
  status,
  timeStamp,
  id
});
const TIME_STAMP = 123244;

describe("questionReducer", async assert => {
  assert({
    given: "no arguments",
    should: "return valid default state",
    actual: questionReducer(),
    expected: createState()
  });

  assert({
    given: "unhandled action",
    should: "return previous state",
    actual: questionReducer(questionReducer(), { type: "unhandled" }),
    expected: createState()
  });

  {
    const GIVEN = "an ADD_QUESTION action";
    const SHOULD = "return state with the question added";
    const id = cuid();
    const timeStamp = Date.now();
    const questionActionObject = addQuestion({
      question: "Will you marry me?",
      askee: "girlfriend",
      status: "Rejected",
      id,
      timeStamp
    });
    const expectedState = createState(
      createQuestion({
        question: "Will you marry me?",
        askee: "girlfriend",
        status: "Rejected",
        id,
        timeStamp
      })
    );
    assert({
      given: GIVEN,
      should: SHOULD,
      actual: questionReducer(questionReducer(), questionActionObject),
      expected: expectedState
    });
  }

  {
    const GIVEN = "an EDIT_QUESTION object with a changed question";
    const SHOULD = "return state with the changed question";
    const id = cuid();
    const timeStamp = Date.now();
    const oldQuestion = "Can I borrow your typewriter?";
    const newQuestion = "Can I borrow your computer?";
    const expectedState = createState(
      createQuestion({
        id,
        timeStamp,
        question: newQuestion
      })
    );
    const editQuestionActionObject = editQuestion({
      id,
      question: newQuestion
    });

    const actualState = questionReducer(
      createState(createQuestion({ id, timeStamp, question: oldQuestion })),
      editQuestionActionObject
    );

    assert({
      given: GIVEN,
      should: SHOULD,
      actual: actualState,
      expected: expectedState
    });
  }
});

describe("getPoints", async assert => {
  assert({
    given: "a state with one accepted and one rejected question",
    should: "return the correct number of points",
    actual: getPoints(
      createState(
        createQuestion({ status: "Accepted" }),
        createQuestion({ status: "Rejected" })
      )
    ),
    expected: 11
  });
});
