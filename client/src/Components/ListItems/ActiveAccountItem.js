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
      setResetList(!resetList);
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
        <Supporter index={props.index}>
          <Row>
            <SupporterName>{props.account.name}</SupporterName>
          </Row>
          <Row>
            <Username>{props.account.username}</Username>
          </Row>
          <Row>
            <Username>{props.account.team}</Username>
          </Row>

          <Row>
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
          </Row>
        </Supporter>
      )}
    </>
  );
}

const Supporter = styled.li`
  display: flex;
  background-color: ${(props) =>
    props.index % 2 === 0 ? "#a8dadc" : "#f1faee"};
  color: ${(props) => (props.index % 2 === 0 ? "#1d3557" : "#000000")};
  font-weight: bold;
  padding-top: 1%;
  padding-left: 1%;
  padding-bottom: 1%;
`;
const SupporterName = styled.label``;
const Username = styled.label``;

const Row = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Btn = styled.button`
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  background-color: #457b9d;
  color: #f1faee;
  font-weight: bold;
  margin: 1%;
  font-size: 15px;
  width: 25%;
  padding: 1%;
`;

export default ActiveAccountItem;
