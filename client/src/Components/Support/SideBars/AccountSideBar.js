import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

import {
  AllSupportersIcon,
  WaitingSupportersIcon,
  TeamSupportersIcon,
} from "../../../ReactIcons";

function AccountSideBar() {
  return (
    <Side>
      <SideLbl>Accounts</SideLbl>
      <SideLink strict to={"/support/portal/accounts/newaccounts"}>
        <WaitingSupportersIcon />
        <NewAccounts>View New</NewAccounts>
      </SideLink>
      <SideLink strict to={"/support/portal/accounts/activeaccounts"}>
        <AllSupportersIcon />
        <ViewAll>View All</ViewAll>
      </SideLink>
      <SideLink strict to={"/support/portal/accounts/teamaccounts"}>
        <TeamSupportersIcon />
        <ViewAll>View Teams</ViewAll>
      </SideLink>
    </Side>
  );
}
const SideLbl = styled.h3`
  text-decoration: underline;
  padding-left: 5%;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
`;
const SideLink = styled(NavLink)`
  display: flex;
  padding-left: 7%;
  text-decoration: none;
`;
const PaddedLink = styled.span`
  font-weight: bold;
`;
const NewAccounts = styled(PaddedLink)``;
const ViewAll = styled(PaddedLink)``;

export default AccountSideBar;
