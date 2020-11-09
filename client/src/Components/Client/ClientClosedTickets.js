import React from "react";
import ClientSideBar from "../Support/SideBars/ClientSideBar";
import styled from "styled-components";

function ClientClosedTickets() {
  return (
    <Closed>
      <SideBar>
        <ClientSideBar />
      </SideBar>
      <ClosedTicketRows>History</ClosedTicketRows>
    </Closed>
  );
}

const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Closed = styled.div`
  display: flex;
`;
const ClosedTicketRows = styled.div`
  flex: 5;
`;
export default ClientClosedTickets;
