import { createStore } from "redux";
import { Provider } from "react-redux";

import { questionsReducer } from "../src/reducers/questions-reducer";

function MyApp({ Component, pageProps }) {
  // wrap every 'page' component with <Provider/> so that it can connect to the Redux store
  return (
    <Provider store={createStore(questionsReducer)}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
