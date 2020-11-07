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

function ActiveAccountItem(props) {
  console.log("props: ", props.index % 2 == 0);
  let history = useHistory();
  const accountDetail = (account) => {
    history.push(`/support/portal/accounts/accountdetail/${account}`);
  };

  return (
    <>
      {props.account.username !== "admin" && (
        <Supporter>
          <SupporterName>
            <Name>{props.account.name}</Name>
          </SupporterName>
          <SupporterUserName>
            <Username>{props.account.username}</Username>
          </SupporterUserName>
          <UnlockBtn>
            <Btn
              onClick={() =>
                unlockAccountHandler(
                  props.account,
                  props.setResetList,
                  props.resetList
                )
              }
              disabled={!props.account.isLocked}
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
  padding-left: 5%;
  background-color: ${(props) =>
    props.index % 2 === 0 ? "#caffbf" : "#a8dadc"};
  color: ${(props) => (props.index % 2 === 0 ? "#caffbf" : "#000000")};
  font-weight: bold;
  padding-top: 1%;
  padding-bottom: 1%;
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
