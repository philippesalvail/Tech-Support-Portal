import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

const unlockAccountHandler = (account, setResetList, resetList) => {
  fetch(`/support/accounts/lockAccount/${account.username}`, {
    method: "PATCH",
    body: JSON.stringify({
      isLocked: !account.isLocked,
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"},
  })
    .then((response) => response.json())
    .then((account) => {
      setResetList(!account.isLocked);
    })
    .catch((error) => console.log("error: ", error.message));
};

function ActiveAccountItem({account, setResetList, resetList}) {
  console.log("account in ActiveAccountItem: ", account);
  let history = useHistory();
  const accountDetail = (account) => {
    history.push(`/support/portal/accounts/accountdetail/${account}`);
  };

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
            <Btn
              onClick={() =>
                unlockAccountHandler(account, setResetList, resetList)
              }
              disabled={!account.isLocked}
            >
              Unlock
            </Btn>
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

const UnlockBtn = styled.div`
  flex: 1;
  text-align: left;
`;
const Btn = styled.button`
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

export default ActiveAccountItem;
