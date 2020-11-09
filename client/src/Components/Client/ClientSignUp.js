import React from "react";
import styled from "styled-components";
import {useLocation, useHistory, Redirect} from "react-router-dom";
import {
  creditCardVerification,
  cscVerification,
  createClient,
} from "./ClientFunctions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ClientSignUp = () => {
  const [address, setAddress] = React.useState("");
  const [creditCard, setCreditCard] = React.useState("");
  const [csc, setCsc] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

  const valid = {
    fullName: address.length > 5,
    creditCard: creditCard.length == 16,
    csc: csc.length == 3,
    expDate: selectedDate !== null,
  };

  const location = useLocation();
  const {
    given_name,
    email,
    family_name,
    nickname,
    picture,
  } = location.state.user;

  const history = useHistory();

  const [signUp, setSignUp] = React.useState({
    given_name: given_name,
    family_name: family_name,
    nickname: nickname,
    email: email,
    picture: picture,
  });

  const routeChange = () => {
    history.push("/client/portal/");
  };

  const registerHandler = (e) => {
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
      createClient(signUp, {
        address: address,
        creditCard: creditCard,
        csc: csc,
        selectedDate: selectedDate,
      }).then((response) => alert(response.message));

      routeChange(email);
    }
  };
  return (
    <SignUpPage>
      <SignUpTitle>Create Your Account</SignUpTitle>
      <SignUpForm onSubmit={registerHandler}>
        <ClientName>
          <FirstName>
            <FirstNameLbl>First Name</FirstNameLbl>
            <FirstNameTxt value={given_name} />
          </FirstName>
          <LastName>
            <LastNameLbl>Last Name</LastNameLbl>
            <LastNameTxt value={family_name} />
          </LastName>
        </ClientName>
        <UserName>
          <UserNameLbl>Username</UserNameLbl>
          <UserNameTxt value={nickname} />
        </UserName>
        <Address>
          <AddressLbl>Address</AddressLbl>
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
            <CreditCardLbl>Credit Card Number</CreditCardLbl>
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
          <CancelBtn>Cancel</CancelBtn>
          <SignUpBtn type="submit">Register</SignUpBtn>
        </Buttons>
      </SignUpForm>
    </SignUpPage>
  );
};

const SignUpPage = styled.div`
  width: 45%;
  margin: 0 auto;
`;

const SignUpTitle = styled.h2`
  text-align: center;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const ClientName = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1% 0;
`;
const FirstName = styled.div`
  display: flex;
  flex-direction: column;
`;
const FirstNameLbl = styled.label``;
const FirstNameTxt = styled.input`
  background-color: #d3d3d3;
`;

const LastName = styled.div`
  display: flex;
  flex-direction: column;
`;
const LastNameLbl = styled.label``;
const LastNameTxt = styled.input`
  background-color: #d3d3d3;
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1% 0;
`;

const UserNameLbl = styled.label``;
const UserNameTxt = styled.input`
  background-color: #d3d3d3;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1% 0;
`;

const AddressLbl = styled.label``;
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
const CreditCardLbl = styled.label``;
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
const CancelBtn = styled.button`
  margin: 0 1%;
`;
const SignUpBtn = styled.button``;

export default ClientSignUp;
