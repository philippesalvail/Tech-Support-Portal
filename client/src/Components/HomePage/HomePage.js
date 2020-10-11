import React from 'react';
import EntryPoint from './EntryPoint';
import styled from 'styled-components';
import {HomePageData} from './HomePageData';
import ClientPage from '../Client/ClientPage';
import {useAuth0} from '@auth0/auth0-react';
import Loading from '../Loading';
import {useHistory} from 'react-router-dom';

function HomePage() {
  let history = useHistory();
  const {isAuthenticated} = useAuth0();
  const {isLoading} = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!isAuthenticated ? (
        <Entries>
          {HomePageData.map((data, index) => {
            return <EntryPoint data={data} key={index} />;
          })}
        </Entries>
      ) : (
        history.push('/client')
      )}
    </>
  );
}

const Entries = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 100px;
  width: 70%;
  margin: 0 auto;
`;

export default HomePage;
