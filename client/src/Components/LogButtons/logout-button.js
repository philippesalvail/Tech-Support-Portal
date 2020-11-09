import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";

const LogOutButton = () => {
  const {logout} = useAuth0();
  return <LogOutBtn onClick={() => logout()}>Logout</LogOutBtn>;
};

const LogOutBtn = styled.button`
  color: #f1faee;
  font-weight: bold;
  font-size: 15px;
  background-color: #457b9d;
  margin-right: 1%;
  outline: none;
`;

export default LogOutButton;
