import React from "react";
import HomePage from "./Components/HomePage/HomePage";
import ClientTicket from "./Components/Client/ClientTicket";
import SignUp from "./Components/Client/SignUp";
import PendingTickets from "./Components/Client/PendingTickets";
import ClosedTickets from "./Components/Client/ClosedTickets";
import AllTickets from "./Components/Client/AllTickets";
import SupportPortal from "./Components/Support/SupportPortal";
import SupportPendingTickets from "./Components/Support/SupportPendingTickets";
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
          <Route path="/support/portal" exact component={SupportPortal} />
          <Route
            path="/support/portal/pendingtickets"
            exact
            component={SupportPendingTickets}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
