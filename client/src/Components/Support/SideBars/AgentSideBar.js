import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

import {NewTicketIcon, PendingIcon} from "../../../ReactIcons";

function AgentSideBar(props) {
  const {username} = props;
  return (
    <Side>
      <TitleLbl>Tickets</TitleLbl>
      <SideLink strict to={`/support/portal/${username}/newtickets`}>
        <IconImg>
          <NewTicketIcon />
        </IconImg>
        <LinkSelection>Assigned To Me</LinkSelection>
      </SideLink>
      <SideLink strict to={`/support/portal/${username}/pendingtickets`}>
        <IconImg>
          <PendingIcon />
        </IconImg>
        <LinkSelection>Team Queue</LinkSelection>
      </SideLink>
    </Side>
  );
}
const IconImg = styled.div`
  flex: 1;
`;

const TitleLbl = styled.h3`
  text-decoration: underline;
  padding-left: 5%;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  color: #f1faee;
  background-color: #457b9d;
  flex: 1;
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
const PaddedLink = styled.span`
  font-weight: bold;
`;
const LinkSelection = styled(PaddedLink)`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export default AgentSideBar;
