import React from "react";
import {useLocation, useParams} from "react-router-dom";

const ClientPortal = () => {
  let location = useLocation();
  let params = useParams();
  return <div>Welcome </div>;
};
export default ClientPortal;
