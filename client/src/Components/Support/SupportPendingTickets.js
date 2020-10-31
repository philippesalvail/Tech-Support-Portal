import React from "react";
import styled from "styled-components";
import SupportSideBar from "./SupportSideBar";
import ListItem from "../ListItem/ListItem";
import Loading from "../Loading";
import TicketSectionHeader from "../ListItem/TicketSectionHeader";
import AccountSideBar from "./AccountSideBar";

function SupportPendingTickets() {
  const [pendingTickets, setPendingTickets] = React.useState([]);
  React.useEffect(() => {
    fetch("/support/getpendingtickets")
      .then((response) => response.json())
      .then((tickets) => setPendingTickets(tickets.data))
      .catch((error) => console.log("error: ", error));
  }, []);

  return (
    <AdminPage>
      <TicketBanner>Pending Tickets</TicketBanner>
      <TicketDashBoard>
        <SupportSideBar />
        <NewTicketsDisplay>
          <NewTicketItems>
            {pendingTickets ? (
              <TicketHeader>
                <TicketSectionHeader />
                {pendingTickets.map((ticket) => {
                  return <ListItem ticket={ticket} />;
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

const TicketBanner = styled.h2`
  text-align: center;
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

export default SupportPendingTickets;
