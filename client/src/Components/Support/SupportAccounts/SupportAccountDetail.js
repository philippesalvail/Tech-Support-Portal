import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";

import {SearchIcon} from "../../../ReactIcons";

function SupportAccountDetail() {
  const [teams, setTeams] = React.useState(null);
  const [supporterFound, setSupporterFound] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState(false);
  const [accountStatus, setAccountStatus] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [newteam, setNewTeam] = React.useState("");
  const [oldteam, setOldTeam] = React.useState(null);
  const [supporterName, setSupporterName] = React.useState("");

  const updateSupporterHandler = () => {
    fetch(`/support/supporter/updateSupporter/${username}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({
        newTeam: newteam,
        oldTeam: oldteam,
        supportUsername: username,
        password: password,
        name: supporterName,
      }),
    })
      .then((response) => response.json())
      .then((statusMessage) => {
        alert(statusMessage.message);
      })
      .catch((error) => console.log("error: ", error.message));
  };

  React.useEffect(() => {
    fetch("/support/supportteams/getSupportTeams")
      .then((response) => response.json())
      .then((supportTeams) => setTeams(supportTeams.teams))
      .catch((error) => console.log("error: ", error.message));
  }, []);

  const searchSupporter = (supporter) => {
    fetch(`/support/supporter/${supporter}`)
      .then((response) => response.json())
      .then((supporter) => {
        setSupporterFound(supporter.user);
        if (supporter.user.isEnabled) {
          setAccountStatus("Enabled");
        } else {
          setAccountStatus("Disabled");
        }
        setOldTeam(supporter.user.team);
        setPassword(supporter.user.password);
        setUsername(supporter.user.username);
        setSupporterName(supporter.user.name);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Account>
      <SideBar>
        <AdminSideBar />
        <AccountSideBar />
      </SideBar>

      <AccountInformation>
        <AccountHeader>Account Detail</AccountHeader>
        <SearchRow>
          <UsernameTxt
            placeholder="Enter Username..."
            onChange={(e) => {
              setSupporterFound(e.target.value);
            }}
          />
          <SearchBtn onClick={() => searchSupporter(supporterFound)}>
            <SearchIcon />
          </SearchBtn>
        </SearchRow>

        <DetailRow>
          <Lbl>Name: </Lbl>
          <Txt
            value={supporterName}
            onChange={(e) => {
              setSupporterName(e.target.value);
            }}
          />
        </DetailRow>
        <DetailRow>
          <Lbl>Status: </Lbl>
          <Txt value={supporterFound.isEnabled && accountStatus} />
        </DetailRow>
        <DetailRow>
          <Lbl>Username: </Lbl>
          <Txt
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </DetailRow>
        <DetailRow>
          <Lbl>Password: </Lbl>
          <Txt
            value={password}
            type="password"
            id="txthidden"
            name="txthidden"
            size="15"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
              {oldteam}
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
          <UpdateBtn onClick={updateSupporterHandler}>Update</UpdateBtn>
          <EnableBtn>
            {supporterFound.isEnabled ? "Disable" : "Enable"}
          </EnableBtn>
        </ButtonRow>
      </AccountInformation>
    </Account>
  );
}
const ButtonRow = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content: flex-end;
`;
const EnableBtn = styled.button``;
const UpdateBtn = styled.button``;
const AccountHeader = styled.h3`
  text-align: center;
`;
const SearchBtn = styled.button``;
const SearchRow = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content: flex-end;
`;

const UsernameTxt = styled.input`
  outline: none;
  text-align: center;
`;

const DropDownSelect = styled.select`
  text-align: center;
  text-align-last: center;
  flex: 1;
`;

const SideBar = styled.div`
  flex: 1;
`;
const AccountInformation = styled.div`
  flex: 5;
`;

const Account = styled.div`
  display: flex;
`;
const DetailRow = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
  padding: 1%;
`;
const Lbl = styled.label`
  flex: 1;
`;
const Txt = styled.input`
  flex: 1;
  text-align: center;
`;

export default SupportAccountDetail;
