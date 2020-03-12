import cuid from "cuid";
export const questions = (state = [], action = {}) => {
  switch (action.type) {
    case addQuestion.type:
      return [...state, action.payload];
    case editQuestion.type: {
      const { id, ...rest } = action.payload; 
      return state.map(questionObj => {
        return questionObj.id === id
          ? { ...questionObj, ...rest}
          : questionObj;
      });
    }
    default:
      return state;
  }
};



export const addQuestion = ({
  question,
  askee,
  status,
  timeStamp = Date.now(),
  id = cuid()
} = {}) => ({
  type: addQuestion.type,
  payload: {
    question,
    askee,
    status,
    timeStamp,
    id,
  }
});
addQuestion.type = "ADD_QUESTION";


export const editQuestion = (payload) => ({
  type: editQuestion.type,
  payload
});
editQuestion.type = "EDIT_QUESTION";

