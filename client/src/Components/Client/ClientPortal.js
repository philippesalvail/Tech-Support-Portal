import React from "react";
import {useLocation} from "react-router-dom";

const ClientPortal = () => {
  let location = useLocation();
  const {userName} = location.state;
  console.log("userName in ClientPortal: ", userName);
  return <div>Welcome </div>;
};
