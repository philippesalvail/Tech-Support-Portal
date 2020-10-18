import React from "react";
import HomePage from "./Components/HomePage/HomePage";
import ClientPage from "./Components/Client/ClientDirection";
import SignUp from "./Components/Client/SignUp";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/client/portal/:username" component={ClientPage} />
          <Route path="/client/signup" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
