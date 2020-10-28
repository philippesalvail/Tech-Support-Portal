import React from "react";
import styled from "styled-components";
import SupportSideBar from "./SupportSideBar";
import ListItem from "../ListItem/ListItem";
import Loading from "../Loading";
import TicketSectionHeader from "../ListItem/TicketSectionHeader";

function SupportPendingTickets() {
  const [pendingTickets, setPendingTickets] = React.useState([]);
  React.useEffect(() => {
    fetch("/support/getpendingtickets")
      .then((response) => response.json())
      .then((tickets) => setPendingTickets(tickets.data))
      .catch((error) => console.log("error: ", error));
  }, []);

  return (
    <PendingTickets>
      <SupportSideBar />
      <PendingTicketsDisplay>
        <PendingTicketItems>
          {pendingTickets ? (
            <TicketHeader>
              <h2>In Progress Tickets</h2>
              <TicketSectionHeader />
              {pendingTickets.map((ticket) => {
                return <ListItem ticket={ticket} />;
              })}
            </TicketHeader>
          ) : (
            <Loader>
              <Loading />
            </Loader>
          )}
        </PendingTicketItems>
      </PendingTicketsDisplay>
    </PendingTickets>
  );
}
const PendingTickets = styled.div`
  display: flex;
`;
const TicketHeader = styled.div`
  text-align: center;
`;

const PendingTicketItems = styled.div``;
const PendingTicketsDisplay = styled.div`
  flex: 5;
`;

const Loader = styled.div`
  postion: relative;
`;
export default SupportPendingTickets;
