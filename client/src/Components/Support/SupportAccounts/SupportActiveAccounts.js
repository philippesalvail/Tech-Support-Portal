import React from "react";
import ActiveAccountItem from "../../ListItems/ActiveAccountItem";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import styled from "styled-components";
import ActiveAccountSectionHeader from "../../SectionHeaders/ActiveAccountSectionHeader";
import Loading from "../../Loading";
import {useHistory} from "react-router-dom";
import {ip} from "../../Constants";

function SupportActiveAccounts() {
  let history = useHistory();
  const [accounts, setAccounts] = React.useState(null);
  const [resetList, setResetList] = React.useState(false);
  React.useEffect(() => {
    fetch(`${ip}/support/supporter/getAllSupporters`)
      .then((response) => response.json())
      .then((accounts) => setAccounts(accounts.accounts))
      .catch((error) => console.log("error: ", error));
  }, [resetList]);

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
            <BannerTitle>Active Accounts</BannerTitle>
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
            <ActiveAccountSectionHeader />
            {accounts ? (
              <AccountHeader>
                {accounts.map((account, index) => {
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
const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const BannerTitle = styled.div`
  text-align: left;
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

const AccountItems = styled.div``;
const AccountsDisplay = styled.div`
  flex: 5;
  background-color: #f1faee;
`;

export default SupportActiveAccounts;
