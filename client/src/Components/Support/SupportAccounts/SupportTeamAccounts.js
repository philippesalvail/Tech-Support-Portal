import React from "react";
import ActiveAccountItem from "../../ListItems/ActiveAccountItem";
import AdminSideBar from "../SideBars/AdminSideBar";
import AccountSideBar from "../SideBars/AccountSideBar";
import styled from "styled-components";
import ActiveAccountSectionHeader from "../../SectionHeaders/ActiveAccountSectionHeader";
import Loading from "../../Loading";
import {useParams, useHistory} from "react-router-dom";
import {ip} from "../../Constants";

function SupportTeamAccounts() {
  let history = useHistory();
  let {teamaccounts} = useParams();
  const [team, setTeam] = React.useState(null);
  const [resetList, setResetList] = React.useState(false);

  React.useEffect(() => {
    fetch(`${ip}/support/supportteams/accounts/${teamaccounts}`)
      .then((response) => response.json())
      .then((accounts) => setTeam(accounts.accounts))
      .catch((error) => console.log("error: ", error));
  }, [teamaccounts]);

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
            <BannerTitle>{teamaccounts} Accounts</BannerTitle>
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
            {team ? (
              <AccountHeader>
                {team.map((account, index) => {
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

const AccountItems = styled.div`
  width: 97%;
  margin: 0 auto;
`;

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
  background-color: #f1faee;
`;

const AccountDashBoard = styled.div`
  display: flex;
`;
const AccountHeader = styled.div`
  text-align: center;
`;

const AccountsDisplay = styled.div`
  flex: 5;
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

export default SupportTeamAccounts;
