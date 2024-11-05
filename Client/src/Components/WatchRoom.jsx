import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    border: 1px solid #969696;
    border-radius: 3px;
    background-color: #202020;
    color: aliceblue;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`;

const Title = styled.h1`
    text-align: center;
    margin-top: 30px;
`;

const Close = styled.div`
    position: absolute;
    top: 30px;
    right: 10px;
    cursor: pointer;
`;

const Input = styled.input`
    border: 1px solid #969696;
    color: aliceblue;
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const Buttons = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 30px;
    font-weight: 500;
    cursor: pointer;
    background-color: #373737;
    color: #e4e4e4;
`;

const Label = styled.label`
    font-size: 14px;
`;

const WatchRoom = ({ setOpen }) => {
    const [videoLink, setVideoLink] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    //watchalong room creation block
    const createRoom = () => {
        if (!videoLink) {
            alert("Please provide a video link!");
            return;
        }

        const newRoomCode = Math.random().toString(36).substring(2, 7); // Generate random room code
        setOpen(false);
        // Redirect to WatchAlongRoom with videoLink and roomCode
        navigate(`/watchalong/${newRoomCode}`, { state: { videoLink } });
    };

    const joinRoom = () => {
        if (!roomCode) {
            alert("Please enter a room code!");
            return;
        }
        setOpen(false);
        navigate(`/watchalong/${roomCode}`);
    };

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>WatchAlong</Title>
                <Label>Create Watchalong:</Label>
                <Input placeholder='Video Link' value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
                <Buttons onClick={createRoom}>Create Watchalong</Buttons>

                <Label>Join Watchalong:</Label>
                <Input placeholder='Room Code' value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
                <Buttons onClick={joinRoom}>Join Watchalong</Buttons>
            </Wrapper>
        </Container>
    );
}

export default WatchRoom;
