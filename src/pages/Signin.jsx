import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 50px);
    color: aliceblue;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #202020;
    border: 1px solid #969696;
    padding: 20px 50px;
    gap: 10px;
    
`;

const Title = styled.h1`
    font-size: 26px;
`;

const SubTitle = styled.h2`
    font-size: 20px;
    font-weight: 300;
`;

const Input = styled.input`
    border: 1px solid #969696;
    border-radius: 3px;
    padding: 10px;
    width: 100%;
    background-color: transparent;
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: #4d4dff;
    color: aliceblue;
`;

const More = styled.div`
    display: flex;
    font-size: 10px;
    margin-top: 10px;
    cursor: pointer;

`;

const Links = styled.div`
    margin-left: 50px;

`;

const Footer = styled.span`
    margin-left: 30px;
`;

const Signin = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to Snooplay</SubTitle>
        <Input placeholder='username'/>
        <Input type='password' placeholder='password'/>
        <Button>Sign In</Button>

        <Title>or</Title>
        <Input placeholder='username'/>
        <Input type='email' placeholder='email'/>
        <Input type='password' placeholder='password'/>
        <Button>Sign Up</Button>

        <More>
          English(USA)
          <Links>
            <Footer>Help</Footer>
            <Footer>Privacy</Footer>
            <Footer>Terms</Footer>
          </Links>
        </More>
      </Wrapper>
    </Container>
  )
}

export default Signin
