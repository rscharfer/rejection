import cuid from "cuid";

export const questionReducer = (state = [], action = {}) => {
  const { type, payload } = action;
  switch(type) {
    case addQuestion.type: return [...state, action.payload];
    case editQuestion.type:
      return state.map(question => {
        const { id, ...rest} = action.payload;
        return question.id === id ? {...question, ...rest} : question
      } )
    default: return state;
  }
};


export const addQuestion = ({
  question,
  askee,
  status,
  id = cuid(),
  timeStamp = Date.now()
}) => ({
  type: addQuestion.type,
  payload:{
    question,
    askee,
    status,
    id,
    timeStamp
  }
})

addQuestion.type = 'ADD_QUESTION';

export const editQuestion = (payload) => ({
  type: editQuestion.type,
  payload
})

editQuestion.type = 'EDIT_QUESTION';


export const getPoints = state => state.reduce((acc, next) => {
  switch(next.status){
    case 'Accepted' : return acc + 1;
    case 'Rejected' : return acc + 10;
    default: return acc;
  }
}, 0) 