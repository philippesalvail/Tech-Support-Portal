import React from "react";
import styled from "styled-components";
function WelcomeBanner(props) {
  const {loginInfo} = props.props;
  return (
    <TopBar>
      <UserInfo>
        <UserName>
          Welcome: {loginInfo.given_name}&nbsp;
          {loginInfo.family_name}
        </UserName>
        <UserPicture src={loginInfo.picture} />
      </UserInfo>
    </TopBar>
  );
}

const TopBar = styled.div`
  display: flex;
  background-color: #428bca;
  justify-content: center;
  color: white;
  padding: 1%;
  justify-content: flex-end;
`;
const UserInfo = styled.div`
  display: relative;
`;
const UserName = styled.span``;
const UserPicture = styled.img``;

export default WelcomeBanner;
