import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

import {
  NewTicketIcon,
  HistoryIcon,
  PendingIcon,
  ClosedIcon,
} from "../../../ReactIcons";

function ClientSideBar({username}) {
  return (
    <Side>
      <TitleLbl>Tickets</TitleLbl>
      <SideLink strict to={`/client/portal/${username}/newticket`}>
        <IconImg>
          <NewTicketIcon />
        </IconImg>
        <LinkSelection>Create New</LinkSelection>
      </SideLink>
      <SideLink strict to={`/client/portal/${username}/pendingtickets`}>
        <IconImg>
          <PendingIcon />
        </IconImg>
        <LinkSelection>View Pending</LinkSelection>
      </SideLink>
      <SideLink strict to={"/client/portal/:username/closedtickets"}>
        <IconImg>
          <HistoryIcon />
        </IconImg>
        <LinkSelection>View History</LinkSelection>
      </SideLink>
      <SideLink strict to={"/client/portal/:username/alltickets"}>
        <IconImg>
          <ClosedIcon />
        </IconImg>
        <LinkSelection>View All</LinkSelection>
      </SideLink>
    </Side>
  );
}
const IconImg = styled.div`
  flex: 1;
`;
const PaddedLink = styled.span`
  font-weight: bold;
`;

const LinkSelection = styled(PaddedLink)`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  color: #f1faee;
  background-color: #457b9d;
  flex: 1;
`;
const TitleLbl = styled.h3`
  text-decoration: underline;
  padding-left: 5%;
`;
const SideLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  color: #f1faee;
  padding-left: 5%;
  padding-top: 2%;
  padding-bottom: 2%;
  &:hover {
    background-color: #e63946;
  }
`;

export default ClientSideBar;
