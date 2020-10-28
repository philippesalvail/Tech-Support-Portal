import React from "react";
import styled from "styled-components";
import SupportTicketDetail from "./SupportTicketDetail";
import SupportSideBar from "./SupportSideBar";
import ListItem from "../ListItem/ListItem";
import Loading from "../Loading";
import TicketSectionHeader from "../ListItem/TicketSectionHeader";

function SupportNewTickets() {
  const [newTickets, setNewTickets] = React.useState([]);
  React.useEffect(() => {
    fetch("/support/getnewtickets")
      .then((response) => response.json())
      .then((newTickets) => setNewTickets(newTickets.data))
      .catch((error) => console.log("error: ", error));
  }, []);

  return (
    <NewTickets>
      <SupportSideBar />
      <NewTicketsDisplay>
        <NewTicketItems>
          {newTickets ? (
            <TicketHeader>
              <h2>New Tickets</h2>
              <TicketSectionHeader />
              {newTickets.map((ticket) => {
                return <ListItem ticket={ticket} />;
              })}
            </TicketHeader>
          ) : (
            <div></div>
          )}
        </NewTicketItems>
      </NewTicketsDisplay>
    </NewTickets>
  );
}

const NewTickets = styled.div`
  display: flex;
`;
const TicketHeader = styled.div`
  text-align: center;
`;

const NewTicketItems = styled.div``;
const NewTicketsDisplay = styled.div`
  flex: 5;
`;

const Loader = styled.div`
  postion: relative;
`;
export default SupportNewTickets;
