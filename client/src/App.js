import React from "react";
import HomePage from "./Components/HomePage/HomePage";
import ClientTicket from "./Components/Client/ClientTicket";
import SignUp from "./Components/Client/SignUp";
import PendingTickets from "./Components/Client/PendingTickets";
import ClosedTickets from "./Components/Client/ClosedTickets";
import AllTickets from "./Components/Client/AllTickets";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/client/signup" component={SignUp} />
          <Route
            path="/client/portal/newticket"
            exact
            component={ClientTicket}
          />
          <Route
            path="/client/portal/pendingtickets"
            exact
            component={PendingTickets}
          />
          <Route
            path="/client/portal/closedtickets"
            exact
            component={ClosedTickets}
          />
          <Route
            path="/client/portal/alltickets"
            exact
            component={AllTickets}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
