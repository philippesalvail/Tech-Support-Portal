import React from "react";
import styled from "styled-components";

const ticketDetailHandler = (event) => {
  console.log("ticketDetailHandler: ", event);
};

function ListItem({ticket}) {
  return (
    <TicketItem onClick={() => ticketDetailHandler(ticket._id)}>
      <TicketId>{ticket._id}</TicketId>
      <CustomerName>{ticket.customerName}</CustomerName>
      <TicketShortDesc>{ticket.shortDescrption}</TicketShortDesc>
      <TicketCategory>{ticket.productType}</TicketCategory>
      <TicketPriority>{ticket.priority}</TicketPriority>
      <TicketState>{ticket.ticketStatus}</TicketState>
      <TicketAssignment>
        {ticket.assignmentGroup ? ticket.assignmentGroup : "No Group Assigned"}
      </TicketAssignment>
      <TicketAssignment>
        {ticket.assignee ? ticket.assignee : "No Assignee"}
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
`;
const TicketShortDesc = styled.div`
  flex: 1;
`;
const TicketCategory = styled.div`
  flex: 1;
`;
const TicketPriority = styled.div`
  flex: 1;
`;
const TicketState = styled.div`
  flex: 1;
`;
const TicketAssignment = styled.div`
  flex: 1;
`;

export default ListItem;
