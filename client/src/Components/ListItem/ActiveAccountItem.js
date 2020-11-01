import React from "react";
import styled from "styled-components";

function ActiveAccountItem({account}) {
  const unlockAccountHandler = () => {};
  return (
    <>
      {account.username !== "admin" && (
        <Supporter>
          <SupporterName>
            <Name>{account.name}</Name>
          </SupporterName>
          <SupporterUserName>
            <Username>{account.username}</Username>
          </SupporterUserName>
          <UnlockBtn>
            <Btn onClick={() => unlockAccountHandler(account._id)}>Unlock</Btn>
          </UnlockBtn>
        </Supporter>
      )}
    </>
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
const Name = styled.label``;

const SupporterUserName = styled.div`
  flex: 1;
  text-align: left;
`;
const Username = styled.label``;

const EnableBtn = styled.div`
  flex: 1;
  text-align: left;
`;

const UnlockBtn = styled.div`
  flex: 1;
  text-align: left;
`;
const Btn = styled.button``;

export default ActiveAccountItem;
