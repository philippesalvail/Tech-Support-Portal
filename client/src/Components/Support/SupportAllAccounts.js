import React from "react";
import AccountItem from "../ListItem/AccountItem";
import SupportSideBar from "./SupportSideBar";
import styled from "styled-components";
import AccountSectionHeader from "../ListItem/AccountSectionHeader";

function SupportAllAccounts() {
  console.log("I am in SupportNewAccounts");
  const [allSupporters, setAllSupporters] = React.useState([]);
  React.useEffect(() => {
    fetch("/support/supporter/getAllSupporters")
      .then((response) => response.json())
      .then((accounts) => setAllSupporters(accounts.accounts))
      .catch((error) => console.log("error: ", error));
  }, []);

  return (
    <AdminPage>
      <AccountBanner>All Accounts</AccountBanner>
      <AccountDashBoard>
        <SupportSideBar />
        <NewAccountsDisplay>
          <NewAccountItems>
            {allSupporters ? (
              <AccountHeader>
                <AccountSectionHeader />
                {allSupporters.map((account, index) => {
                  return <AccountItem key={account + index} ticket={account} />;
                })}
              </AccountHeader>
            ) : (
              <div></div>
            )}
          </NewAccountItems>
        </NewAccountsDisplay>
      </AccountDashBoard>
    </AdminPage>
  );
}

const AdminPage = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountBanner = styled.h2`
  text-align: center;
`;

const AccountDashBoard = styled.div`
  display: flex;
`;
const AccountHeader = styled.div`
  text-align: center;
`;

const NewAccountItems = styled.div``;
const NewAccountsDisplay = styled.div`
  flex: 5;
`;

export default SupportAllAccounts;
