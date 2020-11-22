import React from "react";
import ClientSideBar from "../Support/SideBars/ClientSideBar";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import Loading from "../Loading";
import LogOutButton from "../LogButtons/logout-button";
import ClientTicketSectionHeader from "../SectionHeaders/ClientTicketSectionHeader";
import ClientTicketItem from "../ListItems/ClientTicketItem";
import {useParams} from "react-router-dom";
import {ip} from "../Constants";
import {
  requestClientAccount,
  receiveClientAccount,
  receiveClientAccountError,
} from "../../actions";

function AllTickets() {
  const {username} = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestClientAccount());
    fetch(`${ip}/client/getClientProfile/${username}`)
      .then((response) => response.json())
      .then((clientAccount) => dispatch(receiveClientAccount(clientAccount)))
      .catch((error) => dispatch(receiveClientAccountError(error)));
  }, []);

  const clientAccount = useSelector((state) => state.client);
  const tickets = useSelector((state) => state.client.tickets);

  return (
    <>
      {clientAccount.loginInfo ? (
        <DashBoard>
          <SideBar>
            <ClientSideBar username={clientAccount.username} />
          </SideBar>
          <Ticket>
            <SupportTicketBanner>
              <BannerTitle>All Tickets</BannerTitle>
              <BannerUserAccount>
                <Wrapper>
                  {`Welcome: ${clientAccount.loginInfo.given_name} ${clientAccount.loginInfo.family_name}`}
                </Wrapper>
                <LogOutButton />
              </BannerUserAccount>
            </SupportTicketBanner>
            <ClientTicketSectionHeader />
            {tickets.map((ticket, index) => {
              return <ClientTicketItem ticket={ticket} index={index} />;
            })}
          </Ticket>
        </DashBoard>
      ) : (
        <Loading />
      )}
    </>
  );
}

const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Ticket = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 5;
  background-color: #f1faee;
  margin: 0 auto;
`;
const SupportTicketBanner = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 1%;
  background-color: #457b9d;
`;
const BannerTitle = styled.div`
  text-align: left;
`;
const DashBoard = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const BannerUserAccount = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
`;

export default AllTickets;
