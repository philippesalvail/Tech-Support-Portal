import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import TicketItem from "../../ListItems/TicketItem";
import TicketSectionHeader from "../../SectionHeaders/TicketSectionHeader";

function SupportClosedTickets() {
  const [closedTickets, setClosedTickets] = React.useState(null);
  React.useEffect(() => {
    fetch("/support/tickets/getclosedtickets")
      .then((response) => response.json())
      .then((tickets) => setClosedTickets(tickets.data))
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
            {closedTickets ? (
              <TicketHeader>
                {closedTickets.map((ticket) => {
                  return <TicketItem ticket={ticket} />;
                })}
              </TicketHeader>
            ) : (
              <div></div>
            )}
          </NewTicketItems>
        </NewTicketsDisplay>
      </TicketDashBoard>
    </AdminPage>
  );
}
const SideBar = styled.div`
  flex: 1;
`;

const AdminPage = styled.div`
  display: flex;
  flex-direction: column;
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

export default SupportClosedTickets;
