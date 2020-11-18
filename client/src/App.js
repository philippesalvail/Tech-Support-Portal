import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import ClientNewTicket from "./Components/Client/ClientNewTicket";
import ClientSignUp from "./Components/Client/ClientSignUp";
import ClientPendingTickets from "./Components/Client/ClientPendingTickets";
import ClientResolvedTickets from "./Components/Client/ClientResolvedTickets";
import ClientClientAllTickets from "./Components/Client/ClientAllTickets";
import ClientTicketDetail from "./Components/Client/ClientTicketDetail";

import SupportTicketDetail from "./Components/Support/SupportTickets/SupportTicketDetail";
import SupportAllTickets from "./Components/Support/SupportTickets/SupportAllTickets";
import SupportNewTickets from "./Components/Support/SupportTickets/SupportNewTickets";
import SupportResolvedTickets from "./Components/Support/SupportTickets/SupportResolvedTickets";
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
          <Route path="/client/signup" exact component={ClientSignUp} />
          <Route
            path="/client/portal/ticket/:ticketnumber"
            exact
            component={ClientTicketDetail}
          />
          <Route
            path="/client/portal/:username/newticket"
            exact
            component={ClientNewTicket}
          />
          <Route
            path="/client/portal/:username/pendingtickets"
            exact
            component={ClientPendingTickets}
          />
          <Route
            path="/client/portal/:username/resolvedtickets"
            exact
            component={ClientResolvedTickets}
          />
          <Route
            path="/client/portal/:username/alltickets"
            exact
            component={ClientClientAllTickets}
          />
          <Route
            path="/support/portal/:supporter/newtickets"
            exact
            component={SupportNewTickets}
          />

          <Route
            path="/support/portal/:supporter/pendingtickets"
            exact
            component={SupportPendingTickets}
          />
          <Route
            path="/support/portal/:supporter/alltickets"
            exact
            component={SupportAllTickets}
          />

          <Route
            path="/support/portal/:supporter/closedtickets"
            exact
            component={SupportResolvedTickets}
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
            path="/support/portal/:supporter/ticket/:ticketId"
            exact
            component={SupportTicketDetail}
          />
          <Route
            path="/support/portal/accounts/admin/newaccounts"
            exact
            component={SupportNewAccounts}
          />
          <Route
            path="/support/portal/accounts/admin/activeaccounts"
            exact
            component={SupportActiveAccounts}
          />
          <Route
            path="/support/portal/accounts/admin/accountdetail"
            exact
            component={SupportAccountDetail}
          />
          <Route
            path="/support/portal/accounts/admin/createaccount"
            exact
            component={SupportCreateAccount}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
