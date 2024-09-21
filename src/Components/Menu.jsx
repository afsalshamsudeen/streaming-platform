import React from 'react'
import styled from 'styled-components'
import snooplay_logo from "../assets/youtube.png"
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import HistoryIcon from '@mui/icons-material/History';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ContrastIcon from '@mui/icons-material/Contrast';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import { Link } from 'react-router-dom';

const Container = styled.div`
  flex:1;
  background-color: #202020;
  height: 100vh;
  color: white;
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: bold;
  margin-bottom: 25px
`;

const Img = styled.img`
  height: 55px;  
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover{
    background-color: #313538;
  }
`

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid #373737;

`
const WatchAlong = styled.div``
const WaBtn = styled.button`
  padding: 5px 15px;
  background-color: #4d4dff;
  color: aliceblue;
  border: 1px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Menu = () => {
  return (
    <Container>
      <Wrapper>
      <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
      <Logo>
      <Img src={snooplay_logo}/>
      Snooplay
      </Logo>
      </Link>
      <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
      <Item><HomeIcon/>Home</Item>
      </Link>
        <Item><ExploreIcon/>Browse</Item>
        <Item><HistoryIcon/>Following</Item>
        <Hr/>
        <WatchAlong>
        Experience videos together, no matter the distance.
        <WaBtn><ReduceCapacityIcon/> Watch</WaBtn>
        </WatchAlong>
        <Hr/>
       
        <Item><SettingsSuggestIcon/>Settings</Item>
        <Item><HelpCenterIcon/>Help</Item>
        <Item><ContrastIcon/>Theme</Item>
      </Wrapper>
    </Container>
  )
}

export default Menu
