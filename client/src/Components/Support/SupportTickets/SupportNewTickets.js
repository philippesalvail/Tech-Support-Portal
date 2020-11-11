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
  const supportProfile = useSelector((state) => state.supporter);
  let {supporter} = useParams();
  const [newTickets, setNewTickets] = React.useState([]);
  const logOut = () => {
    history.push("/");
  };
  React.useEffect(() => {
    fetch(`/support/tickets/getnewtickets/${supporter}`)
      .then((response) => response.json())
      .then((supporter) => {
        if (supporter.username === "admin") {
          setNewTickets(supporter.data);
        } else {
          dispatch(requestSupporterProfile());
          dispatch(receiveSupporterProfile(supporter));
          setNewTickets(supporter.data);
        }
      })
      .catch((error) => dispatch(receiveSupporterProfileError(error)));
  }, []);

  return (
    <AdminPage>
      <TicketDashBoard>
        {supporter == "admin" ? (
          <SideBar>
            <AdminSideBar />
            <AccountSideBar />
          </SideBar>
        ) : (
          <SideBar>
            <AgentSideBar />
          </SideBar>
        )}

        <TicketsDisplay>
          {supporter !== "admin" ? (
            <SupportTicketBanner>
              <BannerTitle>New Tickets</BannerTitle>
              <BannerUserAccount>
                <Wrapper>
                  {/* {`Welcome: ${clientAccount.loginInfo.given_name} ${clientAccount.loginInfo.family_name}`} */}
                </Wrapper>
              </BannerUserAccount>
            </SupportTicketBanner>
          ) : (
            <SupportTicketBanner>
              <BannerTitle>New Tickets</BannerTitle>
              <BannerUserAccount>
                <Wrapper>Welcome: {supporter} </Wrapper>
                <LogOutBtn>Log Out</LogOutBtn>
              </BannerUserAccount>
            </SupportTicketBanner>
          )}
          <TicketItems>
            <SupportTicketSectionHeader />
            {newTickets ? (
              <TicketHeader>
                {newTickets.map((ticket, index) => {
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
              <div></div>
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
