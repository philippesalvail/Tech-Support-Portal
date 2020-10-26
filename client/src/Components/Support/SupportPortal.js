import React from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import Loading from "../Loading";
import SupportSideBar from "./SupportSideBar";
import ListItem from "../ListItem/ListItem";

function SupportPortal() {
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
    <Portal>
      <SupportSideBar />
      {allTickets ? (
        <TicketHeader>
          <h2>Tickets Pending</h2>
          {allTickets.map((ticket) => {
            return <ListItem ticket={ticket} />;
          })}
        </TicketHeader>
      ) : (
        <Loader>
          <Loading />
        </Loader>
      )}
    </Portal>
  );
}

const Portal = styled.div`
  display: flex;
`;

const TicketHeader = styled.div`
  text-align: center;
  flex: 5;
`;

const Loader = styled.div`
  flex: 5;
`;

export default SupportPortal;
