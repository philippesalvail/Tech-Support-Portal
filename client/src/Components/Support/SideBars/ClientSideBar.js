import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

import {
  NewTicketIcon,
  HistoryIcon,
  PendingIcon,
  ClosedIcon,
} from "../../ReactIcons";

function ClientSideBar() {
  return (
    <Side>
      <SideLink strict to={"/client/portal/:customerEmailAddress/newticket"}>
        <NewTicketIcon />
        <CreateNew>Create New</CreateNew>
      </SideLink>
      <SideLink
        strict
        to={"/client/portal/:customerEmailAddress/pendingtickets"}
      >
        <PendingIcon />
        <ViewPending>View Pending</ViewPending>
      </SideLink>
      <SideLink
        strict
        to={"/client/portal/:customerEmailAddress/closedtickets"}
      >
        <HistoryIcon />
        <ViewHistory>View History</ViewHistory>
      </SideLink>
      <SideLink strict to={"/client/portal/:customerEmailAddress/alltickets"}>
        <ClosedIcon />
        <ViewAll>View All</ViewAll>
      </SideLink>
    </Side>
  );
}

const Side = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const SideLink = styled(NavLink)`
  display: flex;
  padding-left: 2%;
`;
const PaddedLink = styled.span`
  font-weight: bold;
  padding: 5%;
`;
const CreateNew = styled(PaddedLink)``;
const ViewPending = styled(PaddedLink)``;
const ViewHistory = styled(PaddedLink)``;
const ViewAll = styled(PaddedLink)``;

export default ClientSideBar;
