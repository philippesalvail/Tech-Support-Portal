import React from "react";
import styled from "styled-components";

function SupportTicketFollowUp(props) {
  console.log("props: ", props);

  const {ticket, supporter} = props;

  return (
    <UpdateContainer>
      <AuthorAndDate>
        {ticket.assigneeUsername === supporter ? (
          <Author>Update added by: You</Author>
        ) : (
          <Author>Update added by: {ticket.assignee}</Author>
        )}
        <TicketDate>Date: {ticket.dateOfUpdate}</TicketDate>
      </AuthorAndDate>
      <UpdateTextArea value={ticket.updateNote} disabled={true} />
    </UpdateContainer>
  );
}

const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1%;
`;

const AuthorAndDate = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;
const Author = styled.div``;
const TicketDate = styled.div``;
const UpdateTextArea = styled.textarea`
  height: 40px;
`;

export default SupportTicketFollowUp;
