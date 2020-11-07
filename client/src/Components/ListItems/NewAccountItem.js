import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

function NewAccountItem(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {_id, name, team, isValidated} = props.account;
  const {setEnableAccount, enableAccount} = props;
  const [teamSelected, setTeamSelected] = React.useState("");
  const [teams, setTeams] = React.useState(null);
  const [statusMessage, setStatusMesage] = React.useState("");
  const [usernameExists, setUsernameExists] = React.useState(false);

  React.useEffect(() => {
    fetch("/support/supportteams/getSupportTeams")
      .then((response) => response.json())
      .then((supportTeams) => setTeams(supportTeams.teams))
      .catch((error) => console.log("error: ", error.message));
  }, []);
  let history = useHistory();

  const checkIfAccountExists = (username) => {
    fetch(`/support/accounts/checkUsername/${username}`)
      .then((response) => response.json())
      .then((account) => {
        setUsernameExists(account.supporter.username == username);
      })
      .catch((error) => console.log("error: ", error.message));
  };

  const checkPasswordComplexity = (password) => {
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(password);
  };

  const activateAccountHandler = (id) => {
    if (checkIfAccountExists(username)) {
      alert("username " + username + " already exists");
      return;
    }

    if (!checkPasswordComplexity(password)) {
      alert("password must contain at least one special character");
      return;
    }
    fetch("/support/accounts/enableAccount", {
      method: "put",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        _id: _id,
        name: name,
        team: team,
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
        setEnableAccount(!enableAccount);
        setPassword("");
        setUsername("");
      })
      .catch((error) => console.log("error: ", error.message));
  };

  return (
    <>
      {!isValidated && teams && (
        <Supporter>
          <SupporterName>
            <Name>{name}</Name>
          </SupporterName>
          <SupporterUserName>
            <UserName
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </SupporterUserName>
          <SupporterPassword>
            <Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
`;

const Supporter = styled.li`
  display: flex;
  padding-left: 5%;
  background-color: ${(props) => (props.index % 2 ? "#caffbf" : "#a8dadc")};
  color: ${(props) => (props.index % 2 ? "#caffbf" : "#000000")};
  font-weight: bold;
  padding-top: 1%;
  padding-bottom: 1%;
`;
const SupporterName = styled.div`
  flex: 1;
  text-align: left;
`;
const Name = styled.div``;

const SupporterUserName = styled.div`
  flex: 1;
  text-align: left;
`;
const UserName = styled.input``;
const SupporterPassword = styled.div`
  flex: 1;
  text-align: left;
`;
const Password = styled.input``;

const SupporterTeam = styled.div`
  flex: 1;
  text-align: left;
`;
const Team = styled.div``;
const EnableBtn = styled.div`
  flex: 1;
  text-align: left;
`;
const Btn = styled.button``;

export default NewAccountItem;
