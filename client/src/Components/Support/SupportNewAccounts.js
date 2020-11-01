import React from "react";
import AccountItem from "../ListItem/AccountItem";
import SupportSideBar from "./SupportSideBar";
import styled from "styled-components";
import AccountSectionHeader from "../ListItem/AccountSectionHeader";

function SupportNewAccounts() {
  const [newAccounts, setNewAccounts] = React.useState([]);
  const [enableAccount, setEnableAccount] = React.useState(false);

  React.useEffect(() => {
    fetch("/support/supporter/getNewSupporters")
      .then((response) => response.json())
      .then((accounts) => {
        setNewAccounts(accounts.accounts);
      })
      .catch((error) => console.log("error: ", error));
  }, [enableAccount]);

  return (
    <AdminPage>
      <AccountBanner>New Accounts</AccountBanner>
      <AccountDashBoard>
        <SupportSideBar />
        <NewAccountsDisplay>
          <NewAccountItems>
            {newAccounts ? (
              <AccountHeader>
                <AccountSectionHeader />
                {newAccounts.map((account, index) => {
                  return (
                    <AccountItem
                      key={account + index}
                      account={account}
                      setEnableAccount={setEnableAccount}
                      enableAccount={enableAccount}
                    />
                  );
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

export default SupportNewAccounts;
