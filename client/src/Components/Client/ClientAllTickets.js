import React from "react";
import ClientSideBar from "./ClientSideBar";
import styled from "styled-components";

function AllTickets() {
  return (
    <All>
      <ClientSideBar />
      <AllTicketRows>All Tickets</AllTicketRows>
    </All>
  );
}
const All = styled.div`
  display: flex;
`;
const AllTicketRows = styled.div`
  flex: 5;
`;

export default AllTickets;
