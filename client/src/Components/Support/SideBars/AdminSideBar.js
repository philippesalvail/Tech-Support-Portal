import React from "react";
import styled from "styled-components";
import {NavLink, useHistory} from "react-router-dom";
import {ip} from "../../Constants";

import {
  NewTicketIcon,
  HistoryIcon,
  PendingIcon,
  ClosedIcon,
  DisplayNewTicketIcon,
} from "../../../ReactIcons";

function AdminSideBar() {
  let history = useHistory();
  const [teams, setTeams] = React.useState(null);

  React.useEffect(() => {
    fetch(`${ip}/support/supportteams/getSupportTeams`)
      .then((response) => response.json())
      .then((supportTeams) => setTeams(supportTeams.teams))
      .catch((error) => console.log("error: ", error.message));
  }, []);

  const teamSelected = (team) => {
    history.push(`${ip}/support/portal/admin/teamtickets/${team}`);
  };

  return (
    <Side>
      <TitleLbl>Tickets</TitleLbl>
      <SideLink strict to={`${ip}/support/portal/admin/newtickets`}>
        <IconImg>
          <DisplayNewTicketIcon />
        </IconImg>
        <LinkSelection>New</LinkSelection>
      </SideLink>
      <SideLink strict to={`${ip}/support/portal/admin/pendingtickets`}>
        <IconImg>
          <PendingIcon />
        </IconImg>
        <LinkSelection>Pending</LinkSelection>
      </SideLink>
      <SideLink strict to={`${ip}/support/portal/admin/closedtickets`}>
        <IconImg>
          <HistoryIcon />
        </IconImg>
        <LinkSelection>Resolved</LinkSelection>
      </SideLink>
      <SideLink strict to={`${ip}/support/portal/admin/alltickets`}>
        <IconImg>
          <ClosedIcon />
        </IconImg>
        <LinkSelection>All</LinkSelection>
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

const DropDownSelect = styled.select`
  text-align: center;
  text-align-last: center;
  min-width: 164px;
  height: 30px;
  outline: none;
`;
const TitleLbl = styled.h3`
  text-decoration: underline;
  padding-left: 5%;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  color: #f1faee;
  background-color: #457b9d;
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
const TeamMenu = styled.div`
  display: flex;
  padding-left: 5%;
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

export default AdminSideBar;
