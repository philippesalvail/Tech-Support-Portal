import React from "react";
import styled from "styled-components";
import {NavLink, useHistory} from "react-router-dom";
import AccountSideBar from "./AccountSideBar";

import {
  NewTicketIcon,
  HistoryIcon,
  PendingIcon,
  ClosedIcon,
  TeamIcon,
} from "../../ReactIcons";

function AdminSideBar() {
  let history = useHistory();
  const [teams, setTeams] = React.useState(null);

  React.useEffect(() => {
    fetch("/support/supportteams/getSupportTeams")
      .then((response) => response.json())
      .then((supportTeams) => setTeams(supportTeams.teams))
      .catch((error) => console.log("error: ", error.message));
  }, []);

  const teamSelected = (team) => {
    history.push(`/support/portal/admin/${team}`);
  };

  return (
    <Side>
      <SideLbl>Tickets</SideLbl>
      <SideLink strict to={"/support/portal/admin/newtickets"}>
        <NewTicketIcon />
        <CreateNew>View New</CreateNew>
      </SideLink>
      <SideLink strict to={"/support/portal/admin/pendingtickets"}>
        <PendingIcon />
        <ViewPending>View Pending</ViewPending>
      </SideLink>
      <SideLink strict to={"/support/portal/admin/closedtickets"}>
        <HistoryIcon />
        <ViewHistory>View Resolved</ViewHistory>
      </SideLink>
      <SideLink strict to={"/support/portal/admin/alltickets"}>
        <ClosedIcon />
        <ViewAll>View All</ViewAll>
      </SideLink>
      <TeamMenu>
        <TeamIcon />
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
      <SideLbl>Accounts</SideLbl>
      <AccountSideBar />
    </Side>
  );
}

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
  flex: 1;
  padding-left: 1%;
`;
const SideLink = styled(NavLink)`
  display: flex;
  padding-left: 7%;
  text-decoration: none;
`;
const TeamMenu = styled.div`
  display: flex;
  padding-left: 7%;
`;
const PaddedLink = styled.span`
  font-weight: bold;
`;
const CreateNew = styled(PaddedLink)``;
const ViewPending = styled(PaddedLink)``;
const ViewHistory = styled(PaddedLink)``;
const ViewAll = styled(PaddedLink)``;

export default AdminSideBar;
