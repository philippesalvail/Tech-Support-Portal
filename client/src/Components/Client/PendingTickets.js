import React from "react";
import SideBar from "./SideBar";
import styled from "styled-components";
function PendingTickets() {
  return (
    <Pending>
      <SideBar />
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

export default PendingTickets;
