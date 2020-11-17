import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import AgentSideBar from "../SideBars/AgentSideBar";
import TicketItem from "../../ListItems/TicketItem";
import SupportTicketSectionHeader from "../../SectionHeaders/SupportTicketSectionHeader";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory, useParams} from "react-router-dom";

import {requestProfile, receiveAdminProfile} from "../../../actions";

function SupportPendingTickets() {
  let history = useHistory();
  const dispatch = useDispatch();
  let {supporter} = useParams();
  const [tickets, setTickets] = React.useState([]);
  const logOut = () => {
    history.push("/");
  };
  const agentProfile = useSelector((state) => state.supporter.agent);
  const adminTickets = useSelector((state) => state.admin.tickets);
  console.log("agentProfile: ", agentProfile);
  React.useEffect(() => {
    dispatch(requestProfile());
    fetch(`/support/tickets/getpendingtickets/${supporter}`)
      .then((response) => response.json())
      .then((supporter) => {
        if (supporter.username === "admin") {
          dispatch(receiveAdminProfile(supporter.data));
        } else {
          setTickets(supporter.getTeamTickets);
        }
      })
      .catch((error) => alert(error.message));
  }, []);

  return (
    <>
      {adminTickets ? (
        <AdminPage>
          <TicketDashBoard>
            <SideBar>
              <AdminSideBar />
              <AccountSideBar />
            </SideBar>
            <TicketsDisplay>
              <SupportTicketBanner>
                <BannerTitle>Pending Tickets</BannerTitle>
                <BannerUserAccount>
                  <Wrapper>Welcome: {supporter}</Wrapper>
                  <LogOutBtn onClick={logOut}>Log Out</LogOutBtn>
                </BannerUserAccount>
              </SupportTicketBanner>

              <TicketItems>
                <SupportTicketSectionHeader />
                {adminTickets ? (
                  <TicketHeader>
                    {adminTickets.map((ticket, index) => {
                      return (
                        <TicketItem
                          key={ticket + index}
                          ticket={ticket}
                          index={index}
                          supporter={supporter}
                        />
                      );
                    })}
                  </TicketHeader>
                ) : (
                  <div></div>
                )}
              </TicketItems>
            </TicketsDisplay>
          </TicketDashBoard>
        </AdminPage>
      ) : (
        <>
          {agentProfile && tickets ? (
            <AdminPage>
              <TicketDashBoard>
                <SideBar>
                  <AgentSideBar supporter={agentProfile.username} />
                </SideBar>
                <TicketsDisplay>
                  <SupportTicketBanner>
                    <BannerTitle>Pending Tickets</BannerTitle>
                    <BannerUserAccount>
                      <Wrapper>Welcome: {agentProfile.name}</Wrapper>
                      <LogOutBtn onClick={logOut}>Log Out</LogOutBtn>
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
                              supporter={supporter}
                            />
                          );
                        })}
                      </TicketHeader>
                    ) : (
                      <div></div>
                    )}
                  </TicketItems>
                </TicketsDisplay>
              </TicketDashBoard>
            </AdminPage>
          ) : (
            <Redirect to={"/"} />
          )}
        </>
      )}
    </>
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

export default SupportPendingTickets;
