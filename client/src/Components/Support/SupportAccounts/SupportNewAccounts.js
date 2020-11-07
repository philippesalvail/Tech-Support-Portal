import React from "react";
import NewAccountItem from "../../ListItems/NewAccountItem";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import styled from "styled-components";
import NewAccountSectionHeader from "../../SectionHeaders/NewAccountSectionHeader";
import Loading from "../../Loading";

function SupportNewAccounts() {
  const [newAccounts, setNewAccounts] = React.useState(null);
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
      <AccountDashBoard>
        <SideBar>
          <AdminSideBar />
          <AccountSideBar />
        </SideBar>
        <NewAccountsDisplay>
          <NewAccountItems>
            {newAccounts ? (
              <AccountHeader>
                <NewAccountSectionHeader />
                {newAccounts.map((account, index) => {
                  return (
                    <NewAccountItem
                      key={account + index}
                      account={account}
                      setEnableAccount={setEnableAccount}
                      enableAccount={enableAccount}
                      index={index}
                    />
                  );
                })}
              </AccountHeader>
            ) : (
              <Loader />
            )}
          </NewAccountItems>
        </NewAccountsDisplay>
      </AccountDashBoard>
    </AdminPage>
  );
}
const Loader = styled(Loading)``;
const AdminPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f1faee;
`;
const SideBar = styled.div`
  flex: 1;
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

const NewAccountItems = styled.div``;
const NewAccountsDisplay = styled.div`
  flex: 5;
`;

export default SupportNewAccounts;
