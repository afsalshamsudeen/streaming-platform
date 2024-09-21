import React from 'react'
import styled from 'styled-components'
import Avatar_Img from "../assets/Avatar.jpg"
import Comment from './Comment';

const Container = styled.div``;
const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

`;
const AvatarImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%; 
`;
const Input = styled.input`
    border: none;
    border-bottom:  1px solid #9b9b9b;
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 100%;
    color: aliceblue;
`;

const Comments = () => {
  return (
    <Container>
      <NewComment>
        <AvatarImg src={Avatar_Img}/>
        <Input placeholder='Add a comment...'/>
      </NewComment>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
    </Container>
  )
}

export default Comments
