import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import TicketItem from "../../ListItems/TicketItem";
import TicketSectionHeader from "../../SectionHeaders/TicketSectionHeader";

function SupportNewTickets() {
  const [newTickets, setNewTickets] = React.useState([]);
  React.useEffect(() => {
    fetch("/support/getnewtickets")
      .then((response) => response.json())
      .then((newTickets) => setNewTickets(newTickets.data))
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
            {newTickets ? (
              <TicketHeader>
                <TicketSectionHeader />
                {newTickets.map((ticket, index) => {
                  return <TicketItem key={ticket + index} ticket={ticket} />;
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

export default SupportNewTickets;