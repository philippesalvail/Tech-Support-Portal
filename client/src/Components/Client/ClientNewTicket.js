import React from "react";
import styled from "styled-components";
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import ClientSideBar from "./ClientSideBar";

import {useAuth0} from "@auth0/auth0-react";
import {createTicket} from "./ClientFunctions";

const ClientNewTicket = () => {
  const {user, isAuthenticated, isLoading, getTokenSilently} = useAuth0();
  const clientAccount = useSelector((state) => state.client);
  const [productTypeSelected, setProductTypeSelected] = React.useState(
    "Select Product Type"
  );
  const [prioritySelected, setPrioritySelected] = React.useState(
    "Select Priority Level"
  );
  const [impactSelected, setImpactSelected] = React.useState(
    "Select Impact Level"
  );
  console.log("user: ", user);
  console.log("is authenticated: ", isAuthenticated);

  const [shortDesc, setShortDesc] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const valid = {
    shortDesc: shortDesc.length > 3,
    desc: desc.length > 6,
    priorityLevel: prioritySelected !== "Select Priority Level",
    impactLevel: impactSelected !== "Select Impact Level",
    productType: productTypeSelected !== "Select Product Type",
  };

  React.useEffect(() => {
    const doSomething = async () => {
      console.log(isAuthenticated);
    };
    if (!isLoading) {
      console.log("user in useffect: ", user);
    }
  }, [isLoading, getTokenSilently]);

  const ticketHandler = (e) => {
    e.preventDefault();
    let errorMessage = "";
    for (let key of Object.keys(valid)) {
      if (!valid[key]) {
        errorMessage += "Please enter a valid " + key + "\n";
      }
    }
    if (errorMessage) {
      alert(errorMessage);
    } else {
      createTicket({
        clientInfo: user,
        productTypeSelected: productTypeSelected,
        prioritySelected: prioritySelected,
        shortDesc: shortDesc,
        desc: desc,
        impactSelected: impactSelected,
      });

      alert("Ticket Submitted");
      setImpactSelected("Select Impact Level");
      setPrioritySelected("Select Priority Level");
      setProductTypeSelected("Select Product Type");
      setShortDesc("");
      setDesc("");
    }
  };

  return (
    <Portal>
      <ClientSideBar />
      <TicketForm onSubmit={ticketHandler}>
        <SupportTicketBanner>Report an Incident </SupportTicketBanner>
        <TopHalf>
          <TicketNumberProductTypeRow>
            <ProductType>
              <SelectLbl htmlFor="Products">Product Type </SelectLbl>
              <DropDownSelect
                id="productType"
                name="Product"
                value="SelectProduct"
                onChange={(e) => {
                  setProductTypeSelected(e.target.value);
                }}
              >
                <option value="SelectProduct" disabled hidden>
                  {productTypeSelected}
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
                onChange={(e) => setPrioritySelected(e.currentTarget.value)}
                value="SelectPriority"
              >
                <option value="SelectPriority" disabled hidden>
                  {prioritySelected}
                </option>
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
                onChange={(e) => setImpactSelected(e.currentTarget.value)}
                value="SelectImpact"
              >
                <option value="SelectImpact" disabled hidden>
                  {impactSelected}
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
            <ShortDescriptionTxt
              onChange={(e) => setShortDesc(e.target.value)}
              valid={!shortDesc || valid.shortDesc}
              value={shortDesc}
            />
          </ShortDescription>
          <Description>
            <DescriptionLbl>Description</DescriptionLbl>
            <DescriptionTxt
              onChange={(e) => setDesc(e.target.value)}
              valid={!desc || valid.desc}
              value={desc}
            />
          </Description>
        </DescriptionRow>
        <ButtonRow>
          <ButtonSubmit type="submit">Create Ticket</ButtonSubmit>
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
  border: ${(props) => (props.valid ? "1px solid black" : "1px solid red")};
  outline: none;
`;
const DescriptionLbl = styled.label`
  flex: 1;
`;
const DescriptionTxt = styled.textarea`
  flex: 3;
  border: ${(props) => (props.valid ? "1px solid black" : "1px solid red")};
  outline: none;
`;
const ButtonRow = styled.div`
  padding: 1%;
  text-align: right;
`;
const ButtonSubmit = styled.button``;

export default ClientNewTicket;
