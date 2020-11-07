import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

const LoginButton = ({data}) => {
  const [allTickets, setAllTickets] = React.useState({});
  React.useEffect(() => {
    fetch("/support/getalltickets")
      .then((response) => response.json())
      .then((tickets) => setAllTickets(tickets))
      .catch((error) =>
        console.log("Error in support portal: ", error.message)
      );
  }, []);

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
          Log in
        </LogBtn>
      ) : (
        <LogBtn
          onClick={() => supportLogin()}
          id="qsLoginBtn"
          variant="primary"
          className="btn-margin"
        >
          Log in
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
