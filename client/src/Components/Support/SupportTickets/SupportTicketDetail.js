import React from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import AgentSideBar from "../SideBars/AgentSideBar";
import Loading from "../../Loading";
import SupportTicketFollowUp from "./SupportTicketFollowUp";

const SupportTicketDetail = () => {
  const [priority, setPriority] = React.useState("Low");
  const [risk, setRisk] = React.useState("Select Risk Level");
  const [impact, setImpact] = React.useState("Low");
  const [assGroupMembers, setAssGroupMembers] = React.useState([]);
  const [ticketDetail, setTicketDetail] = React.useState(null);
  const [supportTeams, setSupportTeams] = React.useState([]);
  const [assGroup, setAssGroup] = React.useState("Select Assignment Group");
  const [assignee, setAssignee] = React.useState(null);
  const [ticketStatus, setTicketStatus] = React.useState(null);
  const [followUps, setFollowUps] = React.useState([]);
  const [updateNote, setUpdateNote] = React.useState("");
  const [isUpdated, setIsUpdated] = React.useState(false);

  let {supporter, ticketId} = useParams();

  React.useEffect(() => {
    fetch(`/support/tickets/${ticketId}`)
      .then((response) => response.json())
      .then((ticket) => {
        setTicketDetail(ticket.data);
        setSupportTeams(ticket.teams);
        setImpact(ticket.data.impact);
        setPriority(ticket.data.priority);
        setAssGroup(ticket.data.assignmentGroup);
        setTicketStatus(ticket.data.ticketStatus);
        setAssignee(ticket.data.assignee);
        setRisk(ticket.data.risk);
        setFollowUps(ticket.data.followUps);

        ticket.teams.forEach((element) => {
          if (element.supportName === ticket.data.assignmentGroup) {
            setAssGroupMembers(element.supporters);
          }
        });
      })
      .catch((error) => console.log("error: ", error));
  }, [isUpdated]);

  console.log("assGroupMembers: ", assGroupMembers);

  const addUpdateToTicket = (updateNote) => {
    if (updateNote.length < 4) {
      alert("Please add a valid update");
      return;
    }
    const ticketUpdate = {
      assigneeUsername: supporter,
      assignee: assignee,
      updateNote: updateNote,
      dateOfUpdate:
        new Date().toLocaleDateString() +
        " at " +
        new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
    };

    fetch(`/support/tickets/addNoteToTicket/${ticketId}`, {
      method: "PATCH",
      headers: {"content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({
        ticketUpdate: ticketUpdate,
      }),
    })
      .then((response) => response.json())
      .then((update) => {
        alert(update.message);
        setIsUpdated(!isUpdated);
      })
      .catch((error) => console.log(error.message));
  };

  const assignmentGroupSelected = (group) => {
    console.log("group: ", group);
    setAssGroup(group);
    let team = supportTeams.find((team) => group == team.supportName);
    team && setAssGroupMembers(team.supporters);
  };

  const updateTicket = (e) => {
    e.preventDefault();
    let errorMessage = "";
    if (assGroup === null) {
      errorMessage += "Please select an assignment group\n";
    }
    if (risk === "Select Risk Level") {
      errorMessage += "Select Level of Risk\n";
    }

    if (errorMessage !== "") {
      alert(errorMessage);
      return;
    }

    fetch("/support/tickets/updateTicket", {
      method: "PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        _id: ticketDetail._id,
        customerEmail: ticketDetail.customerEmail,
        customerName: ticketDetail.customerName,
        dateOfTicketCreated: ticketDetail.dateOfTicketCreated,
        description: ticketDetail.description,
        impact: impact,
        priority: priority,
        risk: risk,
        ticketStatus: ticketStatus,
        assignmentGroup: assGroup,
        assignee: assignee,
        followUps: followUps,
      }),
    })
      .then((response) => response.json())
      .then((update) => alert(update.message))
      .catch((error) => alert(error.message));
  };

  return (
    <Portal>
      {supporter === "admin" ? (
        <SideBar>
          <AdminSideBar supporter={supporter} />
          <AccountSideBar supporter={supporter} />
        </SideBar>
      ) : (
        <SideBar>
          <AgentSideBar supporter={supporter} />
        </SideBar>
      )}

      <TicketForm>
        <SupportTicketBanner>Incident Report </SupportTicketBanner>
        {ticketDetail ? (
          <Details>
            <TopHalf>
              <Row>
                <Detail>
                  <TicketNumberLbl>Incident number &nbsp;</TicketNumberLbl>
                  <TicketNumberTxt
                    defaultValue={ticketDetail._id}
                    disabled={supporter !== "admin"}
                    supporter={supporter !== "admin"}
                  />
                </Detail>
                <Detail>
                  <SelectLbl htmlFor="product">Product Type &nbsp;</SelectLbl>
                  <DropDownSelect
                    id="productType"
                    name="product"
                    defaultValue="selectProduct"
                    disabled={supporter !== "admin"}
                    supporter={supporter !== "admin"}
                  >
                    <option value="selectProduct" disabled hidden>
                      {ticketDetail.productType}
                    </option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Software</option>
                    <option value="cellPhone">CellPhone</option>
                    <option value="email">Email</option>
                  </DropDownSelect>
                </Detail>
              </Row>
              <Row>
                <Detail>
                  <RequestorLbl>Requested By &nbsp;</RequestorLbl>
                  <RequestorTxt defaultValue={ticketDetail.customerName} />
                </Detail>
                <Detail>
                  <SelectLbl htmlFor="state">State &nbsp;</SelectLbl>
                  <DropDownSelect
                    id="state"
                    name="state"
                    defaultValue="selectStatus"
                    onChange={(e) => setTicketStatus(e.currentTarget.value)}
                  >
                    <option value="selectStatus" disabled hidden>
                      {ticketStatus ? ticketStatus : "New"}
                    </option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </DropDownSelect>
                </Detail>
              </Row>
              <Row>
                <Detail>
                  <SelectLbl htmlFor="priority">Priority &nbsp;</SelectLbl>
                  <DropDownSelect
                    id="priority"
                    name="priority"
                    onChange={(e) => setPriority(e.currentTarget.value)}
                    defaultValue="selectPriority"
                    disabled={supporter !== "admin"}
                    supporter={supporter !== "admin"}
                  >
                    <option value="selectPriority" disabled hidden>
                      {ticketDetail.priority}
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </DropDownSelect>
                </Detail>
                <Detail>
                  <SelectLbl htmlFor="assignmentGroup">
                    Assignment group
                  </SelectLbl>
                  <DropDownSelect
                    id="assignmentGroup"
                    name="assignmentGroup"
                    defaultValue="selectAssignmentGroup"
                    onChange={(e) => assignmentGroupSelected(e.target.value)}
                    disabled={supporter !== "admin"}
                    supporter={supporter !== "admin"}
                  >
                    <option value="selectAssignmentGroup" disabled hidden>
                      {assGroup ? assGroup : "Select Assignment Group"}
                    </option>
                    {supportTeams.map((team) => {
                      return (
                        <option value={team.supportName}>
                          {team.supportName}
                        </option>
                      );
                    })}
                  </DropDownSelect>
                </Detail>
              </Row>
              <Row>
                <Detail>
                  <SelectLbl htmlFor="risk">Risk </SelectLbl>
                  <DropDownSelect
                    id="risk"
                    name="risk"
                    onChange={(e) => setRisk(e.currentTarget.value)}
                    defaultValue="selectRisk"
                    disabled={supporter !== "admin"}
                    supporter={supporter !== "admin"}
                  >
                    <option value="selectRisk" disabled hidden>
                      {risk ? risk : "Select Risk Level"}
                    </option>
                    <option value="low">Low</option>
                    <option value="moderate">Medium</option>
                    <option value="severe">High</option>
                  </DropDownSelect>
                </Detail>
                <Detail>
                  <SelectLbl htmlFor="assignee">Select Assignee</SelectLbl>
                  <DropDownSelect
                    id="assignee"
                    name="assignee"
                    defaultValue="selectAssignee"
                    onChange={(e) => setAssignee(e.currentTarget.value)}
                  >
                    <option value="selectAssignee" disabled hidden>
                      {assignee ? assignee : "Select Assignee"}
                    </option>
                    {assGroupMembers &&
                      assGroupMembers.map((member) => {
                        return (
                          <option key={member} value={member}>
                            {member}
                          </option>
                        );
                      })}
                  </DropDownSelect>
                </Detail>
              </Row>
              <Row>
                <Detail>
                  <SelectLbl htmlFor="impact">Impact </SelectLbl>
                  <DropDownSelect
                    id="impact"
                    name="impact"
                    onChange={(e) => setImpact(e.currentTarget.value)}
                    defaultValue="selectImpact"
                    disabled={supporter !== "admin"}
                    supporter={supporter !== "admin"}
                  >
                    <option value="selectImpact" disabled hidden>
                      {ticketDetail.impact}
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </DropDownSelect>
                </Detail>
                <Detail>
                  <DateLbl>Date Opened</DateLbl>
                  <DateTxt
                    defaultValue={ticketDetail.dateOfTicketCreated}
                    disabled={supporter !== "admin"}
                    supporter={supporter !== "admin"}
                  />
                </Detail>
              </Row>
            </TopHalf>
            <DescriptionRow>
              <ShortDescription>
                <ShortDescriptionLbl>Short Description </ShortDescriptionLbl>
                <ShortDescriptionTxt
                  defaultValue={ticketDetail.shortDescription}
                  disabled={supporter !== "admin"}
                  supporter={supporter !== "admin"}
                />
              </ShortDescription>
              <Description>
                <DescriptionLbl>Description</DescriptionLbl>
                <DescriptionTxt
                  defaultValue={ticketDetail.description}
                  disabled={supporter !== "admin"}
                  supporter={supporter !== "admin"}
                />
              </Description>
            </DescriptionRow>
            <ButtonRow>
              <ButtonSubmit
                disabled={supporter !== "admin"}
                supporter={supporter !== "admin"}
                onClick={updateTicket}
              >
                Submit
              </ButtonSubmit>
            </ButtonRow>
            {supporter == "admin" &&
              followUps
                .map((ticket) => {
                  return (
                    <SupportTicketFollowUp
                      ticket={ticket}
                      supporter={supporter}
                    />
                  );
                })
                .reverse()}
            {supporter !== "admin" && (
              <TicketNote>
                <NoteContainer>
                  <NoteLbl>Add Update: </NoteLbl>
                  <NoteArea
                    onChange={(e) => {
                      setUpdateNote(e.target.value);
                    }}
                  />
                  <UpdateButtonRow>
                    <UpdateBtn
                      onClick={() => {
                        addUpdateToTicket(updateNote);
                      }}
                    >
                      Update
                    </UpdateBtn>
                  </UpdateButtonRow>
                </NoteContainer>
                {followUps
                  .map((ticket) => {
                    return (
                      <SupportTicketFollowUp
                        ticket={ticket}
                        supporter={supporter}
                      />
                    );
                  })
                  .reverse()}
              </TicketNote>
            )}
          </Details>
        ) : (
          <Loader>
            <Loading />
          </Loader>
        )}
      </TicketForm>
    </Portal>
  );
};
const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const NoteLbl = styled.label``;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1%;
`;

const UpdateBtn = styled.button`
  color: #f1faee;
  font-weight: bold;
  font-size: 15px;
  background-color: #457b9d;
  outline: none;
