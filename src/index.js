import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import TweetList from "./component/TweetList";
import SearchTweet from "./component/TweetSearch";
import App from "./component/App";
import "./styles.css";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
