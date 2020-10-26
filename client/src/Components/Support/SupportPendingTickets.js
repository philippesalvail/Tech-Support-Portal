import React from "react";
import styled from "styled-components";
import SupportSideBar from "./SupportSideBar";

function SupportPendingTickets() {
  return (
    <Pending>
      <SupportSideBar />
      <PendingBanner>SupportPendingTickets</PendingBanner>
    </Pending>
  );
}
const Pending = styled.div`
  display: flex;
`;
const PendingBanner = styled.div`
  flex: 5;
`;
export default SupportPendingTickets;
