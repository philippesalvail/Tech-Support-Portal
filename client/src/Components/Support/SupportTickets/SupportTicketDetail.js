import React from "react";
import styled from "styled-components";
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import Loading from "../../Loading";

const SupportTicketDetail = () => {
  const [productTypeSelected, setProductTypeSelected] = React.useState(null);
  const [ticketState, setTicketState] = React.useState("New");
  const [priority, setPriority] = React.useState("Low");
  const [risk, setRisk] = React.useState("Select Risk Level");
  const [impact, setImpact] = React.useState("Low");
  const [assGroupMembers, setAssGroupMembers] = React.useState([]);
  const [ticketDetail, setTicketDetail] = React.useState(null);
  const [supportTeams, setSupportTeams] = React.useState([]);
  const [assGroup, setAssGroup] = React.useState("Select Assignment Group");
  const [assignee, setAssignee] = React.useState(null);

  let {ticketId} = useParams();

  React.useEffect(() => {
    fetch(`/support/${ticketId}`)
      .then((response) => response.json())
      .then((ticket) => {
        setTicketDetail(ticket.data);
        setSupportTeams(ticket.teams);
        setImpact(ticket.data.impact);
        setPriority(ticket.data.priority);
      })
      .catch((error) => console.log("error: ", error));
  }, []);

  const assignmentGroupSelected = (group) => {
    setAssGroup(group);
    let team = supportTeams.find((team) => group == team.supportName);
    team && setAssGroupMembers(team.supporters);
  };

  const updateTicket = (e) => {
    e.preventDefault();
    let errorMessage = "";
    if (ticketState === "New") {
      errorMessage += "Please change the state of the ticket\n";
    }
    if (assGroup === "Select Assignment Group") {
      errorMessage += "Please select an assignment group\n";
    }
    if (risk === "Select Risk Level") {
      errorMessage += "Select Level of Risk\n";
    }

    if (errorMessage !== "") {
      alert(errorMessage);
      return;
    }

    fetch("/support/updateTicket", {
      method: "put",
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
        ticketStatus: ticketState,
        assignmentGroup: assGroup,
        assignee: assignee,
      }),
    });
  };

  return (
    <Portal>
      <SideBar>
        <AdminSideBar />
        <AccountSideBar />
      </SideBar>
      <TicketForm onSubmit={updateTicket}>
        <SupportTicketBanner>Incident Report </SupportTicketBanner>
        {ticketDetail ? (
          <Details>
            <TopHalf>
              <TicketNumberProductTypeRow>
                <TicketNumber>
                  <TicketNumberLbl>Incident number &nbsp;</TicketNumberLbl>
                  <TicketNumberTxt defaultValue={ticketDetail._id} />
                </TicketNumber>
                <ProductType>
                  <SelectLbl htmlFor="product">Product Type &nbsp;</SelectLbl>
                  <DropDownSelect
                    id="productType"
                    name="product"
                    defaultValue="selectProduct"
                  >
                    <option value="selectProduct" disabled hidden>
                      {ticketDetail.productType}
                    </option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Software</option>
                    <option value="cellPhone">CellPhone</option>
                    <option value="email">Email</option>
                  </DropDownSelect>
                </ProductType>
              </TicketNumberProductTypeRow>
              <RequestorAndStateRow>
                <Requestor>
                  <RequestorLbl>Requested By &nbsp;</RequestorLbl>
                  <RequestorTxt defaultValue={ticketDetail.customerName} />
                </Requestor>
                <State>
                  <SelectLbl htmlFor="state">State &nbsp;</SelectLbl>
                  <DropDownSelect
                    id="state"
                    name="state"
                    defaultValue="new"
                    onChange={(e) => setTicketState(e.currentTarget.value)}
                  >
                    <option value="new">
                      {ticketDetail.ticketStatus
                        ? ticketDetail.ticketStatus
                        : "New"}
                    </option>
                    <option value="In Progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </DropDownSelect>
                </State>
              </RequestorAndStateRow>
              <PriorityAndAssignmentGroupRow>
                <Priority>
                  <SelectLbl htmlFor="priority">Priority &nbsp;</SelectLbl>
                  <DropDownSelect
                    id="priority"
                    name="priority"
                    onChange={(e) => setPriority(e.currentTarget.value)}
                    defaultValue="selectPriority"
                  >
                    <option value="selectPriority">
                      {ticketDetail.priority}
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </DropDownSelect>
                </Priority>
                <AssignmentGroup>
                  <SelectLbl htmlFor="assignmentGroup">
                    Assignment group
                  </SelectLbl>
                  <DropDownSelect
                    id="assignmentGroup"
                    name="assignmentGroup"
                    defaultValue="selectAssignmentGroup"
                    onChange={(e) => assignmentGroupSelected(e.target.value)}
                  >
                    <option value="selectAssignmentGroup" disabled hidden>
                      {ticketDetail.assignmentGroup
                        ? ticketDetail.assignmentGroup
                        : "Select Assignment Group"}
                    </option>
                    {supportTeams.map((team) => {
                      return (
                        <option value={team.supportName}>
                          {team.supportName}
                        </option>
                      );
                    })}
                  </DropDownSelect>
                </AssignmentGroup>
              </PriorityAndAssignmentGroupRow>
              <RiskAndAssignTooRow>
                <Risk>
                  <SelectLbl htmlFor="risk">Risk </SelectLbl>
                  <DropDownSelect
                    id="risk"
                    name="risk"
                    onChange={(e) => setRisk(e.currentTarget.value)}
                    defaultValue="selectRisk"
                  >
                    <option value="selectRisk" disabled hidden>
                      {ticketDetail.risk
                        ? ticketDetail.risk
                        : "Select Risk Level"}
                    </option>
                    <option value="low">Low</option>
                    <option value="moderate">Medium</option>
                    <option value="severe">High</option>
                  </DropDownSelect>
                </Risk>
                <AssignToo>
                  <SelectLbl htmlFor="assignee">Select Assignee</SelectLbl>
                  <DropDownSelect
                    id="assignee"
                    name="assignee"
                    defaultValue="selectAssignee"
                    onChange={(e) => setAssignee(e.currentTarget.value)}
                  >
                    <option value="selectAssignee" disabled hidden>
                      {ticketDetail.assignee
                        ? ticketDetail.assignee
                        : "Select Assignee"}
                    </option>
                    {assGroupMembers.map((assignee) => {
                      return (
                        <option key={assignee} value={assignee}>
                          {assignee}
                        </option>
                      );
                    })}
                  </DropDownSelect>
                </AssignToo>
              </RiskAndAssignTooRow>
              <ImpactRow>
                <Impact>
                  <SelectLbl htmlFor="impact">Impact </SelectLbl>
                  <DropDownSelect
                    id="impact"
                    name="impact"
                    onChange={(e) => setImpact(e.currentTarget.value)}
                    defaultValue="selectImpact"
                  >
                    <option value="selectImpact" disabled hidden>
                      {ticketDetail.impact}
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </DropDownSelect>
                </Impact>
                <DateOpened>
                  <DateLbl>Date Opened</DateLbl>
                  <DateTxt defaultValue={ticketDetail.dateOfTicketCreated} />
                </DateOpened>
              </ImpactRow>
            </TopHalf>
            <DescriptionRow>
              <ShortDescription>
                <ShortDescriptionLbl>Short Description </ShortDescriptionLbl>
                <ShortDescriptionTxt
                  defaultValue={ticketDetail.shortDescrption}
                />
              </ShortDescription>
              <Description>
                <DescriptionLbl>Description</DescriptionLbl>
                <DescriptionTxt defaultValue={ticketDetail.description} />
              </Description>
            </DescriptionRow>
            <ButtonRow>
              <ButtonSubmit>Submit</ButtonSubmit>
            </ButtonRow>
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
`;

const Portal = styled.div`
  display: flex;
`;

const TopHalf = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 2%;
`;

const TicketForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex: 5;
  margin: 0 auto;
`;
const SupportTicketBanner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #428bca;
  justify-content: center;
  color: white;
  padding: 1%;
`;

const TicketNumberProductTypeRow = styled.div`
  display: flex;
`;
const TicketNumber = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
const TicketNumberLbl = styled.label`
  flex: 1;
`;
const TicketNumberTxt = styled.input`
  flex: 1;
  text-align: center;
`;

const DateOpened = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
const DateLbl = styled.label`
  flex: 1;
`;
const DateTxt = styled.input`
  flex: 1;
  text-align: center;
`;

const ProductType = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const RequestorAndStateRow = styled.div`
  display: flex;
`;
const Requestor = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
const RequestorLbl = styled.label`
  flex: 1;
`;
const RequestorTxt = styled.input`
  flex: 1;
  text-align: center;
`;

const State = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const PriorityAndAssignmentGroupRow = styled.div`
  display: flex;
`;
const Priority = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
const SelectLbl = styled.label`
  flex: 1;
`;
const DropDownSelect = styled.select`
  text-align: center;
  text-align-last: center;
  flex: 1;
`;

const AssignmentGroup = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const RiskAndAssignTooRow = styled.div`
  display: flex;
`;

const Risk = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const AssignToo = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
const ImpactRow = styled.div`
  display: flex;
`;

const Impact = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const ShortDescription = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
`;

const DescriptionRow = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2%;
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
  padding: 1%;
  text-align: right;
`;
const ButtonSubmit = styled.button``;

const Details = styled.div``;
const Loader = styled.div`
  position: relative;
  flex: 5;
`;

export default SupportTicketDetail;
