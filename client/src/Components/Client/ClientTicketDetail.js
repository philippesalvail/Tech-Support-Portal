import React from "react";
import styled from "styled-components";
import {useHistory, useParams} from "react-router-dom";
import ClientSideBar from "../Support/SideBars/ClientSideBar";
import {useSelector} from "react-redux";
import LogOutButton from "../LogButtons/logout-button";
import Loading from "../Loading";

function ClientTicketDetail() {
  const [productTypeSelected, setProductTypeSelected] = React.useState(
    "Select Product Type"
  );
  const [prioritySelected, setPrioritySelected] = React.useState(
    "Select Priority Level"
  );
  const [impactSelected, setImpactSelected] = React.useState(
    "Select Impact Level"
  );

  const [dateCreated, setDateCreated] = React.useState("");

  const [shortDesc, setShortDesc] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const {ticketnumber} = useParams();
  const clientAccount = useSelector((state) => state.client);

  React.useEffect(() => {
    fetch(`/support/tickets/${ticketnumber}`)
      .then((response) => response.json())
      .then((ticket) => {
        setProductTypeSelected(ticket.data.productType);
        setShortDesc(ticket.data.shortDescription);
        setDesc(ticket.data.description);
        setImpactSelected(ticket.data.impact);
        setDateCreated(ticket.data.dateOfTicketCreated);
      })
      .catch((error) =>
        console.log("error in ClientTicketDetail: ", error.message)
      );
  });

  return (
    <>
      {clientAccount && dateCreated ? (
        <TicketDetail>
          <SideBar>
            <ClientSideBar username={clientAccount.username} />
          </SideBar>
          <Ticket>
            <SupportTicketBanner>
              <BannerTitle>Incident Number: {ticketnumber}</BannerTitle>
              <BannerUserAccount>
                <Wrapper>
                  {`Welcome: ${clientAccount.loginInfo.given_name} ${clientAccount.loginInfo.family_name}`}
                </Wrapper>
                <LogOutButton />
              </BannerUserAccount>
            </SupportTicketBanner>
            <TopHalf>
              {dateCreated && (
                <DateCreated>
                  <DateLbl>Date Created</DateLbl>
                  <DateTxt value={dateCreated} disabled={dateCreated} />
                </DateCreated>
              )}
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
                    disabled={dateCreated}
                    isCreated={dateCreated}
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
              <PriorityAndAssignmentGroupRow>
                <Priority>
                  <SelectLbl htmlFor="Priority">Priority </SelectLbl>
                  <DropDownSelect
                    id="Priority"
                    name="Priority"
                    onChange={(e) => setPrioritySelected(e.currentTarget.value)}
                    value="SelectPriority"
                    disabled={dateCreated}
                    isCreated={dateCreated}
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
                    disabled={dateCreated}
                    isCreated={dateCreated}
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
                  value={shortDesc}
                  disabled={dateCreated}
                  isCreated={dateCreated}
                />
              </ShortDescription>
              <Description>
                <DescriptionLbl>Description</DescriptionLbl>
                <DescriptionTxt
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  disabled={dateCreated}
                  isCreated={dateCreated}
                />
              </Description>
            </DescriptionRow>
          </Ticket>
        </TicketDetail>
      ) : (
        <Loading />
      )}
    </>
  );
}

const DateCreated = styled.div`
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
const DateLbl = styled.label`
  flex: 2;
`;
const DateTxt = styled.input`
  flex: 1;
  text-align: center;
  background-color: ${(props) => (props.isCreated ? "#F8F8F8" : "#FFFFFF")};
`;

const TopHalf = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 2%;
`;

const SupportTicketBanner = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 1%;
  background-color: #457b9d;
`;
const BannerTitle = styled.div`
  text-align: left;
`;
const BannerUserAccount = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
`;
const Wrapper = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TicketDetail = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Ticket = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 5;
  background-color: #a8dadc;
  margin: 0 auto;
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
  background-color: ${(props) => (props.isCreated ? "#F8F8F8" : "#FFFFFF")};
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
  background-color: ${(props) => (props.isCreated ? "#F8F8F8" : "#FFFFFF")};
  outline: none;
`;
const DescriptionLbl = styled.label`
  flex: 1;
`;
const DescriptionTxt = styled.textarea`
  flex: 3;
  outline: none;
  background-color: ${(props) => (props.isCreated ? "#F8F8F8" : "#FFFFFF")};
`;

export default ClientTicketDetail;
