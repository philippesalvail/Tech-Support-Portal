import React from "react";
import HomePage from "./Components/HomePage/HomePage";
import ClientPortal from "./Components/Client/ClientPortal";
import SignUp from "./Components/Client/SignUp";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/client/signup" component={SignUp} />
          <Route
            path="/client/portal/:nickname"
            exact
            component={ClientPortal}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
