import React from "react";
import {useAuth0} from "@auth0/auth0-react";

const ClientPage = () => {
  const {user} = useAuth0();
  console.log("user in client page", user);
  React.useEffect(() => {
    fetch("/client")
      .then((accountResponse) => accountResponse.json())
      .then((account) => console.log("account: ", account))
      .catch((err) => console.log("err: ", err));
  }, []);

  return <></>;
};

export default ClientPage;
