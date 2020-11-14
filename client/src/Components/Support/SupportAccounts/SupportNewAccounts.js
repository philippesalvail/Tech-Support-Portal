import React from "react";
import NewAccountItem from "../../ListItems/NewAccountItem";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import styled from "styled-components";
import NewAccountSectionHeader from "../../SectionHeaders/NewAccountSectionHeader";
import Loading from "../../Loading";
import {useHistory} from "react-router-dom";

function SupportNewAccounts() {
  let history = useHistory();
  const [accounts, setAccounts] = React.useState(null);
  const [enableAccount, setEnableAccount] = React.useState(false);
  const [resetList, setResetList] = React.useState(false);

  React.useEffect(() => {
    fetch("/support/supporter/getNewSupportAccounts")
      .then((response) => response.json())
      .then((accounts) => {
        setAccounts(accounts.accounts);
      })
      .catch((error) => console.log("error: ", error));
  }, [enableAccount, resetList]);

  const logOut = () => {
    history.push("/");
  };

  return (
    <AdminPage>
      <AccountDashBoard>
        <SideBar>
          <AdminSideBar />
          <AccountSideBar />
        </SideBar>
        <AccountsDisplay>
          <SupportTicketBanner>
            <BannerTitle>New Accounts</BannerTitle>
            <BannerUserAccount>
              <Wrapper>Welcome: Admin</Wrapper>
              <LogOutBtn
                onClick={() => {
                  logOut();
                }}
              >
                Log Out
              </LogOutBtn>
            </BannerUserAccount>
          </SupportTicketBanner>
          <AccountItems>
            <NewAccountSectionHeader />
            {accounts ? (
              <AccountHeader>
                {accounts.map((account, index) => {
                  return (
                    <NewAccountItem
                      key={account + index}
                      account={account}
                      setEnableAccount={setEnableAccount}
                      enableAccount={enableAccount}
                      index={index}
                      setResetList={setResetList}
                      resetList={resetList}
                    />
                  );
                })}
              </AccountHeader>
            ) : (
              <Loader />
            )}
          </AccountItems>
        </AccountsDisplay>
      </AccountDashBoard>
    </AdminPage>
  );
}
const LogOutBtn = styled.button`
  color: #f1faee;
  font-weight: bold;
  font-size: 15px;
  background-color: #457b9d;
  outline: none;
`;
const Loader = styled(Loading)``;
const AdminPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f1faee;
`;
const BannerTitle = styled.div`
  text-align: left;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SupportTicketBanner = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 1%;
  background-color: #457b9d;
`;
const BannerUserAccount = styled.div`
  display: flex;
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

const AccountItems = styled.div``;
const AccountsDisplay = styled.div`
  flex: 5;
`;

export default SupportNewAccounts;
