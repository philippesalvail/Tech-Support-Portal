import React from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import Loading from "../../Loading";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import TicketItem from "../../ListItems/TicketItem";
import TicketSectionHeader from "../../SectionHeaders/TicketSectionHeader";

function SupportTeamTickets() {
  const [tickets, setTickets] = React.useState(null);
  let {teamtickets} = useParams();
  React.useEffect(() => {
    console.log("called");
    fetch(`/support/supportteams/tickets/${teamtickets}`)
      .then((response) => response.json())
      .then((supportTeams) => setTickets(supportTeams.tickets))
      .catch((error) => console.log("error: ", error.message));
  }, [teamtickets]);

  return (
    <AdminPage>
      <TicketDashBoard>
        <SideBar>
          <AdminSideBar />
          <AccountSideBar />
        </SideBar>
        <NewTicketsDisplay>
          <NewTicketItems>
            <TicketSectionHeader />
            {tickets ? (
              <TicketHeader>
                {tickets.map((ticket, index) => {
                  return <TicketItem key={ticket + index} ticket={ticket} />;
                })}
              </TicketHeader>
            ) : (
              <Loading />
            )}
          </NewTicketItems>
        </NewTicketsDisplay>
      </TicketDashBoard>
    </AdminPage>
  );
}
const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AdminPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f1faee;
`;

const TicketDashBoard = styled.div`
  display: flex;
`;
const TicketHeader = styled.div`
  text-align: center;
`;

const NewTicketItems = styled.div``;
const NewTicketsDisplay = styled.div`
  flex: 5;
`;

export default SupportTeamTickets;
