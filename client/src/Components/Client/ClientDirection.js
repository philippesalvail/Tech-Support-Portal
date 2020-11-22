import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useHistory} from "react-router-dom";
import {ip} from "../Constants";

const ClientDirection = () => {
  const {user, isAuthenticated} = useAuth0();
  let history = useHistory();
  React.useEffect(() => {
    fetch(`${ip}/client/${user.email}`)
      .then((response) => response.json())
      .then((account) => {
        account.userFound
          ? history.push(
              `/client/portal/${account.userFound.username}/newticket`
            )
          : history.push("/client/signup", {user: user});
      })
      .catch((err) => console.log("err in Client Direction: ", err.message));
  }, []);

  return <></>;
};

export default ClientDirection;
