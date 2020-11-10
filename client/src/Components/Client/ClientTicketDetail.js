import React from "react";
import styled from "styled-components";
import {useHistory, useParams} from "react-router-dom";
import ClientSideBar from "../Support/SideBars/ClientSideBar";
import {useSelector, useDispatch} from "react-redux";
import LogOutButton from "../LogButtons/logout-button";

function ClientTicketDetail() {
  const {ticketnumber} = useParams();
  const clientAccount = useSelector((state) => state.client);
  return (
    <TicketDetail>
      <SideBar>
        <ClientSideBar username={clientAccount.username} />
      </SideBar>
      <Ticket>
        <SupportTicketBanner>
          <BannerTitle>Incident number: {ticketnumber}</BannerTitle>
          <BannerUserAccount>
            <Wrapper>
              {`Welcome: ${clientAccount.loginInfo.given_name} ${clientAccount.loginInfo.family_name}`}
            </Wrapper>
            <LogOutButton />
          </BannerUserAccount>
        </SupportTicketBanner>
      </Ticket>
    </TicketDetail>
  );
}

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
const BannerUserAccount = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
`;
const Wrapper = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TicketDetail = styled.div`
  display: flex;
`;
const Ticket = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 5;
  background-color: #a8dadc;
  margin: 0 auto;
`;
const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default ClientTicketDetail;
