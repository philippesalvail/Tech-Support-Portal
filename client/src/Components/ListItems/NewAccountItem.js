import React from "react";
import styled from "styled-components";
import {ip} from "../Constants";

function NewAccountItem(props) {
  const {_id, name, team, isValidated} = props.account;
  const {setEnableAccount, enableAccount, setResetList, resetList} = props;

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [teamSelected, setTeamSelected] = React.useState(props.account.team);
  const [teams, setTeams] = React.useState(null);

  const valid = {
    username: username.length > 3,
    password: password.length > 6,
  };

  React.useEffect(() => {
    fetch(`${ip}/support/supportteams/getSupportTeams`)
      .then((response) => response.json())
      .then((supportTeams) => setTeams(supportTeams.teams))
      .catch((error) => console.log("error: ", error.message));
  }, []);

  const checkPasswordComplexity = (password) => {
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(password);
  };

  const activateAccountHandler = (e) => {
    let errorMessage = "";
    // const valid = {
    //   username: username.length > 3,
    //   password: password.length > 6,
    // };

    for (var key of Object.keys(valid)) {
      if (!valid[key]) {
        errorMessage += key + " does not meet the length requirement\n";
      }
    }

    if (!checkPasswordComplexity(password)) {
      errorMessage += "password must contain at least one special character\n";
    }

    if (errorMessage !== "") {
      alert(errorMessage);
      return;
    }

    fetch(`${ip}/support/accounts/enableAccount`, {
      method: "PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        _id: _id,
        name: name,
        team: teamSelected,
        username: username,
        password: password,
        isLocked: false,
        isValidated: true,
        isEnabled: true,
      }),
    })
      .then((response) => response.json())
      .then((statusMessage) => {
        console.log("statusMessage: ", statusMessage);
        if (statusMessage.accountCreated) {
          alert(statusMessage.message);
          setEnableAccount(!enableAccount);
          setPassword("");
          setUsername("");
          setResetList(!resetList);
        } else {
          alert(statusMessage.message);
        }
      })
      .catch((error) => console.log("error: ", error.message));
  };

  return (
    <>
      {!isValidated && teams && (
        <Supporter index={props.index}>
          <SupporterName>
            <Name>{name}</Name>
          </SupporterName>
          <SupporterUserName>
            <UserName
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              usernameLength={valid.username || !username}
            />
          </SupporterUserName>
          <SupporterPassword>
            <Password
              type="password"
              id="txthidden"
              name="txthidden"
              size="15"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              passwordLength={valid.password || !password}
            />
          </SupporterPassword>
          <SupporterTeam>
            <DropDownSelect
              id="assignmentGroup"
              name="assignmentGroup"
              defaultValue="selectAssignmentGroup"
              onChange={(e) => setTeamSelected(e.target.value)}
            >
              <option value="selectAssignmentGroup" disabled hidden>
                {team}
              </option>
              {teams.map((team, index) => {
                return (
                  <option key={team + index + team} value={team.supportName}>
                    {team.supportName}
                  </option>
                );
              })}
            </DropDownSelect>
          </SupporterTeam>
          <EnableBtn>
            <Btn onClick={() => activateAccountHandler(_id)}>Enable</Btn>
          </EnableBtn>
        </Supporter>
      )}
    </>
  );
}

const DropDownSelect = styled.select`
  flex: 1;
  width: 75%;
`;

const Supporter = styled.li`
  display: flex;
  background-color: ${(props) =>
    props.index % 2 === 0 ? "#a8dadc" : "#f1faee"};
  color: ${(props) => (props.index % 2 === 0 ? "#1d3557" : "#000000")};
  font-weight: bold;
  padding-top: 1%;
  padding-left: 1%;
  padding-bottom: 1%;
`;
const SupporterName = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Name = styled.div``;

const SupporterUserName = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UserName = styled.input`
  width: 75%;
  border: ${(props) =>
    props.usernameLength ? "1px solid black" : "1px solid black"};
`;
const SupporterPassword = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Password = styled.input`
  width: 75%;
  border: ${(props) =>
    props.passwordLength ? "1px solid black" : "1px solid black"};
`;

const SupporterTeam = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const EnableBtn = styled.div`
  flex: 1;
  text-align: left;
`;
const Btn = styled.button`
  background-color: #457b9d;
  color: #f1faee;
  font-weight: bold;
  margin: 1%;
  font-size: 15px;
  padding: 1%;
`;

export default NewAccountItem;
