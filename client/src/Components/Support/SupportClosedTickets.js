import React from "react";
import styled from "styled-components";
import SupportSideBar from "./SupportSideBar";
import ListItem from "../ListItem/ListItem";
import TicketSectionHeader from "../ListItem/TicketSectionHeader";
import Loading from "../Loading";

function SupportClosedTickets() {
  const [closedTickets, setClosedTickets] = React.useState([]);
  React.useEffect(() => {
    fetch("/support/getclosedtickets")
      .then((response) => response.json())
      .then((tickets) => setClosedTickets(tickets.data))
      .catch((error) => console.log("error: ", error));
  }, []);
  return (
    <ClosedTickets>
      <SupportSideBar />
      <ClosedTicketsDisplay>
        <ClosedTicketItems>
          {closedTickets ? (
            <TicketHeader>
              <h2>Resolved Tickets</h2>
              <TicketSectionHeader />
              {closedTickets.map((ticket) => {
                return <ListItem ticket={ticket} />;
              })}
            </TicketHeader>
          ) : (
            <Loader>
              <Loading />
            </Loader>
          )}
        </ClosedTicketItems>
      </ClosedTicketsDisplay>
    </ClosedTickets>
  );
}

const ClosedTickets = styled.div`
  display: flex;
`;
const TicketHeader = styled.div`
  text-align: center;
`;

const ClosedTicketItems = styled.div``;
const ClosedTicketsDisplay = styled.div`
  flex: 5;
`;

const Loader = styled.div`
  postion: relative;
`;

export default SupportClosedTickets;
