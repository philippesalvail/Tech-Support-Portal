import React from "react";
import ClientSideBar from "./ClientSideBar";
import styled from "styled-components";
function ClientPendingTickets() {
  return (
    <Pending>
      <ClientSideBar />
      <TicketRows>Pending Tickets</TicketRows>
    </Pending>
  );
}
const Pending = styled.div`
  display: flex;
`;

const TicketRows = styled.div`
  flex: 5;
`;

export default ClientPendingTickets;
