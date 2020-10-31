import React from "react";
import styled from "styled-components";
import SupportSideBar from "./SupportSideBar";
import ListItem from "../ListItem/ListItem";
import TicketSectionHeader from "../ListItem/TicketSectionHeader";
import Loading from "../Loading";
import AccountSideBar from "./AccountSideBar";

function SupportClosedTickets() {
  const [closedTickets, setClosedTickets] = React.useState([]);
  React.useEffect(() => {
    fetch("/support/getclosedtickets")
      .then((response) => response.json())
      .then((tickets) => setClosedTickets(tickets.data))
      .catch((error) => console.log("error: ", error));
  }, []);
  return (
    <AdminPage>
      <TicketBanner>Closed Tickets</TicketBanner>
      <TicketDashBoard>
        <SupportSideBar />
        <NewTicketsDisplay>
          <NewTicketItems>
            {closedTickets ? (
              <TicketHeader>
                <TicketSectionHeader />
                {closedTickets.map((ticket) => {
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

export default SupportClosedTickets;
