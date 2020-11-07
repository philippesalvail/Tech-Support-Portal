import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import {useHistory} from "react-router-dom";

function SupportCreateAccount() {
  const [teams, setTeams] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [newteam, setNewTeam] = React.useState("Select Support Team");
  const [username, setUsername] = React.useState("");
  const [supporterFirstName, setSupporterFirstName] = React.useState("");
  const [supporterLastName, setSupporterLastName] = React.useState("");
  const [usernameExists, setUsernameExists] = React.useState(false);

  const valid = {
    username: username.length > 3,
    password: password.length > 6,
  };

  React.useEffect(() => {
    fetch("/support/supportteams/getSupportTeams")
      .then((response) => response.json())
      .then((supportTeams) => setTeams(supportTeams.teams))
      .catch((error) => console.log("error: ", error.message));
  }, []);

  const checkIfAccountExists = (username) => {
    fetch(`/support/accounts/${username}`)
      .then((response) => response.json())
      .then((account) => setUsernameExists(account.exists))
      .catch((error) => console.log("error: ", error.message));
  };
  const checkPasswordComplexity = (password) => {
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(password);
  };

  const registerAccountHandler = (e) => {
    e.preventDefault();
    let errorMessage = "";
    for (var key of Object.keys(valid)) {
      if (!valid[key]) {
        errorMessage += "Please enter a valid " + key + "\n";
      }
    }
    if (checkIfAccountExists(username)) {
      alert("username " + usernameExists + " already exists");
      return;
    }
    if (!checkPasswordComplexity(password)) {
      alert("password must contain at least one special character");
      return;
    }

    if (supporterFirstName.length < 2) {
      alert("Please enter a first name");
      return;
    }

    if (supporterLastName.length < 2) {
      alert("Please enter a Last name");
      return;
    }

    fetch("/support/accounts/createAccount", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        firstname: supporterFirstName,
        lastname: supporterLastName,
        team: newteam,
        username: username,
        password: password,
        isLocked: false,
        isValidated: true,
        isEnabled: true,
      }),
    })
      .then((response) => {
        response.json();
      })
      .then((statusMessage) => {
        setPassword("");
        setUsername("");
        setSupporterFirstName("");
        setSupporterLastName("");
      })
      .catch((error) => console.log("error: ", error.message));
  };

  return (
    <AdminPage>
      <AccountDashBoard>
        <SideBar>
          <AdminSideBar />
          <AccountSideBar />
        </SideBar>
        <AccountInformation onSubmit={registerAccountHandler}>
          <AccountWrapper>
            <AccountHeader>Create Support Account</AccountHeader>
            <DetailRow>
              <Lbl>First Name: </Lbl>
              <SupporterFirstNameTxt
                onChange={(e) => {
                  setSupporterFirstName(e.target.value);
                }}
              />
            </DetailRow>
            <DetailRow>
              <Lbl>Last Name: </Lbl>
              <SupporterLastNameTxt
                onChange={(e) => {
                  setSupporterLastName(e.target.value);
                }}
              />
            </DetailRow>

            <DetailRow>
              <Lbl>Username: </Lbl>
              <UsernameTxt
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                usernameLength={valid.username || !username}
              />
            </DetailRow>
            <DetailRow>
              <Lbl>Password: </Lbl>
              <PasswordTxt
                value={password}
                type="password"
                id="txthidden"
                name="txthidden"
                size="15"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                passwordLength={valid.password || !password}
              />
            </DetailRow>
            <DetailRow>
              <Lbl>Support Team: </Lbl>
              <DropDownSelect
                id="assignmentGroup"
                name="assignmentGroup"
                defaultValue="selectAssignmentGroup"
                onChange={(e) => {
                  setNewTeam(e.target.value);
                }}
              >
                <option value="selectAssignmentGroup" disabled hidden>
                  {newteam}
                </option>
                {teams &&
                  teams.map((team, index) => {
                    return (
                      <option key={team + index} value={team.supportName}>
                        {team.supportName}
                      </option>
                    );
                  })}
              </DropDownSelect>
            </DetailRow>
            <ButtonRow>
              <CreateBtn type="submit">Register</CreateBtn>
            </ButtonRow>
          </AccountWrapper>
        </AccountInformation>
      </AccountDashBoard>
    </AdminPage>
  );
}
const AccountWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 25px;
  margin-top: 18px;
  background-color: #a8dadc;
`;
const AdminPage = styled.div`
  display: flex;
  flex-direction: column;
`;
const AccountHeader = styled.h3`
  text-align: center;
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 3%;
`;

const CreateBtn = styled.button``;

const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AccountDashBoard = styled.div`
  display: flex;
`;
const Lbl = styled.label`
  flex: 1;
`;
const SupporterFirstNameTxt = styled.input`
  flex: 1;
  text-align: center;
  outline: none;
`;
const SupporterLastNameTxt = styled.input`
  flex: 1;
  text-align: center;
  outline: none;
`;
const UsernameTxt = styled.input`
  flex: 1;
  text-align: center;
  border: ${(props) =>
    props.usernameLength ? "1px solid black" : "1px solid red"};
  outline: none;
`;
const PasswordTxt = styled.input`
  flex: 1;
  text-align: center;
  border: ${(props) =>
    props.passwordLength ? "1px solid black" : "1px solid red"};
  outline: none;
`;

const DetailRow = styled.div`
  display: flex;
  margin: 3%;
`;
const AccountInformation = styled.form`
  flex: 5;
  background-color: #f1faee;
  min-height: 100vh;
`;
const DropDownSelect = styled.select`
  text-align: center;
  text-align-last: center;
  flex: 1;
`;

export default SupportCreateAccount;
