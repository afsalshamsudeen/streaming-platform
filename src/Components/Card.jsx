import React from 'react';
import styled from 'styled-components';
import thumbnail from "../assets/thumbnail.jpg";
import icon from "../assets/channel_image.jpg";
import { Link } from "react-router-dom";



const Container = styled.div`
    width: ${(props)=>props.type !=="sm" && "360px"};
    margin-bottom: ${(props)=>props.type==="sm" ? "10px" : "45px"};
    margin-top: ${(props)=>props.type==="sm" ? "10px" : "30px"};
    cursor: pointer;
    display: ${(props)=>props.type==="sm" && "flex"};
    gap: 10px;


`
const Image = styled.img`
    width: 100%;
    height: ${(props)=>props.type==="sm" ? "120px" : "200px"};
    background-color: #999;
    flex: 1;



`
const Details = styled.div`
    display: flex;
    margin-top: ${(props)=>props.type !=="sm" && "16px"};
    gap: 12px;
    flex: 1;
`
const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props)=>props.type==="sm" && "none"};

`
const Text = styled.div`
    
`
const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: aliceblue;
`
const ChannelName = styled.h2`
    font-size: 14px;
    color: #9b9b9b;
    margin: 9px 0px;
`
const Info = styled.div`
    font-size: 14px;
    color: #9b9b9b;
`

const Card = ({type}) => {
  return (
    <Link to="video/test" style={{textDecoration:"none"}}>
    <Container type={type}>
      <Image type={type} src={thumbnail} />
      <Details type={type}>
        <ChannelImage type={type} src={icon} />
        <Text>
            <Title>Everything getting ready</Title>
            <ChannelName>Snooplay</ChannelName>
            <Info>1.3M views 14 hours ago</Info>
        </Text>
      </Details>
    </Container>
    </Link>
  )
}

export default Card
