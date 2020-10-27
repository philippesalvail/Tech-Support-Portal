import React from "react";
import styled from "styled-components";
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import SupportSideBar from "./SupportSideBar";

const SupportTicketDetail = () => {
  const [productTypeSelected, setProductTypeSelected] = React.useState(null);
  const clientAccount = useSelector((state) => state.client);
  const [ticketState, setTicketState] = React.useState("New");
  const [priority, setPriority] = React.useState("Low");
  const [risk, setRisk] = React.useState("Low");
  const [impact, setImpact] = React.useState("Low");
  const [assGroupSelect, setAssGroupSelected] = React.useState([]);
  const [ticketDetail, setTicketDetail] = React.useState({});

  let {ticketdetail} = useParams();

  React.useEffect(() => {
    fetch(`/support/${ticketdetail}`)
      .then((response) => response.json())
      .then((ticket) => setTicketDetail(ticket.data))
      .catch((error) => console.log("error: ", error));
  }, []);

  const assignmentGroupSelected = (group) => {
    if (group === "HardwareSupport") {
      let support = ["a", "b", "c"];
      setAssGroupSelected(support);
    } else if (group === "ApplicationSupport") {
      let support = ["d", "e", "f"];
      setAssGroupSelected(support);
    } else if (group === "EmailAndCollaboration") {
      let support = ["g", "h", "i"];
      setAssGroupSelected(support);
    } else if (group === "MobileSupport") {
      let support = ["j", "k", "l"];
      setAssGroupSelected(support);
    }
  };

  console.log("ticket priority: ", ticketDetail);

  return (
    <Portal>
      <SupportSideBar />
      <ClientTicket>
        <SupportTicketBanner>Report an Incident </SupportTicketBanner>
        <TopHalf>
          <TicketNumberProductTypeRow>
            <TicketNumber>
              <TicketNumberLbl>Incident number &nbsp;</TicketNumberLbl>
              <TicketNumberTxt value={ticketDetail._id} />
            </TicketNumber>
            <ProductType>
              <SelectLbl htmlFor="product">Product Type &nbsp;</SelectLbl>
              <DropDownSelect
                id="productType"
                name="product"
                defaultValue="selectProduct"
              >
                <option value={ticketDetail.productType} disabled hidden>
                  Select Product Type
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
              <RequestorTxt value={ticketDetail.customerName} />
            </Requestor>
            <State>
              <SelectLbl htmlFor="state">State &nbsp;</SelectLbl>
              <DropDownSelect
                id="state"
                name="state"
                onChange={(e) => setTicketState(e.currentTarget.value)}
              >
                <option value="new">New</option>
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
                <option value="selectPriority">{ticketDetail.priority}</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </DropDownSelect>
            </Priority>
            <AssignmentGroup>
              <SelectLbl htmlFor="assignmentGroup">Assignment group </SelectLbl>
              <DropDownSelect
                id="assignmentGroup"
                name="assignmentGroup"
                defaultValue="selectAssignmentGroup"
                onChange={(e) => assignmentGroupSelected(e.target.value)}
              >
                <option value="selectAssignmentGroup" disabled hidden>
                  Select Assignment Group
                </option>
                <option value="hardwareSupport">Desktop Support</option>
                <option value="applicationSupport">Application Support</option>
                <option value="emailAndCollaboration">
                  Email and Collaboration
                </option>
                <option value="mobileSupport">Mobile Support</option>
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
                  Select Risk
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
              >
                <option value="selectAssignee" disabled hidden>
                  Select Assignee
                </option>
                {assGroupSelect.map((assignee) => {
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
              <DateTxt value={ticketDetail.dateOfTicketCreated} />
            </DateOpened>
          </ImpactRow>
        </TopHalf>
        <DescriptionRow>
          <ShortDescription>
            <ShortDescriptionLbl>Short Description </ShortDescriptionLbl>
            <ShortDescriptionTxt value={ticketDetail.shortDescrption} />
          </ShortDescription>
          <Description>
            <DescriptionLbl>Description</DescriptionLbl>
            <DescriptionTxt value={ticketDetail.description} />
          </Description>
        </DescriptionRow>
        <ButtonRow>
          <ButtonSubmit>Submit</ButtonSubmit>
        </ButtonRow>
      </ClientTicket>
    </Portal>
  );
};

const Portal = styled.div`
  display: flex;
`;

const TopHalf = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 2%;
`;

const ClientTicket = styled.form`
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

export default SupportTicketDetail;
