import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comments from "../Components/Comments";
import Card from "../Components/Card";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../Components/Recommendation";
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

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
  background-color: #d4d4ff;
  font-weight: 500;
  color: aliceblue;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoPlayer = styled.div`
  height: 507px;
  width: 100%;
  background-color: #969696;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const TimerContainer = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: aliceblue;
  height: 40px;
  width: 150px;
  background-color: #4d4dff;
  border-radius: 10px;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
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
    // Retrieve time limit from localStorage
    const savedTimeLimit = localStorage.getItem("parentalTimeLimit");
    if (savedTimeLimit) {
      setTimeLeft(parseInt(savedTimeLimit, 10) * 60); // Convert minutes to seconds
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && videoRef.current) {
      videoRef.current.pause();
    }
  }, [timeLeft]);

  const startTimer = () => {
    setTimeLeft(timer * 60);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame ref={videoRef} src={currentVideo.videoUrl} controls />
          {timeLeft > 0 && (
  <TimerContainer>
    <span>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</span>
    <DeleteIcon 
      onClick={() => {
        localStorage.removeItem("parentalTimeLimit");
        setTimeLeft(0); // Reset timer to allow unlimited play
      }} 
      style={{ cursor: "pointer" }} 
    />
  </TimerContainer>
)}
        </VideoWrapper>
        <Title>{currentVideo?.title || "Video Title"}</Title>
        <Details>
          <Info>
            {currentVideo?.videoViews} views {format(currentVideo?.createdAt)}
          </Info>
        </Details>
        <Comments videoId={currentVideo._id} />
      </Content>
      <Title>Recommendations</Title>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
};

export default Video;