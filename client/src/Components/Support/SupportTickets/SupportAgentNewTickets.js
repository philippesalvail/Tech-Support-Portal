import React from "react";
import styled from "styled-components";
import AgentSideBar from "../SideBars/AgentSideBar";
import TicketSectionHeader from "../../SectionHeaders/TicketSectionHeader";
import {useParams} from "react-router-dom";

function SupportAgentNewTickets() {
  let {username} = useParams();
  return (
    <div>Welcome {username}</div>
    // <AdminPage>
    //   <TicketDashBoard>
    //     <SideBar>
    //       <AgentSideBar />
    //     </SideBar>
    //     <NewTicketsDisplay>
    //       <NewTicketItems>
    //         <TicketSectionHeader />
    //         {closedTickets ? (
    //           <TicketHeader>
    //             {closedTickets.map((ticket) => {
    //               return <TicketItem ticket={ticket} />;
    //             })}
    //           </TicketHeader>
    //         ) : (
    //           <div></div>
    //         )}
    //       </NewTicketItems>
    //     </NewTicketsDisplay>
    //   </TicketDashBoard>
    // </AdminPage>
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

export default SupportAgentNewTickets;
