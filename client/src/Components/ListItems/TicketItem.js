import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

function TicketItem(props) {
  const {index, ticket, supporter} = props;
  let history = useHistory();
  const ticketDetailHandler = (ticketId, supporter) => {
    history.push(`/support/portal/${supporter}/ticket/${ticketId}`);
  };
  return (
    <Item
      onClick={() => ticketDetailHandler(ticket._id, supporter)}
      index={index}
    >
      <CustomerName>{ticket.customerName}</CustomerName>
      <TicketShortDesc>{ticket.shortDescription}</TicketShortDesc>
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
  background-color: ${(props) =>
    props.index % 2 === 0 ? "#a8dadc" : "#f1faee"};
  color: ${(props) => (props.index % 2 === 0 ? "#1d3557" : "#000000")};
  padding: 1%;
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
