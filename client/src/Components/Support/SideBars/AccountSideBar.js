import React from "react";
import styled from "styled-components";
import {NavLink, useHistory} from "react-router-dom";

import {
  AllSupportersIcon,
  WaitingSupportersIcon,
  TeamSupportersIcon,
  TeamIcon,
} from "../../../ReactIcons";

function AccountSideBar() {
  let history = useHistory();
  const [teams, setTeams] = React.useState(null);

  React.useEffect(() => {
    fetch("/support/supportteams/getSupportTeams")
      .then((response) => response.json())
      .then((supportTeams) => setTeams(supportTeams.teams))
      .catch((error) => console.log("error: ", error.message));
  }, []);

  const teamSelected = (team) => {
    history.push(`/support/portal/admin/teamaccounts/${team}`);
  };

  return (
    <Side>
      <SideLbl>Accounts</SideLbl>
      <SideLink strict to={"/support/portal/accounts/newaccounts"}>
        <WaitingSupportersIcon />
        <NewAccounts>View New</NewAccounts>
      </SideLink>
      <SideLink strict to={"/support/portal/accounts/activeaccounts"}>
        <AllSupportersIcon />
        <ViewAll>View All</ViewAll>
      </SideLink>
      <SideLink strict to={"/support/portal/accounts/accountdetail"}>
        <TeamSupportersIcon />
        <ViewAll>View Detail</ViewAll>
      </SideLink>
      <TeamMenu>
        <TeamSupportersIcon />
        <DropDownSelect
          id="assignmentGroup"
          name="assignmentGroup"
          defaultValue="selectAssignmentGroup"
          onChange={(e) => teamSelected(e.target.value)}
        >
          <option value="selectAssignmentGroup" disabled hidden>
            View Team
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
      </TeamMenu>
    </Side>
  );
}
const TeamMenu = styled.div`
  display: flex;
  padding-left: 7%;
`;
const DropDownSelect = styled.select`
  text-align: center;
  text-align-last: center;
`;
const SideLbl = styled.h3`
  text-decoration: underline;
  padding-left: 5%;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
`;
const SideLink = styled(NavLink)`
  display: flex;
  padding-left: 7%;
  text-decoration: none;
`;
const PaddedLink = styled.span`
  font-weight: bold;
`;
const NewAccounts = styled(PaddedLink)``;
const ViewAll = styled(PaddedLink)``;

export default AccountSideBar;
