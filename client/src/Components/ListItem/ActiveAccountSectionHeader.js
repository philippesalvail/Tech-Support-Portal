import React from "react";
import styled from "styled-components";

function AccountSectionHeader() {
  return (
    <AccountHeader>
      <AccountName>Name</AccountName>
      <AccountUserName>Username</AccountUserName>
      <AccountStatus>AccountStatus</AccountStatus>
    </AccountHeader>
  );
}

const AccountHeader = styled.div`
  display: flex;
`;
const AccountName = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;
const AccountUserName = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;
const AccountState = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;
const AccountStatus = styled.h3`
  flex: 1;
  text-decoration: underline;
  text-align: left;
`;

export default AccountSectionHeader;
