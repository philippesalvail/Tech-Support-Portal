import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import ClientTicket from "./Components/Client/ClientTicket";
import SignUp from "./Components/Client/SignUp";
import PendingTickets from "./Components/Client/PendingTickets";
import ClosedTickets from "./Components/Client/ClosedTickets";
import ClientAllTickets from "./Components/Client/ClientAllTickets";

import SupportTicketDetail from "./Components/Support/SupportTickets/SupportTicketDetail";
import SupportAllTickets from "./Components/Support/SupportTickets/SupportAllTickets";
import SupportNewTickets from "./Components/Support/SupportTickets/SupportNewTickets";
import SupportClosedTickets from "./Components/Support/SupportTickets/SupportClosedTickets";
import SupportPendingTickets from "./Components/Support/SupportTickets/SupportPendingTickets";

import SupportTeamTickets from "./Components/Support/SupportTickets/SupportTeamTickets";
import SupportSignUpPage from "./Components/Support/SupportSignUpPage";
import SupportLoginPage from "./Components/Support/SupportLoginPage";
import SupportNewAccounts from "./Components/Support/SupportAccounts/SupportNewAccounts";
import SupportActiveAccounts from "./Components/Support/SupportAccounts/SupportActiveAccounts";
import SupportTeamAccounts from "./Components/Support/SupportAccounts/SupportTeamAccounts";
import SupportAccountDetail from "./Components/Support/SupportAccounts/SupportAccountDetail";
import SupportCreateAccount from "./Components/Support/SupportAccounts/SupportCreateAccount";

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
            path="/support/portal/admin/newtickets"
            exact
            component={SupportNewTickets}
          />

          <Route
            path="/support/portal/admin/pendingtickets"
            exact
            component={SupportPendingTickets}
          />
          <Route
            path="/support/portal/admin/alltickets"
            exact
            component={SupportAllTickets}
          />

          <Route
            path="/support/portal/admin/closedtickets"
            exact
            component={SupportClosedTickets}
          />
          <Route
            path="/support/portal/admin/teamtickets/:teamtickets"
            exact
            component={SupportTeamTickets}
          />
          <Route
            path="/support/portal/admin/teamaccounts/:teamaccounts"
            exact
            component={SupportTeamAccounts}
          />
          <Route
            path="/support/portal/agent/supportsignuppage"
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
            path="/support/portal/accounts/activeaccounts"
            exact
            component={SupportActiveAccounts}
          />
          <Route
            path="/support/portal/accounts/accountdetail"
            exact
            component={SupportAccountDetail}
          />
          <Route
            path="/support/portal/accounts/createaccount"
            exact
            component={SupportCreateAccount}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
