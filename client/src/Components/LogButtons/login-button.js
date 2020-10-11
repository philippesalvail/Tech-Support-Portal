import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Button} from 'react-bootstrap';

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();
  console.log('loginWithRedirect: ', loginWithRedirect);
  return (
    <Button
      onClick={() => loginWithRedirect()}
      id="qsLoginBtn"
      variant="primary"
      className="btn-margin"
    >
      Log in
    </Button>
  );
};

export default LoginButton;
