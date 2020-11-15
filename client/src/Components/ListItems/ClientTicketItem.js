import React from "react";
import {user} from "react-icons-kit/ikons/user";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

function ClientTicketItem(props) {
  let history = useHistory();
  const {ticket, index, setResetList, resetList} = props;
  console.log("ticket: ", ticket);
  const clientTicketDetailHandler = (ticketId) => {
    setResetList(!resetList);
    history.push(`/client/portal/ticket/${ticketId}`);
  };
  return (
    <>
      {ticket && (
        <Ticket
          index={index}
          onClick={() => clientTicketDetailHandler(ticket._id)}
        >
          <Detail>{ticket.shortDescription}</Detail>
          <Detail>{ticket.priority}</Detail>
          <Detail>{ticket.productType}</Detail>
          <Detail>{ticket.ticketStatus}</Detail>
          <Detail>{ticket.assignee ? ticket.assignee : "unassigned"}</Detail>
        </Ticket>
      )}
    </>
  );
}

const Detail = styled.div`
  flex: 1;
  text-align: left;
`;

const Ticket = styled.li`
  display: flex;
  background-color: ${(props) =>
    props.index % 2 === 0 ? "#a8dadc" : "#f1faee"};
  color: ${(props) => (props.index % 2 === 0 ? "#1d3557" : "#000000")};
  font-weight: bold;
  padding-left: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
`;

export default ClientTicketItem;
