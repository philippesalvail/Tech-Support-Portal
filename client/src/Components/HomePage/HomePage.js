import React from "react";
import EntryPoint from "./EntryPoint";
import styled from "styled-components";
import {HomePageData} from "./HomePageData";
import {useAuth0} from "@auth0/auth0-react";
import Loading from "../Loading";
import UserDirection from "../Client/UserDirection";

function HomePage() {
  const {isAuthenticated, user, isLoading} = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!isAuthenticated ? (
        <LandingPage>
          <Entries>
            {HomePageData.map((data, index) => {
              return <EntryPoint data={data} key={index} />;
            })}
          </Entries>
        </LandingPage>
      ) : (
        <UserDirection />
      )}
    </>
  );
}

const LandingPage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f1faee;
`;

const Entries = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content: space-around;
`;

export default HomePage;
