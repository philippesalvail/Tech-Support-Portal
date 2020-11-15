import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import {useHistory} from "react-router-dom";
import {SearchIcon} from "../../../ReactIcons";

function SupportAccountDetail() {
  const [teams, setTeams] = React.useState(null);
  const [supporterFound, setSupporterFound] = React.useState("");
  const [userNameTyped, setUserNameTyped] = React.useState("");
  const [accountStatus, setAccountStatus] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [newteam, setNewTeam] = React.useState("");
  const [oldteam, setOldTeam] = React.useState(null);
  const [supporterName, setSupporterName] = React.useState("");
  const [accountState, setAccountState] = React.useState(false);

  let history = useHistory();
  const logOut = () => {
    history.push("/");
  };

  const changeAccountState = () => {
    fetch(`/support/accounts/changeAccountState/${username}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({
        isEnabled: !accountState,
      }),
    })
      .then((response) => response.json())
      .then((statusMessage) => {
        alert(statusMessage.message);
        setUserNameTyped("");
        setAccountStatus("");
        setPassword("");
        setUsername("");
        setNewTeam("");
        setOldTeam("");
        setSupporterName("");
      })
      .catch((error) => console.log("error: ", error.message));
  };

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
        setUserNameTyped("");
        setAccountStatus("");
        setPassword("");
        setUsername("");
        setNewTeam("");
        setSupporterName("");
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

  const searchSupporter = (userNameTyped) => {
    if (userNameTyped === "") {
      alert("Please enter a username");
      return;
    }

    fetch(`/support/supporter/searchSupporter/${userNameTyped}`)
      .then((response) => response.json())
      .then((supporter) => {
        if (supporter.user === null) {
          alert("username: " + userNameTyped + " does not exists");
        } else if (supporter.user !== null && supporter.user.isEnabled) {
          console.log("supporter: ", supporter);
          setSupporterFound(supporter.user);
          setAccountStatus("Enabled");
          setOldTeam(supporter.user.team);
          setPassword(supporter.user.password);
          setUsername(supporter.user.username);
          setSupporterName(supporter.user.name);
          setAccountState(supporter.user.isEnabled);
          setNewTeam(supporter.user.team);
        } else if (supporter.user !== null && !supporter.user.isEnabled) {
          setAccountStatus("Disabled");
          setOldTeam(supporter.user.team);
          setPassword(supporter.user.password);
          setUsername(supporter.user.username);
          setSupporterName(supporter.user.name);
          setAccountState(supporter.user.isEnabled);
        }
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
        <SupportTicketBanner>
          <BannerTitle>Account Detail</BannerTitle>
          <BannerUserAccount>
            <Wrapper>Welcome: Admin</Wrapper>
            <LogOutBtn
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </LogOutBtn>
          </BannerUserAccount>
        </SupportTicketBanner>
        <AccountWrapper>
          <AccountHeader>Account Detail</AccountHeader>
          <SearchRow>
            <UsernameTxt
              placeholder="Enter Username..."
              onChange={(e) => {
                setUserNameTyped(e.target.value);
              }}
              value={userNameTyped}
            />
            <SearchBtn onClick={() => searchSupporter(userNameTyped)}>
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
            <Txt
              value={supporterFound.isEnabled !== null && accountStatus}
              disabled={true}
            />
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
              value={newteam}
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
            <EnableBtn onClick={changeAccountState}>
              {accountStatus === "Enabled" ? "Disable" : "Enable"}
            </EnableBtn>
          </ButtonRow>
        </AccountWrapper>
      </AccountInformation>
    </Account>
  );
}
const LogOutBtn = styled.button`
  color: #f1faee;
  font-weight: bold;
  font-size: 15px;
  background-color: #457b9d;
  outline: none;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const BannerTitle = styled.div`
  text-align: left;
`;
const SupportTicketBanner = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 1%;
  background-color: #457b9d;
`;
const BannerUserAccount = styled.div`
  display: flex;
`;
const AccountWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 25px;
  margin-top: 5%;
  background-color: #a8dadc;
`;
const Account = styled.div`
  display: flex;
  background-color: #f1faee;
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;

  margin: 3%;
`;
const EnableBtn = styled.button`
  background-color: #457b9d;
  color: #f1faee;
  font-weight: bold;
  margin: 1%;
  font-size: 15px;
  padding: 1%;
`;
const UpdateBtn = styled.button`
  background-color: #457b9d;
  color: #f1faee;
  font-weight: bold;
  margin: 1%;
  font-size: 15px;
  padding: 1%;
`;

const AccountHeader = styled.h3`
  text-align: center;
`;
const SearchBtn = styled.button`
  background-color: #457b9d;
  color: #f1faee;
`;
const SearchRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 3%;
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
  display: flex;
  flex-direction: column;
`;
const AccountInformation = styled.div`
  flex: 5;
  min-height: 100vh;
`;

const DetailRow = styled.div`
  display: flex;
  margin: 3%;
`;
const Lbl = styled.label`
  flex: 1;
`;
const Txt = styled.input`
  flex: 1;
  text-align: center;
`;

export default SupportAccountDetail;
