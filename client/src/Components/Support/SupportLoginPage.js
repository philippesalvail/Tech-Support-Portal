import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

function SupportLoginPage() {
  let history = useHistory();
  const [userNameTyped, setUserNameTyped] = React.useState(null);
  const [passwordTyped, setPasswordTyped] = React.useState(null);
  const [loginMessage, setLoginMessage] = React.useState(null);
  const authenticateUser = (e) => {
    e.preventDefault();
    fetch(`/support/supporter/${userNameTyped}`)
      .then((response) => response.json())
      .then((userObj) => {
        if (!userObj.user) {
          setLoginMessage(
            "Account does not exist in Database." +
              "\n" +
              "Please sign up for an account"
          );
        } else if (userObj.user.password !== passwordTyped) {
          setLoginMessage("Password is invalid");
        } else {
          history.push("/support/portal/newtickets");
        }
      });
  };

  return (
    <LoginPage>
      <LoginBanner>Welcome To Service Now</LoginBanner>
      <LoginInfo onSubmit={authenticateUser}>
        <Login>
          <h1>Login</h1>
          <p>Please fill in your credentials to login</p>
        </Login>
        <UserName>
          <UserNameLbl>Username: </UserNameLbl>
          <UserNameTxt
            onChange={(e) => {
              setUserNameTyped(e.target.value);
            }}
          />
        </UserName>
        <Password>
          <PasswordLbl>Password: </PasswordLbl>
          <PasswordTxt
            onChange={(e) => {
              setPasswordTyped(e.target.value);
            }}
          />
        </Password>
        <Buttons>
          <ButtonLogin type="submit">Login</ButtonLogin>
          <div>
            Don't have an account?{" "}
            <a href="./SupportSignUpPage">Sign Up Here</a>
          </div>
        </Buttons>
      </LoginInfo>
      <LoginMessage>{loginMessage ? loginMessage : ""}</LoginMessage>
    </LoginPage>
  );
}
const LoginInfo = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 5%;
  border-radius: 25px;
`;
const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  margin: 0 auto;
`;
const UserName = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4%;
`;
const UserNameLbl = styled.label`
  flex: 1;
`;
const UserNameTxt = styled.input`
  flex: 1;
`;

const Password = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4%;
`;

const PasswordLbl = styled.label`
  flex: 1;
`;
const PasswordTxt = styled.input`
  flex: 1;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;
const Login = styled.div``;
const ButtonLogin = styled.button`
  width: 20%;
  margin-bottom: 2%;
`;

const LoginMessage = styled.div`
  margin-top: 2%;
  text-align: center;
  font-size: 1.5em;
  color: red;
`;
const LoginBanner = styled.div`
  text-align: center;
  margin: 5%;
  color: blue;
  font-size: 1.75em;
`;
export default SupportLoginPage;