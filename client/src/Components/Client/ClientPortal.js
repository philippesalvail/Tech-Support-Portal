import React from "react";
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const ClientPortal = () => {
  const clientAccount = useSelector((state) => state.client);

  console.log("clientAccount in ClientPortal: ", clientAccount);

  return <div>Welcome </div>;
};
export default ClientPortal;
