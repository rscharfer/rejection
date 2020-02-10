import { describe } from 'riteway'

import { reducer, addQuestion } from './reducer.js'

const createState = (...questions) => questions

const createQuestion = ({ id = 12344556, timestamp = 909034, askee, question, status}) => ({ 
  timestamp,
  id,
  askee,
  question,
  status
})

describe('reducer()', async assert=>{
  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: reducer(),
    expected: []
  })
  assert({
    given: 'ADD_QUESTION action obect',
    should: 'return the state with that question added',
    actual: reducer(reducer(), addQuestion({
      id: 12344556,
      timestamp: 909034,
      question: 'Can I have a raise',
      askee: 'boss',
      status: 'yes'
    })),
    expected: createState(createQuestion({ askee: 'boss', question:'Can I have a raise', status:'yes'}))
  })
})