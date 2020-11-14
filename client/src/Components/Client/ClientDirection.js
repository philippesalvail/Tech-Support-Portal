import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useHistory} from "react-router-dom";

const ClientDirection = () => {
  const {user, isAuthenticated} = useAuth0();
  let history = useHistory();
  console.log("isAuthenticated: ", isAuthenticated);
  React.useEffect(() => {
    fetch(`/client/${user.email}`)
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
