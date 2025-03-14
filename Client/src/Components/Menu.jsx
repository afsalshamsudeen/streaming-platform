import React, { useState } from "react";
import styled from "styled-components";
import snooplay_logo from "../assets/snooplaylogo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import HistoryIcon from "@mui/icons-material/History";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Link } from "react-router-dom";
import WatchRoom from "./WatchRoom";
import ParentalControlModal from "./ParentalControlModal";
import SettingsModal from "../Components/Settings.jsx";  // Import the modal

const Container = styled.div`
  flex: 1;
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
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 35px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: #313538;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid #373737;
`;

const WatchAlong = styled.div``;

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
`;

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [isParentalOpen, setIsParentalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSaveParentalControl = (timeLimit) => {
    console.log("Parental control watch limit set to:", timeLimit, "minutes");
    setIsParentalOpen(false);
  };

  const handleParentalControlClick = () => {
    const storedTime = localStorage.getItem("parentalTimeLimit");
    const startTime = localStorage.getItem("parentalStartTime");
  
    if (storedTime && startTime) {
      const elapsedTime = (Date.now() - startTime) / (1000 * 60); // Convert ms to minutes
      if (elapsedTime < storedTime) {
        alert("Parental Control is already active! Please wait until it expires.");
        return;
      }
    }
  
    setIsParentalOpen(true); // Open modal if no active Parental Control
  };
  

  return (
    <>
      <Container>
        <Wrapper>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={snooplay_logo} />
              Snooplay
            </Logo>
          </Link>

          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <HomeIcon />
              Home
            </Item>
          </Link>

          <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <ExploreIcon />
              Trend
            </Item>
          </Link>

          <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <HistoryIcon />
              Following
            </Item>
          </Link>

          <Hr />
          <WatchAlong>
            Experience videos together, no matter the distance.
            <WaBtn onClick={() => setOpen(true)}>
              <ReduceCapacityIcon /> Watch
            </WaBtn>
          </WatchAlong>
          <Hr />

          <Item onClick={handleParentalControlClick}>
            <SupervisorAccountIcon />
            Parental Control
          </Item>

          <Item onClick={() => setIsSettingsOpen(true)}>  {/* Open settings modal */}
            <SettingsSuggestIcon />
            Settings
          </Item>
        </Wrapper>
      </Container>

      {open && <WatchRoom setOpen={setOpen} />}
      {isParentalOpen && (
        <ParentalControlModal 
          isOpen={isParentalOpen} 
          onClose={() => setIsParentalOpen(false)} 
          onSave={handleSaveParentalControl} 
        />
      )}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />} 
    </>
  );
};

export default Menu;

