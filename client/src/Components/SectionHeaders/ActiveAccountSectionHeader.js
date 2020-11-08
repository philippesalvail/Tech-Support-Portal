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
const Header = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;
const LogOutBtn = styled.button`
  width: 10%;
  margin-bottom: 2%;
  background-color: #457b9d;
  color: #f1faee;
  padding: 1%;
  font-weight: bold;
`;

const AccountHeader = styled.div`
  display: flex;
`;

export default AccountSectionHeader;
