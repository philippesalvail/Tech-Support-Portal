import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import ClientTicket from "./Components/Client/ClientTicket";
import SignUp from "./Components/Client/SignUp";
import PendingTickets from "./Components/Client/PendingTickets";
import ClosedTickets from "./Components/Client/ClosedTickets";
import ClientAllTickets from "./Components/Client/ClientAllTickets";
import SupportPendingTickets from "./Components/Support/SupportPendingTickets";
import SupportTicketDetail from "./Components/Support/SupportTicketDetail";
import SupportAllTickets from "./Components/Support/SupportAllTickets";
import SupportNewTickets from "./Components/Support/SupportNewTickets";
import SupportClosedTickets from "./Components/Support/SupportClosedTickets";
import SupportSignUpPage from "./Components/Support/SupportSignUpPage";
import SupportLoginPage from "./Components/Support/SupportLoginPage";

import SupportNewAccounts from "./Components/Support/SupportNewAccounts";
import SupportAllAccounts from "./Components/Support/SupportAllAccounts";
import SupportTeamAccounts from "./Components/Support/SupportTeamAccounts";

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
            component={ClientAllTickets}
          />

          <Route
            path="/support/portal/newtickets"
            exact
            component={SupportNewTickets}
          />
          <Route
            path="/support/portal/pendingtickets"
            exact
            component={SupportPendingTickets}
          />
          <Route
            path="/support/portal/alltickets"
            exact
            component={SupportAllTickets}
          />

          <Route
            path="/support/portal/closedtickets"
            exact
            component={SupportClosedTickets}
          />
          <Route
            path="/support/portal/supportsignuppage"
            exact
            component={SupportSignUpPage}
          />
          <Route
            path="/support/portal/supportloginpage"
            exact
            component={SupportLoginPage}
          />

          <Route
            path="/support/portal/ticket/:ticketId"
            exact
            component={SupportTicketDetail}
          />
          <Route
            path="/support/portal/accounts/newaccounts"
            exact
            component={SupportNewAccounts}
          />
          <Route
            path="/support/portal/accounts/allaccounts"
            exact
            component={SupportAllAccounts}
          />
          <Route
            path="/support/portal/accounts/teamaccounts"
            exact
            component={SupportTeamAccounts}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
