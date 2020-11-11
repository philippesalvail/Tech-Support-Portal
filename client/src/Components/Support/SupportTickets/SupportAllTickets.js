import React from "react";
import {useParams, useHistory} from "react-router-dom";
import styled from "styled-components";
import Loading from "../../Loading";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import TicketItem from "../../ListItems/TicketItem";
import SupportTicketSectionHeader from "../../SectionHeaders/SupportTicketSectionHeader";

function SupportAllTickets() {
  let history = useHistory();
  let {supporter} = useParams();
  const [allTickets, setAllTickets] = React.useState(null);
  React.useEffect(() => {
    fetch(`/support/tickets/getalltickets/${supporter}`)
      .then((response) => response.json())
      .then((tickets) => setAllTickets(tickets.data))
      .catch((error) =>
        console.log("Error in support portal: ", error.message)
      );
  }, []);
  const logOut = () => {
    history.push("/");
  };

  return (
    <AdminPage>
      <TicketDashBoard>
        <SideBar>
          <AdminSideBar />
          <AccountSideBar />
        </SideBar>
        <TicketsDisplay>
          <SupportTicketBanner>
            <BannerTitle>All Tickets</BannerTitle>
            <BannerUserAccount>
              <Wrapper>Welcome: {supporter}</Wrapper>
              <LogOutBtn
                onClick={() => {
                  logOut();
                }}
              >
                Log Out
              </LogOutBtn>
            </BannerUserAccount>
          </SupportTicketBanner>

          <TicketItems>
            <SupportTicketSectionHeader />
            {allTickets ? (
              <TicketHeader>
                {allTickets.map((ticket) => {
                  return <TicketItem ticket={ticket} />;
                })}
              </TicketHeader>
            ) : (
              <Loading />
            )}
          </TicketItems>
        </TicketsDisplay>
      </TicketDashBoard>
    </AdminPage>
  );
}

const LogOutBtn = styled.button`
  color: #f1faee;
  font-weight: bold;
  font-size: 15px;
  background-color: #457b9d;
  outline: none;
`;

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
const BannerTitle = styled.div`
  text-align: left;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SupportTicketBanner = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 1%;
  background-color: #457b9d;
`;
const BannerUserAccount = styled.div`
  display: flex;
`;

const TicketItems = styled.div``;
const TicketsDisplay = styled.div`
  flex: 5;
`;

export default SupportAllTickets;
