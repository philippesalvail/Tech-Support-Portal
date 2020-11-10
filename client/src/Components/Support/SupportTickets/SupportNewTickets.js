import React from "react";
import styled from "styled-components";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import AgentSideBar from "../SideBars/AgentSideBar";
import TicketItem from "../../ListItems/TicketItem";
import SupportTicketSectionHeader from "../../SectionHeaders/SupportTicketSectionHeader";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import {
  requestSupporterProfile,
  receiveSupporterProfile,
  receiveSupporterProfileError,
} from "../../../actions";

function SupportNewTickets() {
  const dispatch = useDispatch();
  const supportProfile = useSelector((state) => state.supporter);
  let {supporter} = useParams();
  const [newTickets, setNewTickets] = React.useState([]);
  React.useEffect(() => {
    fetch(`/support/tickets/getnewtickets/${supporter}`)
      .then((response) => response.json())
      .then((supporter) => {
        if (supporter.username === "admin") {
          setNewTickets(supporter.data);
        } else {
          dispatch(requestSupporterProfile());
          dispatch(receiveSupporterProfile(supporter));
        }
      })
      .catch((error) => dispatch(receiveSupporterProfileError(error)));
  }, []);
  if (supportProfile) {
    console.log("supportProfile: ", supportProfile);
  }

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

        <NewTicketsDisplay>
          <NewTicketItems>
            <SupportTicketSectionHeader />
            {newTickets ? (
              <TicketHeader>
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

const NewTicketItems = styled.div``;
const NewTicketsDisplay = styled.div`
  flex: 5;
`;

export default SupportNewTickets;
