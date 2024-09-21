import React from 'react'
import styled from 'styled-components'
import Avatar_Img from "../assets/Avatar.jpg"

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
`;
const AvatarImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%; 
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

`;

const UserName = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: aliceblue;

`;
const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #9b9b9b;
    margin-left: 5px;
`;
const Text = styled.span`
    font-size: 14px;
    color: aliceblue;
`;



const Comment = () => {
  return (
    <Container>
      <AvatarImg src={Avatar_Img}/>
      <Details>
        <UserName>Jim Moriaty</UserName>
        <Date>3 days ago</Date>
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
      </Details>
    </Container>
  )
}

export default Comment
