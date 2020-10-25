import React from "react";
import styled from "styled-components";
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import SideBar from "./SideBar";

import {useAuth0} from "@auth0/auth0-react";

const ClientTicket = () => {
  const {user, isAuthenticated, isLoading, getTokenSilently} = useAuth0();
  const [productTypeSelected, setProductTypeSelected] = React.useState(null);
  const clientAccount = useSelector((state) => state.client);
  const [ticketState, setTicketState] = React.useState("New");
  const [priority, setPriority] = React.useState("Low");
  const [risk, setRisk] = React.useState("Low");
  const [impact, setImpact] = React.useState("Low");
  const [assGroupSelect, setAssGroupSelected] = React.useState([]);

  React.useEffect(() => {
    const doSomething = async () => {
      console.log(isAuthenticated);
    };
    if (!isLoading) {
      console.log("user in useffect: ", user);
    }
  }, [isLoading, getTokenSilently]);

  const registerTicket = () => {};

  return (
    <Portal>
      <SideBar />
      <TicketForm onSubmit={registerTicket}>
        <SupportTicketBanner>Report an Incident </SupportTicketBanner>
        <TopHalf>
          <TicketNumberProductTypeRow>
            <ProductType>
              <SelectLbl htmlFor="Products">Product Type </SelectLbl>
              <DropDownSelect
                id="productType"
                name="Product"
                defaultValue="SelectProduct"
                onChange={(e) => {}}
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
          <RequestorAndStateRow></RequestorAndStateRow>
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
          </PriorityAndAssignmentGroupRow>
          <RiskAndAssignTooRow></RiskAndAssignTooRow>
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
          </ImpactRow>
        </TopHalf>
        <DescriptionRow>
          <ShortDescription>
            <ShortDescriptionLbl>Title of Description </ShortDescriptionLbl>

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
      </TicketForm>
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

const ProductType = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const RequestorAndStateRow = styled.div`
  display: flex;
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
  flex: 2;
`;
const DropDownSelect = styled.select`
  text-align: center;
  text-align-last: center;
  flex: 1;
`;

const RiskAndAssignTooRow = styled.div`
  display: flex;
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

export default ClientTicket;
