import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import AgentSideBar from "../SideBars/AgentSideBar";
import TicketItem from "../../ListItems/TicketItem";
import SupportTicketSectionHeader from "../../SectionHeaders/SupportTicketSectionHeader";
import {useSelector, useDispatch} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

import {
  requestSupporterProfile,
  receiveSupporterProfile,
  receiveSupporterProfileError,
} from "../../../actions";

function SupportNewTickets() {
  const dispatch = useDispatch();
  let history = useHistory();
  const agentProfile = useSelector((state) => state.supporter.agent);
  const agentTickets = useSelector((state) => state.supporter.agentTickets);

  let {supporter} = useParams();
  const [tickets, setTickets] = React.useState([]);
  const logOut = () => {
    history.push("/");
  };
  React.useEffect(() => {
    fetch(`/support/tickets/getnewtickets/${supporter}`)
      .then((response) => response.json())
      .then((supporter) => {
        if (supporter.username === "admin") {
          setTickets(supporter.data);
        } else {
          console.log("supporter: ", supporter);
          dispatch(requestSupporterProfile());
          dispatch(receiveSupporterProfile(supporter));
          setTickets(supporter.getAgentTickets);
        }
      })
      .catch((error) => dispatch(receiveSupporterProfileError(error)));
  }, []);

  return (
    <>
      {supporter === "admin" ? (
        <AdminPage>
          <TicketDashBoard>
            <SideBar>
              <AdminSideBar />
              <AccountSideBar />
            </SideBar>
            <TicketsDisplay>
              <SupportTicketBanner>
                <BannerTitle>New Tickets</BannerTitle>
                <BannerUserAccount>
                  <Wrapper>Welcome: {supporter} </Wrapper>
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
        <>
          {agentProfile && agentTickets ? (
            <AdminPage>
              <TicketDashBoard>
                <SideBar>
                  <AgentSideBar supporter={agentProfile.username} />
                </SideBar>
                <TicketsDisplay>
                  <SupportTicketBanner>
                    <BannerTitle>New Tickets</BannerTitle>
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
            <div></div>
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
const BannerTitle = styled.div`
  text-align: left;
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
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const TicketItems = styled.div``;
const TicketsDisplay = styled.div`
  flex: 5;
`;

export default SupportNewTickets;
