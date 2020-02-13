import { connect } from "react-redux";

import { getScore } from "../src/reducers/questions-reducer";

import { App } from '../src/components/App'



const mapStateToProps = state => {
  return {
    score: getScore(state)
  };
};

// connect App to Redux store so that changes in the Redux store result in changes
// in the props to App

export default connect(mapStateToProps)(App);
