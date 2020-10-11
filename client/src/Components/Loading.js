import React from 'react';
import styled from 'styled-components';
import loaderImg from '../Images/loading.gif';

const Loading = () => {
  return <Loader src={loaderImg} />;
};

const Loader = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Loading;
