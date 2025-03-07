import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Avatar_Img from "../assets/Avatar.jpg"
import axios from 'axios';

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



const Comment = ({comment}) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`http://localhost:8000/api/users/find/${comment.userId}`);
      setChannel(res.data)
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <AvatarImg src={channel.img}/>
      <Details>
        <UserName>{channel.name}</UserName>
        <Date>3 days ago</Date>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  )
}

export default Comment
