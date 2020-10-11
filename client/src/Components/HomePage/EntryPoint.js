import React from 'react';
import styled from 'styled-components';
import {useAuth0} from '@auth0/auth0-react';
import LogOutButton from '../LogButtons/logout-button';
import LoginButton from '../LogButtons/login-button';
import {useHistory} from 'react-router-dom';

const EntryPoint = ({data}) => {
  const {isAuthenticated} = useAuth0();
  let history = useHistory();
  const loginHandler = () => {
    history.push('/client/signup');
  };
  return (
    <SubCategory>
      <IconAndTitle>
        <Icon src={data.image} />
        <Title>{data.title}</Title>
      </IconAndTitle>
      <ServiceDetail>
        <SubTitle>{data.subTitle}</SubTitle>
        <Description>{data.description}</Description>
        {!isAuthenticated ? (
          <LoginButton onClick={loginHandler} />
        ) : (
          <LogOutButton />
        )}
      </ServiceDetail>
    </SubCategory>
  );
};

const SubCategory = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  border-radius: 25px;
  padding: 5%;
`;
const IconAndTitle = styled.div`
  display: flex;
`;
const Icon = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;
const Title = styled.p`
  margin-left: 5%;
  font-size: 1.15em;
`;

const ServiceDetail = styled.div`
  text-align: center;
`;

const SubTitle = styled.h3``;

const Description = styled.p`
  margin: 0;
`;

export default EntryPoint;
