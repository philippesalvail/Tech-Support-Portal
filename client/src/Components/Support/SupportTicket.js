import React from "react";
import styled from "styled-components";
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import SideBar from "./SideBar";

const SupportTicket = () => {
  const [productTypeSelected, setProductTypeSelected] = React.useState(null);
  const clientAccount = useSelector((state) => state.client);
  const [ticketState, setTicketState] = React.useState("New");
  const [priority, setPriority] = React.useState("Low");
  const [risk, setRisk] = React.useState("Low");
  const [impact, setImpact] = React.useState("Low");
  const [assGroupSelect, setAssGroupSelected] = React.useState([]);

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

  console.log("clientAccount: ", clientAccount);

  return (
    <Portal>
      <SideBar />
      <ClientTicket>
        <SupportTicketBanner>Report an Incident </SupportTicketBanner>
        <TopHalf>
          <TicketNumberProductTypeRow>
            <TicketNumber>
              <TicketNumberLbl>Incident number </TicketNumberLbl>
              <TicketNumberTxt />
            </TicketNumber>
            <ProductType>
              <SelectLbl htmlFor="Products">Product Type </SelectLbl>
              <DropDownSelect
                id="productType"
                name="Product"
                defaultValue="SelectProduct"
              >
                <option value="SelectProduct" disabled hidden>
                  Select Product Type
                </option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="CellPhone">CellPhone</option>
                <option value="Email">Email</option>
              </DropDownSelect>
            </ProductType>
          </TicketNumberProductTypeRow>
          <RequestorAndStateRow>
            <Requestor>
              <RequestorLbl>Requested By </RequestorLbl>
              <RequestorTxt />
            </Requestor>
            <State>
              <SelectLbl htmlFor="State">State </SelectLbl>
              <DropDownSelect
                id="State"
                name="State"
                onChange={(e) => setTicketState(e.currentTarget.value)}
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </DropDownSelect>
            </State>
          </RequestorAndStateRow>
          <PriorityAndAssignmentGroupRow>
            <Priority>
              <SelectLbl htmlFor="Priority">Priority </SelectLbl>
              <DropDownSelect
                id="Priority"
                name="Priority"
                onChange={(e) => setPriority(e.currentTarget.value)}
                defaultValue="SelectPriority"
              >
                <option value="SelectPriority">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </DropDownSelect>
            </Priority>
            <AssignmentGroup>
              <SelectLbl htmlFor="AssignmentGroup">Assignment group </SelectLbl>
              <DropDownSelect
                id="AssignmentGroup"
                name="AssignmentGroup"
                defaultValue="SelectAssignmentGroup"
                onChange={(e) => assignmentGroupSelected(e.target.value)}
              >
                <option value="SelectAssignmentGroup" disabled hidden>
                  Select Assignment Group
                </option>
                <option value="HardwareSupport">Desktop Support</option>
                <option value="ApplicationSupport">Application Support</option>
                <option value="EmailAndCollaboration">
                  Email and Collaboration
                </option>
                <option value="MobileSupport">Mobile Support</option>
              </DropDownSelect>
            </AssignmentGroup>
          </PriorityAndAssignmentGroupRow>
          <RiskAndAssignTooRow>
            <Risk>
              <SelectLbl htmlFor="Risk">Risk </SelectLbl>
              <DropDownSelect
                id="Risk"
                name="Risk"
                onChange={(e) => setRisk(e.currentTarget.value)}
                defaultValue="SelectRisk"
              >
                <option value="SelectRisk" disabled hidden>
                  Select Risk
                </option>
                <option value="Low">Low</option>
                <option value="Moderate">Medium</option>
                <option value="Severe">High</option>
              </DropDownSelect>
            </Risk>
            <AssignToo>
              <SelectLbl htmlFor="Assignee">Select Assignee</SelectLbl>
              <DropDownSelect
                id="Assignee"
                name="Assignee"
                defaultValue="SelectAssignee"
              >
                <option value="SelectAssignee" disabled hidden>
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
              <SelectLbl htmlFor="Impact">Impact </SelectLbl>
              <DropDownSelect
                id="Impact"
                name="Impact"
                onChange={(e) => setImpact(e.currentTarget.value)}
                defaultValue="SelectImpact"
              >
                <option value="SelectImpact" disabled hidden>
                  Select Impact
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </DropDownSelect>
            </Impact>
            <DateOpened>
              <DateLbl>Date Opened</DateLbl>
              <DateTxt />
            </DateOpened>
          </ImpactRow>
        </TopHalf>
        <DescriptionRow>
          <ShortDescription>
            <ShortDescriptionLbl>Short Description </ShortDescriptionLbl>

            <ShortDescriptionTxt />
          </ShortDescription>
          <Description>
            <DescriptionLbl>Description</DescriptionLbl>
            <DescriptionTxt />
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

export default SupportTicket;
