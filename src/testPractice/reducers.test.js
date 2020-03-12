import { describe } from "riteway";
import cuid from "cuid";

import {
  questions, // reducer: questions
  addQuestion, // action creator: addQuestion
  editQuestion // action creator: editQuestion
} from "./reducers";

import { getPoints } from "./selectors";

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

describe("questions()", async assert => {
  assert({
    given: "no arguments",
    should: "returns an empty array",
    actual: questions(),
    expected: []
  });

  // ADD_QUESTION
  assert({
    given: "state and 'ADD_QUESTION' action",
    should: "return state with new question",
    actual: questions(
      questions(),
      addQuestion({
        askee: "gardener",
        question: "Can I have a flower?",
        status: "Rejected",
        timeStamp: TIME_STAMP,
        id: "acadsfad"
      })
    ),
    expected: createState(
      createQuestion({
        askee: "gardener",
        question: "Can I have a flower?",
        status: "Rejected",
        timeStamp: TIME_STAMP,
        id: "acadsfad"
      })
    )
  });

  // adding a stream of objects
  {
    const actionObjects = [
      addQuestion({
        id: "acadsfad",
        timeStamp: TIME_STAMP,
        askee: "teacher",
        question: "Can I have a flower?",
        status: "Rejected"
      }),
      addQuestion({
        id: "sddfs",
        timeStamp: TIME_STAMP,
        askee: "gardener",
        question: "Can I have a flower?",
        status: "Accepted"
      }),
      addQuestion({
        id: "ffsdf",
        timeStamp: TIME_STAMP,
        askee: "mailman",
        question: "Can I have a flower?",
        status: "Rejected"
      })
    ];
    let expectedState = createState(
      createQuestion({
        id: "acadsfad",
        timeStamp: TIME_STAMP,
        askee: "teacher",
        question: "Can I have a flower?",
        status: "Rejected"
      }),
      createQuestion({
        id: "sddfs",
        timeStamp: TIME_STAMP,
        askee: "gardener",
        question: "Can I have a flower?",
        status: "Accepted"
      }),
      createQuestion({
        id: "ffsdf",
        timeStamp: TIME_STAMP,
        askee: "mailman",
        question: "Can I have a flower?",
        status: "Rejected"
      })
    );
    let state = questions();
    actionObjects.forEach(ao => {
      state = questions(state, ao);
    });
    assert({
      given: "given a stream of action objects",
      should: "return correct looking state",
      actual: state,
      expected: expectedState
    });
  }

  // unhandled action
  {
    const q1 = createQuestion({ askee: "swimmer" });
    const q2 = createQuestion({ askee: "mailman" });
    const initialstate = createState(q1, q2);
    assert({
      given: "an action the reducer does not handle",
      should: "returns the initial state",
      actual:
        initialstate /* The questions reducer does not handle change question actions*/ ===
        questions(initialstate, {
          type: "ADD_POINTS",
          payload: { pointsToAdd: 7 }
        }),
      expected: true
    });
  }

  {
    const id = cuid();
    assert({
      given: "an editQuestion action",
      should: "the right state is returned",
      actual: questions(
        createState(createQuestion({ askee: "swimmer", id })),
        editQuestion({
          id,
          askee: "mailman",
        })
      ),
      expected: createState(createQuestion({ askee: "mailman", id }))
    });
    assert({
      given: "an editQuestion action",
      should: "the right state is returned",
      actual: questions(
        createState(createQuestion({ question: "Will you grab me a Coke?", id })),
        editQuestion({
          id,
          question: "Will you grab me a Pepsi?",
        })
      ),
      expected: createState(createQuestion({ question: "Will you grab me a Pepsi?", id }))
    });
  }
});

describe("getPoints", async assert => {
  const state = createState(
    createQuestion({ status: "Accepted" }),
    createQuestion({ status: "Rejected" }),
    createQuestion({ status: "Unanswered" })
  );
  assert({
    given: "the state",
    should: "return the correct score",
    actual: getPoints(state),
    expected: 11
  });
});
