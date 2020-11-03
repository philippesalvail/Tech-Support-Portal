import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import AccountSideBar from "./AccountSideBar";

import {
  NewTicketIcon,
  HistoryIcon,
  PendingIcon,
  ClosedIcon,
} from "../../../ReactIcons";

function SupportSideBar() {
  return (
    <Side>
      <SideLbl>Tickets</SideLbl>
      <SideLink strict to={"/support/portal/agent/newtickets"}>
        <NewTicketIcon />
        <CreateNew>View New</CreateNew>
      </SideLink>
      <SideLink strict to={"/support/portal/agent/pendingtickets"}>
        <PendingIcon />
        <ViewPending>View Pending</ViewPending>
      </SideLink>
      <SideLink strict to={"/support/portal/agent/closedtickets"}>
        <HistoryIcon />
        <ViewHistory>View Resolved</ViewHistory>
      </SideLink>
      <SideLink strict to={"/support/portal/agent/alltickets"}>
        <ClosedIcon />
        <ViewAll>View All</ViewAll>
      </SideLink>
      <SideLbl>Accounts</SideLbl>
      <AccountSideBar />
    </Side>
  );
}
const SideLbl = styled.h3`
  text-decoration: underline;
  padding-left: 5%;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 1%;
`;
const SideLink = styled(NavLink)`
  display: flex;
  padding-left: 7%;
`;
const PaddedLink = styled.span`
  font-weight: bold;
  padding: 5%;
`;
const CreateNew = styled(PaddedLink)``;
const ViewPending = styled(PaddedLink)``;
const ViewHistory = styled(PaddedLink)``;
const ViewAll = styled(PaddedLink)``;

export default SupportSideBar;
