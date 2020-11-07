import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import TicketItem from "../../ListItems/TicketItem";
import Loading from "../../Loading";
import TicketSectionHeader from "../../SectionHeaders/TicketSectionHeader";

function SupportPendingTickets() {
  const [pendingTickets, setPendingTickets] = React.useState(null);
  React.useEffect(() => {
    fetch("/support/tickets/getpendingtickets")
      .then((response) => response.json())
      .then((tickets) => setPendingTickets(tickets.data))
      .catch((error) => console.log("error: ", error));
  }, []);

  return (
    <AdminPage>
      <TicketDashBoard>
        <SideBar>
          <AdminSideBar />
          <AccountSideBar />
        </SideBar>
        <NewTicketsDisplay>
          <NewTicketItems>
            <TicketSectionHeader />
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
