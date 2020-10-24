import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

import {
  requestClientAccount,
  receiveClientAccount,
  receiveClientAccountError,
} from "../../actions";

const ClientDirection = () => {
  const dispatch = useDispatch();
  const {user} = useAuth0();
  let history = useHistory();
  React.useEffect(() => {
    requestClientAccount();
    fetch(`/client/${user.email}`)
      .then((response) => response.json())
      .then((account) => {
        account.userFound
          ? dispatch(receiveClientAccount(account.userFound)) &&
            history.push("/client/portal/newticket")
          : history.push("/client/signup", {user: user});
      })
      .catch((err) => dispatch(receiveClientAccountError(err.message)));
  }, []);

  return <></>;
};

export default ClientDirection;
