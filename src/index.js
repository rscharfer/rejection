import React, { Fragment } from "react";
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { reducer } from './reducer'

const store = createStore(reducer);





const App = props => {

  return (
    <>
      Question: <input type="text"/>
      <button>Accepted</button>
      <button>Rejected</button>
      Total Score: 5
    </>
  )
}




ReactDOM.render(<App/>, document.querySelector('#app'))
