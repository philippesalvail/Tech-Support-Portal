import React from "react";
import {user} from "react-icons-kit/ikons/user";
import styled from "styled-components";

function NewAccountItem(props) {
  const {_id, name, team, isValidated} = props.account;
  console.log("props: ", props.index);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {setEnableAccount, enableAccount} = props;
  const [teamSelected, setTeamSelected] = React.useState("");
  const [teams, setTeams] = React.useState(null);

  React.useEffect(() => {
    fetch("/support/supportteams/getSupportTeams")
      .then((response) => response.json())
      .then((supportTeams) => setTeams(supportTeams.teams))
      .catch((error) => console.log("error: ", error.message));
  }, []);

  const checkIfAccountExists = (username) =>
    fetch(`/support/accounts/checkUsername/${user}`)
      .then((response) => response.json())
      .then((user) => user.supporter.username === username)
      .catch((error) => console.log("error: ", error.messaage));

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
        setEnableAccount(!enableAccount);
        setPassword("");
        setUsername("");
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
  width: 75%;
`;

const Supporter = styled.li`
  display: flex;
  padding-left: 5%;
  background-color: ${(props) =>
    props.index % 2 === 0 ? "#a8dadc" : "#f1faee"};
  color: ${(props) => (props.index % 2 === 0 ? "#1d3557" : "#000000")};
  font-weight: bold;
  padding-top: 1%;
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
`;

export default NewAccountItem;
