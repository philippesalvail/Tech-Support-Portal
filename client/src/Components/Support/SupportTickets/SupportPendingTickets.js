import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import AgentSideBar from "../SideBars/AgentSideBar";
import TicketItem from "../../ListItems/TicketItem";
import Loading from "../../Loading";
import SupportTicketSectionHeader from "../../SectionHeaders/SupportTicketSectionHeader";
import {useParams} from "react-router-dom";

function SupportPendingTickets() {
  let {supporter} = useParams();
  const [pendingTickets, setPendingTickets] = React.useState(null);
  React.useEffect(() => {
    fetch(`/support/tickets/getpendingtickets/${supporter}`)
      .then((response) => response.json())
      .then((tickets) => setPendingTickets(tickets.data))
      .catch((error) => console.log("error: ", error));
  }, []);

  return (
    <AdminPage>
      <TicketDashBoard>
        {supporter == "admin" ? (
          <SideBar>
            <AdminSideBar />
            <AccountSideBar />
          </SideBar>
        ) : (
          <SideBar>
            <AgentSideBar />
          </SideBar>
        )}
        <NewTicketsDisplay>
          <NewTicketItems>
            <SupportTicketSectionHeader />
            {pendingTickets ? (
              <TicketHeader>
                {pendingTickets.map((ticket) => {
                  return <TicketItem ticket={ticket} />;
                })}
              </TicketHeader>
            ) : (
              <Loading />
            )}
          </NewTicketItems>
        </NewTicketsDisplay>
      </TicketDashBoard>
    </AdminPage>
  );
}
const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AdminPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f1faee;
`;

const TicketDashBoard = styled.div`
  display: flex;
`;
const TicketHeader = styled.div`
  text-align: center;
`;

const NewTicketItems = styled.div``;
const NewTicketsDisplay = styled.div`
  flex: 5;
`;

export default SupportPendingTickets;
