import React from "react";
import ClientSideBar from "./ClientSideBar";
import styled from "styled-components";

function ClientClosedTickets() {
  return (
    <Closed>
      <ClientSideBar />
      <ClosedTicketRows>History</ClosedTicketRows>
    </Closed>
  );
}

const Closed = styled.div`
  display: flex;
`;
const ClosedTicketRows = styled.div`
  flex: 5;
`;
export default ClientClosedTickets;
