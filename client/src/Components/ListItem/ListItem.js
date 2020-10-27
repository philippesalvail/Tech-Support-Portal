import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

function ListItem({ticket}) {
  let history = useHistory();
  const ticketDetailHandler = (ticketId) => {
    history.push(`/support/portal/${ticketId}`);
  };
  return (
    <TicketItem onClick={() => ticketDetailHandler(ticket._id)}>
      <CustomerName>{ticket.customerName}</CustomerName>
      <TicketShortDesc>{ticket.shortDescrption}</TicketShortDesc>
      <TicketCategory>{ticket.productType}</TicketCategory>
      <TicketPriority>{ticket.priority}</TicketPriority>
      <TicketState>{ticket.ticketStatus}</TicketState>
      <TicketAssignment>
        {ticket.assignmentGroup ? ticket.assignmentGroup : "Unassigned"}
      </TicketAssignment>
      <TicketAssignment>
        {ticket.assignee ? ticket.assignee : "Unassigned"}
      </TicketAssignment>
    </TicketItem>
  );
}

const TicketItem = styled.li`
  display: flex;
`;
const TicketId = styled.div`
  flex: 1;
`;
const CustomerName = styled.div`
  flex: 1;
  text-align: left;
`;
const TicketShortDesc = styled.div`
  flex: 1;
  text-align: left;
`;
const TicketCategory = styled.div`
  flex: 1;
  text-align: left;
`;
const TicketPriority = styled.div`
  flex: 1;
  text-align: left;
`;
const TicketState = styled.div`
  flex: 1;
  text-align: left;
`;
const TicketAssignment = styled.div`
  flex: 1;
  text-align: left;
`;

export default ListItem;
