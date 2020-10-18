import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useHistory} from "react-router-dom";

const ClientDirection = () => {
  const {user} = useAuth0();
  console.log("user: ", user);
  let history = useHistory();
  React.useEffect(() => {
    fetch(`/client/${user.email}`)
      .then((response) => response.json())
      .then((account) => {
        account.userFound
          ? history.push("/client/portal")
          : history.push("/client/signup", {user: user});
      })
      .catch((err) => console.log("err: ", err));
  }, []);

  return <></>;
};

export default ClientDirection;
