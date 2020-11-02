import React from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import Loading from "../Loading";
import AdminSideBar from "./AdminSideBar";
import ListItem from "../ListItem/ListItem";
import TicketSectionHeader from "../ListItem/TicketSectionHeader";

function SupportTeamTickets() {
  const [tickets, setTickets] = React.useState(null);
  let {teamtickets} = useParams();
  React.useEffect(() => {
    console.log("called");
    fetch(`/support/supportteams/${teamtickets}`)
      .then((response) => response.json())
      .then((supportTeams) => setTickets(supportTeams.tickets))
      .catch((error) => console.log("error: ", error.message));
  }, [teamtickets]);

  return (
    <AdminPage>
      <TicketDashBoard>
        <AdminSideBar />
        <NewTicketsDisplay>
          <NewTicketItems>
            {tickets ? (
              <TicketHeader>
                <TicketSectionHeader />
                {tickets.map((ticket, index) => {
                  return <ListItem key={ticket + index} ticket={ticket} />;
                })}
              </TicketHeader>
            ) : (
              <div></div>
            )}
          </NewTicketItems>
        </NewTicketsDisplay>
      </TicketDashBoard>
    </AdminPage>
  );
}

const AdminPage = styled.div`
  display: flex;
  flex-direction: column;
`;

const TicketDashBoard = styled.div`
  display: flex;
`;
const TicketHeader = styled.div`
  text-align: center;
`;

const NewTicketItems = styled.div``;
const NewTicketsDisplay = styled.div`
  flex: 4;
`;

export default SupportTeamTickets;
