import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Person2Icon from "@mui/icons-material/Person2";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { Link, useNavigate } from "react-router-dom";
import UploadVideo from "./UploadVideo";
import { useSelector, useDispatch } from "react-redux";
import Avatar  from "../assets/user.png";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: #202020;
  height: 50px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
`;
const Search = styled.div`
  width: 50%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #373737;
  border-radius: 6px;
  color: aliceblue;
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: aliceblue;
`;
const Signin = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  color: aliceblue;
  background-color: #4d4dff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Upload = styled.div`
  padding: 5px 15px;
  background-color: transparent;
  color: aliceblue;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: aliceblue;
  cursor: pointer;
`;

const AvatarImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const SignOutButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const Navbar = () => {
  const  navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()); // trigger the logout action

  };

  
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={e=>setQ(e.target.value)} />
            <SearchIcon onClick={()=>navigate(`/search?q=${q}`)} />
          </Search>
          <Upload>
          </Upload>
          {currentUser ? (
            <User>
              <VideoCallIcon onClick={() => setOpen(true)} />{" "}
              <AvatarImg src={currentUser.img || Avatar} />
              {currentUser.name}
              <SignOutButton onClick={handleLogout}>Sign Out</SignOutButton>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Signin>
                {" "}
                <Person2Icon />
                Sign In
              </Signin>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <UploadVideo setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
