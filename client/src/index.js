import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter as Router} from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0-provider-with-history";
import configureStore from "./store";
import {Provider} from "react-redux";

// Step 1, need a store globalized state

// Step 2, action - describe what you want to do

// reducer - describes how your actions transform your state to the next state

// dispatch - execute the action

const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0ProviderWithHistory>
  </Router>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
