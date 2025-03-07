import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchSuccess } from "../redux/videoSlice";
import { format } from "timeago.js";
import Comments from "../Components/Comments";
import Recommendation from "../Components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

const Content = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  color: white;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const TimerContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: aliceblue;
  background-color: #4d4dff;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  margin-top: 40px;
  position: relative;
  height: 30px;
  width: 130px;
`;

const PinOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  z-index: 999;
`;

const PinInput = styled.input`
  font-size: 20px;
  padding: 10px;
  margin-top: 10px;
  text-align: center;
  width: 150px;
  border-radius: 5px;
  border: none;
`;

const PinButton = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4d4dff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const Title = styled.h1`
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: 22px;
`;

const VideoInfo = styled.span`
  font-size: 14px;
  color: gray;
  margin-bottom: 20px;
`;

const Video = () => {
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pin, setPin] = useState("");
  const videoRef = React.useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `http://localhost:8000/api/videos/find/${path}`
        );
        const channelRes = await axios.get(
          `http://localhost:8000/api/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [path, dispatch]);

  useEffect(() => {
    const savedTimeLimit = localStorage.getItem("parentalTimeLimit");
    if (savedTimeLimit) {
      setTimeLeft(parseInt(savedTimeLimit, 10) * 60);
    }
  }, []);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setShowPinPrompt(true);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.muted = true;
      }
    }
  }, [timeLeft]);

  const handleDeleteParentalControl = () => {
    const enteredPin = prompt("Enter 4-digit PIN to disable Parental Control:");
    const savedPin = localStorage.getItem("parentalPin");
    if (enteredPin === savedPin) {
      localStorage.removeItem("parentalTimeLimit");
      localStorage.removeItem("parentalPin");
      setTimeLeft(null);
      setShowPinPrompt(false);
    } else {
      alert("Incorrect PIN!");
    }
  };

  const handlePinSubmit = () => {
    const savedPin = localStorage.getItem("parentalPin");
    if (pin === savedPin) {
      setShowPinPrompt(false);
      if (videoRef.current) {
        videoRef.current.play();
        videoRef.current.muted = false;
      }
    } else {
      alert("Incorrect PIN!");
    }
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame ref={videoRef} src={currentVideo?.videoUrl} controls />
          {timeLeft !== null && timeLeft > 0 && (
            <TimerContainer>
              <span>
                Time Left: {Math.floor(timeLeft / 60)}:
                {timeLeft % 60 < 10 ? "0" : ""}
                {timeLeft % 60}
              </span>
              <DeleteIcon
                onClick={handleDeleteParentalControl}
                style={{ cursor: "pointer" }}
              />
            </TimerContainer>
          )}
        </VideoWrapper>

        {/* PIN Overlay - Only Shows When Timer Expires */}
        <PinOverlay show={showPinPrompt}>
          <h2>Enter 4-digit PIN to Continue</h2>
          <PinInput
            type="password"
            maxLength="4"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <PinButton onClick={handlePinSubmit}>Submit</PinButton>
        </PinOverlay>

        <Title>{currentVideo?.title || "Video Title"}</Title>
        <VideoInfo>
          {currentVideo?.videoViews} views • {format(currentVideo?.createdAt)}
        </VideoInfo>
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
