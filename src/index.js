import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { App } from "./components/App.js";
import { questionsReducer, getScore } from "./reducers/questions-reducer";


// redux setup with the reducer
// listen for store changes with store.subscribe
// render component in index.html

const store = createStore(questionsReducer);

// we are passing store.disptach into the app manually.. can we map dispatch to props so that we dont have to do this manually?
const getApp = () => <App dispatch={store.dispatch} score={getScore(store.getState())}/>

store.subscribe(() =>
  ReactDOM.render(
    getApp(),
    document.querySelector("#app")
  )
);

ReactDOM.render(
  getApp(),
  document.querySelector("#app")
);
