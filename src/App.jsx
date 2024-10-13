import "./App.css";
import styled from "styled-components"
import Menu from "./Components/Menu";
import Navbar from "./Components/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Login from "./pages/Signin";

import WatchAlongRoom from "./pages/WatchAlongRoom";
import WatchRoom from "./Components/WatchRoom";
import { useState } from "react"; 

const Container = styled.div`
  display: flex;
`
const Main = styled.div`
  flex: 7;
  background-color: #181818;
`
const Wrapper = styled.div`
  padding: 22px 96px;
`


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [createdRooms, setCreatedRooms] = useState([]);
  return (
    
  <Container>
    <BrowserRouter>
    <Menu/>
    <Main>
      <Navbar/>
      <Wrapper>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>} /> 
            <Route path="/signin" element={<Login/>} /> 
            <Route path="video">
              <Route path=":id" element={<Video/>}/>
            </Route>

            <Route path="watchroom" 
            element={
            <WatchRoom 
            setOpen={setIsOpen}
            createdRooms={createdRooms}
            setCreatedRooms={setCreatedRooms}
            />} /> 
                <Route path="watchalong/:roomCode" element={<WatchAlongRoom />} /> 

          </Route>
        </Routes>
      </Wrapper>
    </Main>
    </BrowserRouter>
  </Container>
  ); 
}

export default App;
