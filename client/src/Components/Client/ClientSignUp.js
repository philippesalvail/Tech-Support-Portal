import React from "react";
import styled from "styled-components";
import {useLocation, useHistory} from "react-router-dom";
import {
  creditCardVerification,
  cscVerification,
  createClient,
} from "./ClientFunctions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LogOutButton from "../LogButtons/logout-button";

const ClientSignUp = () => {
  const location = useLocation();
  const {
    given_name,
    email,
    family_name,
    nickname,
    picture,
  } = location.state.user;
  const history = useHistory();
  const [address, setAddress] = React.useState("");
  const [creditCard, setCreditCard] = React.useState("");
  const [csc, setCsc] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [familyname, setFamilyname] = React.useState(family_name);
  const [givenname, setGivenname] = React.useState(given_name);

  const valid = {
    address: address.length > 5,
    creditCard: creditCard.length == 16,
    csc: csc.length == 3,
    expDate: selectedDate !== null,
    username: username.length > 2,
  };

  const routeChange = (username) => {
    console.log("in route change: ", username);
    history.push(`/client/portal/${username}/newticket`);
  };

  const registerClientHandler = (e) => {
    e.preventDefault();
    let errorMessage = "";
    for (var key of Object.keys(valid)) {
      if (!valid[key]) {
        errorMessage += "Please enter a valid " + key + "\n";
      }
    }
    if (errorMessage) {
      alert(errorMessage);
    } else {
      createClient(
        {
          given_name: givenname,
          family_name: familyname,
          nickname: nickname,
          email: email,
          picture: picture,
        },
        {
          address: address,
          creditCard: creditCard,
          csc: csc,
          selectedDate: selectedDate,
          username: username,
        }
      )
        .then((response) => response.json())
        .then((client) => {
          if (client.accountCreated) {
            alert(client.message);
            console.log("client.accountCreated: ", client.accountCreated);
            routeChange(username);
          } else {
            alert(client.message);
          }
        });
    }
  };
  return (
    <>
      <Wrapper>
        <SignUpPage>
          <SignUpTitle>Create Your Account</SignUpTitle>
          <SignUp>
            <ClientName>
              <Row>
                <Lbl>First Name: </Lbl>
                <FirstNameTxt
                  value={given_name}
                  disabled={given_name}
                  firstNameAppears={given_name !== null}
                  onChange={(e) => setGivenname(e.target.value)}
                />
              </Row>
              <Row>
                <Lbl>Last Name: </Lbl>
                <LastNameTxt
                  value={family_name}
                  disabled={family_name}
                  lastNameAppears={family_name !== null}
                  onChange={(e) => setFamilyname(e.target.value)}
                />
              </Row>
            </ClientName>
            <LoginInfo>
              <EmailRow>
                <EmailLbl>Email: </EmailLbl>
                <EmailTxt value={email} disabled={email} />
              </EmailRow>
              <UserNameRow>
                <Lbl>Username: </Lbl>
                <UsernameTxt
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  usernameLength={!username || valid.username}
                />
              </UserNameRow>
            </LoginInfo>
            <Address>
              <Lbl>Address</Lbl>
              <AddressTxt
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                addressLength={address.length}
                valid={!address || valid.address}
              />
            </Address>
            <CreditCard>
              <CreditCardNumber>
                <Lbl>Credit Card Number</Lbl>
                <CreditCardTxt
                  value={creditCard}
                  onChange={(e) => {
                    setCreditCard(creditCardVerification(e.target.value));
                  }}
                  valid={!creditCard || valid.creditCard}
                />
              </CreditCardNumber>
              <CSC>
                <CSCLbl>CSC</CSCLbl>
                <CSCTxt
                  value={csc}
                  onChange={(e) => {
                    setCsc(cscVerification(e.target.value));
                  }}
                  valid={!csc || valid.csc}
                />
              </CSC>
              <Exp>
                <ExpLbl>Exp. Date (MM/YYYY)</ExpLbl>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  showFullMonthYearPicker
                  showTwoColumnMonthYearPicker
                  isClearable
                  minDate={new Date()}
                  valid={selectedDate}
                />
              </Exp>
            </CreditCard>
            <Buttons>
              <LogOutButton />
              <SignUpBtn onClick={registerClientHandler}>Register</SignUpBtn>
            </Buttons>
          </SignUp>
        </SignUpPage>
      </Wrapper>
    </>
  );
};

const LastNameTxt = styled.input`
  background-color: ${(props) => (props.firstNameAppears ? "#d3d3d3" : "")};
  outline: none;
`;
const FirstNameTxt = styled.input`
  background-color: ${(props) => (props.lastNameAppears ? "#d3d3d3" : "")};
  outline: none;
`;

const Wrapper = styled.div`
  positon: relative;
  background-color: #f1faee;
  min-height: 100vh;
  min-width: 100vh;
`;
const SignUpPage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  border: 1px solid black;
  padding: 1%;
  border-radius: 25px;
  transform: translate(-50%, -50%);
  background-color: #a8dadc;
`;
const EmailLbl = styled.label`
  margin-right: 43px;
`;

const EmailTxt = styled.input``;

const UserNameRow = styled.div`
  flex: 1;
  text-align: right;
`;

const UsernameTxt = styled.input`
  border: ${(props) =>
    props.usernameLength ? "1px solid black" : "1px solid red"};
  outline: none;
`;

const EmailRow = styled.div`
  display: flex;
  flex: 1;
`;

const SignUpTitle = styled.h2`
  text-align: center;
`;

const SignUp = styled.div`
  display: flex;
  flex-direction: column;
`;
const ClientName = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1% 0;
`;
const LoginInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Row = styled.div``;
const Lbl = styled.label``;

const Txt = styled.input`
  background-color: #d3d3d3;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1% 0;
`;

const AddressTxt = styled.input`
  border: ${(props) => (props.valid ? "1px solid black" : "1px solid red")};
  outline: none;
`;

const CreditCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1% 0;
`;

const CreditCardNumber = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreditCardTxt = styled.input`
  border: ${(props) => (props.valid ? "1px solid black" : "1px solid red")};
  outline: none;
`;

const CSC = styled.div`
  display: flex;
  flex-direction: column;
`;
const CSCLbl = styled.label``;
const CSCTxt = styled.input`
  width: 20%;
  border: ${(props) => (props.valid ? "1px solid black" : "1px solid red")};
  outline: none;
`;

const Exp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ExpLbl = styled.label`
  text-align: right;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1% 0;
`;

const SignUpBtn = styled.button`
  background-color: #457b9d;
  color: #f1faee;
  font-weight: bold;
  outline: none;
  font-size: 15px;
`;

export default ClientSignUp;
