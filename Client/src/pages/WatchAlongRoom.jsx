import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import io from 'socket.io-client';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Channel_image from "../assets/channel_image.jpg";
import axios from 'axios';

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
    font-family: 'Roboto', sans-serif;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

const ChatOption = styled.div`
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

const VideoPlayer = styled.video`
    max-height: 820px;
    width: 100%;
    background-color: #969696;
`;
const RoomCode = styled.div`
    height: 30px;
    width: 199px;
    background-color: #4d4dff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
`;
const RoomIDDisplay = styled.h1`
    font-size: 14px;
    font-weight: 400;
    color: aliceblue;
    font-family: 'Roboto', sans-serif;
`;

const socket = io('http://localhost:8000');

const WatchAlongRoom = () => {
    const { roomCode } = useParams();
    const { state } = useLocation();
    const videoRef = useRef();
    const [videoLink, setVideoLink] = useState("");

    useEffect(() => {
        const fetchVideoLink = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/videos/stream/${roomCode}`);
                setVideoLink(data.videoUrl);  // Set video URL from backend
                console.log("Fetched Video Link:", data.videoUrl);
            } catch (err) {
                console.error("Error fetching video link:", err);
            }
        };

        
        if (!videoLink) fetchVideoLink();

        // Join the room when the component mounts
        socket.emit('joinRoom', { roomCode });
        socket.on('syncVideo', ({ action, currentTime }) => {
            if (videoRef.current) {
                if (action === 'play') {
                    videoRef.current.play();
                } else if (action === 'pause') {
                    videoRef.current.pause();
                }
                videoRef.current.currentTime = currentTime;
            }
        });

        return () => {
            socket.emit('leaveRoom', { roomCode });
            socket.off('syncVideo'); // Clean up listener on unmount
        };
    }, [roomCode, videoLink]);

    const handlePlay = () => {
        if (videoRef.current) {
            socket.emit('controlVideo', { action: 'play', currentTime: videoRef.current.currentTime, roomCode });
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            socket.emit('controlVideo', { action: 'pause', currentTime: videoRef.current.currentTime, roomCode });
        }
    };
    

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoPlayer
                        key={videoLink}
                        ref={videoRef}
                        src="https://firebasestorage.googleapis.com/v0/b/snooplay-a5644.appspot.com/o/Barack%20Obama%20s%20Inspirational%20Speech%20with%20Subtitles%20__%20One%20of%20the%20best%20English%20speeches%20ever%202023%20(1).mp4?alt=media&token=90f814bb-09b3-486c-86c0-e402325c268a"  // Use dynamic video link this is hard coded coz there is no dynamic link in the app all athe page paths
                        controls
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onError={(e) => console.error("Video load error:", e)}
                    />
                </VideoWrapper>
                <Title>Watch Along Room</Title>
                <Details>
                <RoomCode>
                  <RoomIDDisplay>Current Room Code : <strong> {roomCode}</strong> </RoomIDDisplay>
                </RoomCode>
                </Details>
                <Hr />
            </Content>
            <ChatOption>
                {/* Chat functionality can be added here */}
                
            </ChatOption>
        </Container>
    );
}

export default WatchAlongRoom;
