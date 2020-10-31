import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

import {
  requestUserAccount,
  receiveUserAccount,
  receiveUserAccountError,
} from "../../actions";

const UserDirection = () => {
  const dispatch = useDispatch();
  const {user} = useAuth0();
  console.log("user: ", user);
  let history = useHistory();
  React.useEffect(() => {
    requestUserAccount();
    fetch(`/client/${user.email}`)
      .then((response) => response.json())
      .then((account) => {
        account.userFound
          ? dispatch(receiveUserAccount(account.userFound)) &&
            history.push("/client/portal/newticket")
          : history.push("/client/signup", {user: user});
      })
      .catch((err) => dispatch(receiveUserAccountError(err.message)));
  }, []);

  return <></>;
};

export default UserDirection;
