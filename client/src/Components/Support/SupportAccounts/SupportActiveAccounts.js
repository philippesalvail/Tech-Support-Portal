import React from "react";
import ActiveAccountItem from "../../ListItems/ActiveAccountItem";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import styled from "styled-components";
import ActiveAccountSectionHeader from "../../SectionHeaders/ActiveAccountSectionHeader";
import Loading from "../../Loading";

function SupportActiveAccounts() {
  const [allActiveAccounts, setAllActiveAccounts] = React.useState(null);
  const [resetList, setResetList] = React.useState(false);
  React.useEffect(() => {
    fetch("/support/supporter/getAllSupporters")
      .then((response) => response.json())
      .then((accounts) => setAllActiveAccounts(accounts.accounts))
      .catch((error) => console.log("error: ", error));
  }, [resetList]);

  return (
    <AdminPage>
      <AccountDashBoard>
        <SideBar>
          <AdminSideBar />
          <AccountSideBar />
        </SideBar>
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
                      index={index}
                    />
                  );
                })}
              </AccountHeader>
            ) : (
              <Loading />
            )}
          </NewAccountItems>
        </NewAccountsDisplay>
      </AccountDashBoard>
    </AdminPage>
  );
}
const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AdminPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AccountDashBoard = styled.div`
  display: flex;
`;
const AccountHeader = styled.div`
  text-align: center;
`;

const NewAccountItems = styled.div`
  width: 95%;
  margin: 0 auto;
`;
const NewAccountsDisplay = styled.div`
  flex: 5;
  background-color: #f1faee;
`;

export default SupportActiveAccounts;
