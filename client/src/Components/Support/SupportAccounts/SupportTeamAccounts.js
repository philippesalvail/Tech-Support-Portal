import React from "react";
import ActiveAccountItem from "../../ListItems/ActiveAccountItem";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import styled from "styled-components";
import ActiveAccountSectionHeader from "../../SectionHeaders/ActiveAccountSectionHeader";
import Loading from "../../Loading";

function SupportTeamAccounts() {
  const [allActiveAccounts, setAllActiveAccounts] = React.useState(null);
  const [resetList, setResetList] = React.useState(false);
  React.useEffect(() => {
    // fetch(`support/team/${}`)
    //   .then((response) => response.json())
    //   .then((accounts) => setAllActiveAccounts(accounts.accounts))
    //   .catch((error) => console.log("error: ", error));
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
`;

const AdminPage = styled.div`
  display: flex;
  flex-direction: column;
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

export default SupportTeamAccounts;
