import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

function AccountItem({account}) {
  let history = useHistory();
  //   const AccountHandler = (ticketId) => {
  //     history.push(`/support/portal/ticket/${ticketId}`);
  //   };
  return (
    <Supporter>
      <SupporterName>Supporter Name</SupporterName>
      <SupporterUserName />
      <SupporterPassword />
      <SupporterTeam>Supporter Team</SupporterTeam>
      <EnableBtn>Enable</EnableBtn>
    </Supporter>
  );
}

const Supporter = styled.li`
  display: flex;
  margin-bottom: 1%;
`;
const SupporterName = styled.div`
  flex: 1;
  text-align: left;
`;

const SupporterUserName = styled.input``;
const SupporterPassword = styled.input``;
const SupporterTeam = styled.div``;
const EnableBtn = styled.button``;

export default AccountItem;
