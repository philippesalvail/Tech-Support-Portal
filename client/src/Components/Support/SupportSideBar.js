import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

import {
  NewTicketIcon,
  HistoryIcon,
  PendingIcon,
  ClosedIcon,
} from "../../ReactIcons";

function SupportSideBar() {
  return (
    <Side>
      <SideLink strict to={"/support/portal/newtickets"}>
        <NewTicketIcon />
        <CreateNew>View New</CreateNew>
      </SideLink>
      <SideLink strict to={"/support/portal/pendingtickets"}>
        <PendingIcon />
        <ViewPending>View Pending</ViewPending>
      </SideLink>
      <SideLink strict to={"/support/portal/closedtickets"}>
        <HistoryIcon />
        <ViewHistory>View Resolved</ViewHistory>
      </SideLink>
      <SideLink strict to={"/support/portal/alltickets"}>
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

export default SupportSideBar;
