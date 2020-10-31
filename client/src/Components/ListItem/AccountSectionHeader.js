import React from "react";
import styled from "styled-components";

function AccountSectionHeader() {
  return (
    <TicketHeader>
      <TicketCustomerName>Name</TicketCustomerName>
      <TicketDesc>Username</TicketDesc>
      <TicketType>Password</TicketType>
      <TicketPriority>Support Team</TicketPriority>
      <TicketState>State</TicketState>
    </TicketHeader>
  );
}

const TicketHeader = styled.div`
  display: flex;
`;
const TicketInc = styled.h3`
  flex: 1;
  text-decoration: underline;
`;
const TicketCustomerName = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;
const TicketDesc = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;
const TicketType = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;
const TicketPriority = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;
const TicketState = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;
const TicketGroup = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;
const TicketAssignee = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;

export default AccountSectionHeader;
