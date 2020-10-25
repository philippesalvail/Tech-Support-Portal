import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "react-bootstrap";

const LoginButton = ({data}) => {
  const {loginWithRedirect} = useAuth0();

  const supportLogin = () => {};

  return (
    <>
      {data.userType == "Customer" ? (
        <Button
          onClick={() => loginWithRedirect()}
          id="qsLoginBtn"
          variant="primary"
          className="btn-margin"
        >
          Log in
        </Button>
      ) : (
        <Button
          onClick={() => supportLogin()}
          id="qsLoginBtn"
          variant="primary"
          className="btn-margin"
        >
          Log in
        </Button>
      )}
    </>
  );
};

export default LoginButton;
