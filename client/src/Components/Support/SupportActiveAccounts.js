import React from "react";
import ActiveAccountItem from "../ListItem/ActiveAccountItem";
import AdminSideBar from "./AdminSideBar";
import styled from "styled-components";
import ActiveAccountSectionHeader from "../ListItem/ActiveAccountSectionHeader";

function SupportActiveAccounts() {
  const [allActiveAccounts, setAllActiveAccounts] = React.useState(null);
  const [resetList, setResetList] = React.useState(false);
  React.useEffect(() => {
    fetch("/support/supporter/getAllSupporters")
      .then((response) => response.json())
      .then((accounts) => setAllActiveAccounts(accounts.accounts))
      .catch((error) => console.log("error: ", error));
  }, [resetList]);

  if (allActiveAccounts) {
    console.log("allActiveAccounts: ", allActiveAccounts);
  }

  return (
    <AdminPage>
      <AccountDashBoard>
        <AdminSideBar />
        <NewAccountsDisplay>
          <NewAccountItems>
            <ActiveAccountSectionHeader />
            {allActiveAccounts ? (
              <AccountHeader>
                {allActiveAccounts.map((account, index) => {
                  return (
                    <ActiveAccountItem
                      key={account + index}
                      account={account}
                      setResetList={setResetList}
                      resetList={resetList}
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

export default SupportActiveAccounts;
