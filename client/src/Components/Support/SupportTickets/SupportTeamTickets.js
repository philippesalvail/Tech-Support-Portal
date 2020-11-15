import React from "react";
import {useParams, useHistory} from "react-router-dom";
import styled from "styled-components";
import Loading from "../../Loading";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import TicketItem from "../../ListItems/TicketItem";
import SupportTicketSectionHeader from "../../SectionHeaders/SupportTicketSectionHeader";

function SupportTeamTickets() {
  let history = useHistory();
  const [tickets, setTickets] = React.useState(null);
  let {teamtickets} = useParams();
  const logOut = () => {
    history.push("/");
  };
  React.useEffect(() => {
    fetch(`/support/supportteams/tickets/${teamtickets}`)
      .then((response) => response.json())
      .then((supportTeams) => setTickets(supportTeams.tickets))
      .catch((error) => console.log("error: ", error.message));
  }, [teamtickets]);

  return (
    <AdminPage>
      <TicketDashBoard>
        <SideBar>
          <AdminSideBar />
          <AccountSideBar />
        </SideBar>
        <TicketsDisplay>
          <SupportTicketBanner>
            <BannerTitle>{teamtickets} Tickets</BannerTitle>
            <BannerUserAccount>
              <Wrapper>Welcome: Admin</Wrapper>
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
            {tickets ? (
              <TicketHeader>
                {tickets.map((ticket, index) => {
                  return (
                    <TicketItem
                      key={ticket + index}
                      ticket={ticket}
                      index={index}
                    />
                  );
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
const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LogOutBtn = styled.button`
  color: #f1faee;
  font-weight: bold;
  font-size: 15px;
  background-color: #457b9d;
  outline: none;
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

const TicketItems = styled.div``;
const TicketsDisplay = styled.div`
  flex: 5;
`;

export default SupportTeamTickets;
