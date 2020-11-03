import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

function TicketItem({ticket}) {
  let history = useHistory();
  const ticketDetailHandler = (ticketId) => {
    history.push(`/support/portal/ticket/${ticketId}`);
  };
  return (
    <Item onClick={() => ticketDetailHandler(ticket._id)}>
      <CustomerName>{ticket.customerName}</CustomerName>
      <TicketShortDesc>{ticket.shortDescrption}</TicketShortDesc>
      <TicketPriority>{ticket.priority}</TicketPriority>
      <TicketState>{ticket.ticketStatus}</TicketState>
      <TicketAssignment>
        {ticket.assignmentGroup ? ticket.assignmentGroup : "Unassigned"}
      </TicketAssignment>
      <TicketAssignment>
        {ticket.assignee ? ticket.assignee : "Unassigned"}
      </TicketAssignment>
    </Item>
  );
}

const Item = styled.li`
  display: flex;
  margin-bottom: 1%;
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

export default TicketItem;
