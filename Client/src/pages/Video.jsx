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
  background-color: #4d4dff;
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

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

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
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [path, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  const handleLike = async ()=>{
    await axios.put(`http://localhost:8000/api/users/like/${currentVideo._id}`,{}, { withCredentials: true })
    dispatch(like(currentUser._id))
  };
  const handleDislike = async ()=>{
    await axios.put(`http://localhost:8000/api/users/dislike/${currentVideo._id}`,{}, { withCredentials: true }
    )
    dispatch(dislike(currentUser._id))

  }
  const handleSub = async ()=>{
    // currentUser.subscribedUsers.includes(channel?._id) ?
    // await axios.put(`http://localhost:8000/api/users/unsub/${channel._id}`,{}, { withCredentials: true }) :
    // await axios.put(`http://localhost:8000/api/users/sub/${channel._id}`,{}, { withCredentials: true })
    // dispatch(subscription(channel._id))
    if (!channel?._id) {
      console.error("Channel data is missing.");
      return; // Exit if channel data is missing
    }
    try {
      if (currentUser.subscribedUsers.includes(channel._id)) {
        await axios.put(
          `http://localhost:8000/api/users/unsub/${channel._id}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.put(
          `http://localhost:8000/api/users/sub/${channel._id}`,
          {},
          { withCredentials: true }
        );
      }
      dispatch(subscription(channel._id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Content> 
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls/>
        </VideoWrapper>
        <Title>{currentVideo?.title || "Video Title"}</Title>{" "}
        {/* Optional chaining */}
        <Details>
          <Info>
            {currentVideo?.videoViews} views {format(currentVideo?.createdAt)}
          </Info>{" "}
          {/* Optional chaining */}
          <Buttons>
            <Button onClick={handleLike}> 
              {currentVideo?.likes?.includes(currentUser?._id) ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
            {currentVideo?.likes?.length }
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? <ThumbDownIcon /> :  <ThumbDownOffAltIcon />}
                Dislike
              </Button>
            

            <Button>
              <ReplyIcon />
              Share
            </Button>
            
            <Button>
              <FavoriteIcon />
              Favorite
            </Button>
          </Buttons>
        </Details>
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} alt="channel image" />{" "}
            {/* Fallback image */}
            <ChannelDetailes>
              <ChannelName>{channel?.name || "Channel Name"}</ChannelName>{" "}
              {/* Fallback channel name */}
              <SubCount>{channel?.subscribers || 0} Subscribers</SubCount>
              <VideoDescription>
                {currentVideo?.desc || "description goes here"}{" "}
                {/* Fallback description */}
              </VideoDescription>
            </ChannelDetailes>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>{currentUser?.subscribedUsers?.includes(channel?._id) ? "Subscribed" : "Subscribe"}</Subscribe>
        </Channel>
        <Comments  videoId={currentVideo._id}/>
      </Content>
      <Title>Recommendations</Title>
      <Recommendation tags={currentVideo.tags}/>
    </Container>
  );
};

export default Video;
