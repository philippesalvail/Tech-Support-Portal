import React from "react";
import SideBar from "./SideBar";
import styled from "styled-components";

function ClosedTickets() {
  return (
    <Closed>
      <SideBar />
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
export default ClosedTickets;
