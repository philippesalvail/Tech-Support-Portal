import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

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
    history.push("/support/portal");
  };

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
