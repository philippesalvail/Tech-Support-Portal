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
      <TitleLbl>Accounts</TitleLbl>
      <SideLink strict to={"/support/portal/accounts/newaccounts"}>
        <IconImg>
          <WaitingSupportersIcon />
        </IconImg>
        <LinkSelection>New</LinkSelection>
      </SideLink>
      <SideLink strict to={"/support/portal/accounts/activeaccounts"}>
        <IconImg>
          <AllSupportersIcon />
        </IconImg>
        <LinkSelection>All</LinkSelection>
      </SideLink>
      <SideLink strict to={"/support/portal/accounts/createaccount"}>
        <IconImg>
          <WaitingSupportersIcon />
        </IconImg>
        <LinkSelection>Create</LinkSelection>
      </SideLink>

      <SideLink strict to={"/support/portal/accounts/accountdetail"}>
        <IconImg>
          <TeamSupportersIcon />
        </IconImg>
        <LinkSelection>Detail</LinkSelection>
      </SideLink>
      <TeamMenu>
        <DropDownSelect
          id="assignmentGroup"
          name="assignmentGroup"
          defaultValue="selectAssignmentGroup"
          onChange={(e) => teamSelected(e.target.value)}
        >
          <option value="selectAssignmentGroup" disabled hidden>
            Team
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
const IconImg = styled.div`
  flex: 1;
`;
const TeamMenu = styled.div`
  display: flex;
  padding-left: 5%;
`;
const DropDownSelect = styled.select`
  text-align: center;
  text-align-last: center;
  min-width: 165px;
  height: 30px;
`;
const TitleLbl = styled.h3`
  text-decoration: underline;
  color: #f1faee;
  padding-left: 5%;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #457b9d;
  flex: 1;
`;
const SideLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  color: #f1faee;
  padding-left: 5%;
  padding-top: 2%;
  padding-bottom: 2%;
  &:hover {
    background-color: #e63946;
  }
`;
const PaddedLink = styled.span`
  font-weight: bold;
`;
const LinkSelection = styled(PaddedLink)`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default AccountSideBar;
