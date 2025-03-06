import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import SendIcon from '@mui/icons-material/Send';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: aliceblue;
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  flex: 1;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;

`
const Comments = ({videoId}) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY
  const handleAddComment = async (event) => {
    if ((event?.key === "Enter" || event === "click") && newComment.trim() !== "") {
      console.log("Comment:", newComment); 
  
      try {
        const response = await axios.post(
          'http://localhost:8000/api/comments',
          {
            desc: newComment,
            videoId: videoId,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`, 
            },
          }
        );
  
        console.log("Response:", response.data);
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment(""); 
  
      } catch (error) {
        console.error("Error adding comment:", error.response?.data || error.message);
      }
    }
  };
  

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Wrapper>

        <Input placeholder="Add a comment..." 
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleAddComment}
        />
        <SendIcon onClick={() => handleAddComment("click")} sx={{ color: "white" }}/>
        </Wrapper>
        
      </NewComment>
      {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;