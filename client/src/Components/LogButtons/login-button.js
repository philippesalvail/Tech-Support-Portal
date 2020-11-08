import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

const LoginButton = ({data}) => {
  let history = useHistory();
  const {loginWithRedirect} = useAuth0();

  const supportLogin = () => {
    history.push("/support/portal/supportloginpage");
  };

  return (
    <>
      {data.userType == "Customer" ? (
        <LogBtn
          onClick={() => loginWithRedirect()}
          id="qsLoginBtn"
          variant="primary"
          className="btn-margin"
        >
          {data.buttonText}
        </LogBtn>
      ) : (
        <LogBtn
          onClick={() => supportLogin()}
          id="qsLoginBtn"
          variant="primary"
          className="btn-margin"
        >
          {data.buttonText}
        </LogBtn>
      )}
    </>
  );
};

const LogBtn = styled.button`
  background-color: #457b9d;
  color: #f1faee;
  font-weight: bold;
  margin-top: 5%;
  font-size: 15px;
  padding: 2%;
`;

export default LoginButton;
