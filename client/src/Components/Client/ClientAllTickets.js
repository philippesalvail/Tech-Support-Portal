import React from "react";
import SideBar from "./SideBar";
import styled from "styled-components";

function AllTickets() {
  return (
    <All>
      <SideBar />
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
