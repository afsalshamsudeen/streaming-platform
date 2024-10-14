import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #202020;
  color: white;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 18px;
`;

const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
      <Message>Room not found! Please check the room code.</Message>
    </Container>
  );
};

export default NotFound;
