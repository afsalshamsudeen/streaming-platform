import React from 'react'
import styled from 'styled-components'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Channel_image from "../assets/channel_image.jpg"
import Comments from '../Components/Comments';
import Card from '../Components/Card';

const Container = styled.div`
  display: flex;
  gap: 24px;

`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div`
  
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: aliceblue;

`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

const Info = styled.span`
  color: #9b9b9b;


`;

const Buttons = styled.div`
    display: flex;
    gap: 20px;
    color: aliceblue;
  `;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

`;

const Recommendation = styled.div`
  flex: 2;
`;

const Hr = styled.hr`
  border: 0.1px solid #969696;
  margin: 15px 0px;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;

  
`;

const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
`;
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;

`;
const ChannelDetailes = styled.div`
    display: flex;
    flex-direction: column;
    color: aliceblue;
`;
const ChannelName = styled.span`
    font-weight: 400;
`;
const SubCount = styled.span`
    color: #9b9b9b;
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 12px;
`;
const VideoDescription = styled.p`
    font-size: 14px;

`;
const Subscribe = styled.button`
    background-color: #4d4dff;
    font-weight: 500;
    color: aliceblue;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;


`;


const Video = () => {
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe 
            width="100%" 
            height="507" 
            src="https://www.youtube.com/embed/PaRqFtw97Mg?si=sEiyoyOMGVBh4u0-" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" 
            allowfullscreen
            >
            
          </iframe>
        </VideoWrapper>
        <Title>Everything getting ready</Title>
        <Details>
          <Info>1.3M views 14 hours ago</Info>
          <Buttons>
            <Button><ThumbUpIcon/>100</Button>
            <Button><ThumbDownIcon/>Dislike</Button>
            <Button><ReplyIcon/>Share</Button>
            <Button><FavoriteIcon/>Favorite</Button>
          </Buttons>
        </Details>
        <Hr/>
        <Channel>
          <ChannelInfo>
            <Image src={Channel_image}></Image>
            <ChannelDetailes>
              <ChannelName>Snooplay</ChannelName>
              <SubCount>20 Subscribers</SubCount>
              <VideoDescription>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </VideoDescription>
            </ChannelDetailes>
          </ChannelInfo>
          <Subscribe>Subscription</Subscribe>
        </Channel>
        <Hr/>
        <Comments/>
      </Content>
      <Recommendation>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recommendation>
    </Container>
  )
}

export default Video
