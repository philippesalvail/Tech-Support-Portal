import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import AgentSideBar from "../SideBars/AgentSideBar";
import TicketItem from "../../ListItems/TicketItem";
import SupportTicketSectionHeader from "../../SectionHeaders/SupportTicketSectionHeader";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import {
  requestSupporterProfile,
  receiveSupporterProfile,
  receiveSupporterProfileError,
} from "../../../actions";

function SupportResolvedTickets() {
  const dispatch = useDispatch();
  let history = useHistory();
  let {supporter} = useParams();
  const [tickets, setTickets] = React.useState(null);
  const logOut = () => {
    history.push("/");
  };
  React.useEffect(() => {
    fetch(`/support/tickets/getresolvedtickets/${supporter}`)
      .then((response) => response.json())
      .then((supporter) => {
        if (supporter.username === "admin") {
          setTickets(supporter.data);
        } else {
          dispatch(requestSupporterProfile());
          dispatch(receiveSupporterProfile(supporter));
        }
      })
      .catch((error) => dispatch(receiveSupporterProfileError(error)));
  }, []);

  return (
    <AdminPage>
      <TicketDashBoard>
        <SideBar>
          <AdminSideBar />
          <AccountSideBar />
        </SideBar>
        <TicketsDisplay>
          {supporter !== "admin" ? (
            <SupportTicketBanner>
              <BannerTitle>Resolved Tickets</BannerTitle>
              <BannerUserAccount>
                <Wrapper>
                  {/* {`Welcome: ${clientAccount.loginInfo.given_name} ${clientAccount.loginInfo.family_name}`} */}
                </Wrapper>
              </BannerUserAccount>
            </SupportTicketBanner>
          ) : (
            <SupportTicketBanner>
              <BannerTitle>Resolved Tickets</BannerTitle>
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
          )}
          <TicketItems>
            <SupportTicketSectionHeader />
            {tickets ? (
              <TicketHeader>
                {tickets.map((ticket) => {
                  return <TicketItem ticket={ticket} />;
                })}
              </TicketHeader>
            ) : (
              <div></div>
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

export default SupportResolvedTickets;
