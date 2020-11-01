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
    <AdminPage>
      <TicketBanner>New Tickets</TicketBanner>
      <TicketDashBoard>
        <SupportSideBar />
        <NewTicketsDisplay>
          <NewTicketItems>
            {newTickets ? (
              <TicketHeader>
                <TicketSectionHeader />
                {newTickets.map((ticket, index) => {
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

export default SupportNewTickets;
