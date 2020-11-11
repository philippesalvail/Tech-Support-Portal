import React from "react";
import styled from "styled-components";

import {useHistory} from "react-router-dom";

function AccountSectionHeader() {
  let history = useHistory();
  const backToHomePage = () => {
    history.push("/");
  };
  return (
    <TicketHeader>
      <Header>Name</Header>
      <Header>Username</Header>
      <Header>Password</Header>
      <Header>Support Team</Header>
      <Header>State</Header>
    </TicketHeader>
  );
}

const TicketHeader = styled.div`
  display: flex;
`;
const Header = styled.h4`
  flex: 1;
  text-decoration: underline;
  text-align: left;
  padding-left: 1%;
`;

export default AccountSectionHeader;
