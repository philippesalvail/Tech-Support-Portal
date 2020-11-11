import React from "react";
import styled from "styled-components";

function AccountSectionHeader() {
  return (
    <AccountHeader>
      <Header>Name</Header>
      <Header>Username</Header>
      <Header>AccountStatus</Header>
    </AccountHeader>
  );
}
const Header = styled.h4`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;

const AccountHeader = styled.div`
  display: flex;
  padding-left: 1%;
`;

export default AccountSectionHeader;
