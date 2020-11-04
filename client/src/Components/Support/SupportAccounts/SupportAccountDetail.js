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
      })
      .catch((error) => console.log(error.message));
  };

  if (supporterFound) {
    console.log("supporterFound: ", supporterFound);
  }

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
          <FirstNameLbl>Name: </FirstNameLbl>
          <FirstNameTxt value={supporterFound.name} />
        </DetailRow>
        <DetailRow>
          <FirstNameLbl>Status: </FirstNameLbl>
          <FirstNameTxt value={supporterFound.isEnabled && accountStatus} />
        </DetailRow>
        <DetailRow>
          <SupportTeamLbl>Support Team: </SupportTeamLbl>
          <DropDownSelect
            id="assignmentGroup"
            name="assignmentGroup"
            defaultValue="selectAssignmentGroup"
            // onChange={(e) => teamSelected(e.target.value)}
          >
            <option value="selectAssignmentGroup" disabled hidden>
              {supporterFound.team}
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
          <UpdateBtn>Update</UpdateBtn>
          <EnableBtn>Disable</EnableBtn>
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
const FirstNameLbl = styled.label`
  flex: 1;
`;
const FirstNameTxt = styled.input`
  flex: 1;
  text-align: center;
`;

const SupportTeamLbl = styled.label`
  flex: 1;
`;

export default SupportAccountDetail;
