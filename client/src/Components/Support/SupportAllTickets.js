import React from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import Loading from "../Loading";
import SupportSideBar from "./SupportSideBar";
import ListItem from "../ListItem/ListItem";
import TicketSectionHeader from "../ListItem/TicketSectionHeader";

function SupportAllTickets() {
  const [allTickets, setAllTickets] = React.useState([]);
  React.useEffect(() => {
    fetch("/support/getalltickets")
      .then((response) => response.json())
      .then((tickets) => setAllTickets(tickets.data))
      .catch((error) =>
        console.log("Error in support portal: ", error.message)
      );
  }, []);

  return (
    <AdminPage>
      <TicketBanner>All Tickets</TicketBanner>
      <TicketDashBoard>
        <SupportSideBar />
        <NewTicketsDisplay>
          <NewTicketItems>
            {allTickets ? (
              <TicketHeader>
                <TicketSectionHeader />
                {allTickets.map((ticket) => {
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

export default SupportAllTickets;
