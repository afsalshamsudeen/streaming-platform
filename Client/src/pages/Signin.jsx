import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider} from "../firebase.js"
import {signInWithPopup} from "firebase/auth"
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
    color: aliceblue;
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
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) =>{
    e.preventDefault();
    dispatch(loginStart())
    try{
      const res = await axios.post("http://localhost:8000/api/auth/signin", {name,password})
      dispatch(loginSuccess(res.data))
      navigate("/");
      
    }catch(err){
      dispatch(loginFailure())

    }

  }

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8000/api/auth/signup", { name, email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  

const signInWithGoogle = async() =>{
  dispatch(loginStart())
  signInWithPopup(auth,provider).then((result) =>{
    axios.post("http://localhost:8000/api/auth/google", {
      name:result.user.displayName,
      email:result.user.email,
      img:result.user.photoURL,
    }).then((res)=>{
      dispatch(loginSuccess(res.data))
      navigate("/")
    })
    
  }).catch((err )=>{
    dispatch(loginFailure());
  }) 
}


  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to Snooplay</SubTitle>
        <Input placeholder='username' onChange={e=>setName(e.target.value)} />
        <Input type='password' placeholder='password' onChange={e=>setPassword(e.target.value)}/>
        <Button onClick={handleLogin} >Sign In</Button>

        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin With Google</Button>
        <Input placeholder='username' onChange={e=>setName(e.target.value)}/>
        <Input type='email' placeholder='email' onChange={e=>setEmail(e.target.value)}/>
        <Input type='password' placeholder='password' onChange={e=>setPassword(e.target.value)}/>
        <Button onClick={handleSignup}>Sign Up</Button>

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
