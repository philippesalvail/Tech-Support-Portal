import React from "react";
import styled from "styled-components";
import LogOutButton from "../LogButtons/logout-button";

function TicketSectionHeader() {
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

const LogOutBtn = styled.button`
  width: 10%;
  margin-bottom: 2%;
  background-color: #457b9d;
  color: #f1faee;
  padding: 1%;
  font-weight: bold;
  width: 8%;
`;

const TicketHeader = styled.div`
  display: flex;
`;

const Header = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;

export default TicketSectionHeader;
