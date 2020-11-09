import React from "react";
import ClientSideBar from "../Support/SideBars/ClientSideBar";
import styled from "styled-components";

function AllTickets() {
  return (
    <All>
      <SideBar>
        <ClientSideBar />
      </SideBar>
      <AllTicketRows>All Tickets</AllTicketRows>
    </All>
  );
}

const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const All = styled.div`
  display: flex;
`;
const AllTicketRows = styled.div`
  flex: 5;
`;

export default AllTickets;