`;

const UpdateButtonRow = styled.div`
  text-align: right;
`;

const TicketNote = styled.div``;

const NoteArea = styled.textarea`
  margin: 1% 0;
  height: 40px;
`;

const Portal = styled.div`
  display: flex;
  min-height: 100vh;
`;

const TopHalf = styled.div`
  border-bottom: 1px solid black;
`;

const TicketForm = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex: 5;
  background-color: #f1faee;
  min-height: 100vh;
`;
const SupportTicketBanner = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1d3557;
  justify-content: center;
  color: white;
  font-weight: bold;
  padding: 1%;
`;

const Row = styled.div`
  display: flex;
`;
const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin: 1%;
`;
const TicketNumberLbl = styled.label`
  flex: 1;
`;
const TicketNumberTxt = styled.input`
  flex: 1;
  text-align: center;
`;

const DateLbl = styled.label`
  flex: 1;
`;
const DateTxt = styled.input`
  flex: 1;
  text-align: center;
`;

const RequestorLbl = styled.label`
  flex: 1;
`;
const RequestorTxt = styled.input`
  flex: 1;
  text-align: center;
`;

const SelectLbl = styled.label`
  flex: 1;
`;
const DropDownSelect = styled.select`
  text-align: center;
  text-align-last: center;
  flex: 1;
`;

const ShortDescription = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1%;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1%;
`;

const DescriptionRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShortDescriptionLbl = styled.label`
  flex: 1;
`;

const ShortDescriptionTxt = styled.input`
  flex: 3;
`;
const DescriptionLbl = styled.label`
  flex: 1;
`;
const DescriptionTxt = styled.textarea`
  flex: 3;
`;
const ButtonRow = styled.div`
  text-align: right;
`;
const ButtonSubmit = styled.button`
  background-color: #457b9d;
  color: #f1faee;
  font-weight: bold;
  margin: 1%;
  font-size: 15px;
  padding: 1%;
  opacity: ${(props) => (props.supporter ? "0.5" : "1.0")};
`;

const Details = styled.div`
  background-color: #a8dadc;
`;
const Loader = styled.div`
  position: relative;
  flex: 5;
`;

export default SupportTicketDetail;
