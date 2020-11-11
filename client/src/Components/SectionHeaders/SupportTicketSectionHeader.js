import React from "react";
import styled from "styled-components";
import LogOutButton from "../LogButtons/logout-button";

function SupportTicketSectionHeader() {
  return (
    <TicketHeader>
      <Header>Name</Header>
      <Header>Description</Header>
      <Header>Priority</Header>
      <Header>State</Header>
      <Header>Group</Header>
      <Header>Assignee</Header>
    </TicketHeader>
  );
}

const TicketHeader = styled.div`
  display: flex;
  padding-left: 1%;
`;

const Header = styled.h4`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;

export default SupportTicketSectionHeader;
