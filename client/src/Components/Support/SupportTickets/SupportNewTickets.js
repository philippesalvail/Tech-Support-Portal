import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import AgentSideBar from "../SideBars/AgentSideBar";
import TicketItem from "../../ListItems/TicketItem";
import SupportTicketSectionHeader from "../../SectionHeaders/SupportTicketSectionHeader";
import {useSelector, useDispatch} from "react-redux";
import {useHistory, useParams, Redirect} from "react-router-dom";
import Loading from "../../Loading";
import {ip} from "../../Constants";
import {
  requestSupporterProfile,
  receiveSupporterProfile,
  receiveSupporterProfileError,
  requestProfile,
  receiveAdminProfile,
} from "../../../actions";

function SupportNewTickets() {
  const dispatch = useDispatch();
  let history = useHistory();
  const agentProfile = useSelector((state) => state.supporter.agent);
  const agentTickets = useSelector((state) => state.supporter.agentTickets);
  const adminTickets = useSelector((state) => state.admin.tickets);
  const status = useSelector((state) => state.admin.status);
  let {supporter} = useParams();
  const [tickets, setTickets] = React.useState([]);
  const logOut = () => {
    history.push("/");
  };
  React.useEffect(() => {
    dispatch(requestProfile());
    fetch(`${ip}/support/tickets/getnewtickets/${supporter}`)
      .then((response) => response.json())
      .then((supporter) => {
        if (supporter.username === "admin") {
          console.log("supporter: ", supporter);
          dispatch(receiveAdminProfile(supporter.data));
        } else {
          console.log("supporter: ", supporter);
          dispatch(receiveSupporterProfile(supporter));
          setTickets(supporter.getAgentTickets);
        }
      })
      .catch((error) => dispatch(receiveSupporterProfileError(error)));
  }, []);

  if (status === "loading") {
    return <Loading />;
  }
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
                <BannerTitle>New Tickets</BannerTitle>
                <BannerUserAccount>
                  <Wrapper>Welcome: {supporter} </Wrapper>
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
            <Loading />
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
