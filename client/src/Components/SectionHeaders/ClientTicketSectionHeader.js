import React from "react";
import styled from "styled-components";
import LogOutButton from "../LogButtons/logout-button";

function ClientTicketSectionHeader() {
  return (
    <TicketHeader>
      <Header>Description</Header>
      <Header>Priority</Header>
      <Header>Product</Header>
      <Header>Status</Header>
      <Header>Assigned To</Header>
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
  padding-left: 1%;
  background-color: #f1faee;
`;

const Header = styled.h4`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;

export default ClientTicketSectionHeader;
