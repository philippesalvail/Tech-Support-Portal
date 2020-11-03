import React from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import Loading from "../../Loading";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import TicketItem from "../../ListItems/TicketItem";
import TicketSectionHeader from "../../SectionHeaders/TicketSectionHeader";

function SupportAllTickets() {
  const [allTickets, setAllTickets] = React.useState(null);
  React.useEffect(() => {
    fetch("/support/getalltickets")
      .then((response) => response.json())
      .then((tickets) => setAllTickets(tickets.data))
      .catch((error) =>
        console.log("Error in support portal: ", error.message)
      );
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
            {allTickets ? (
              <TicketHeader>
                {allTickets.map((ticket) => {
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

export default SupportAllTickets;
