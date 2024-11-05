import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../firebase.js"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


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

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;

`;
const Title = styled.h1`
    text-align: center;

`;

const Input = styled.input`
    border: 1px solid #969696;
    color: aliceblue;
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const Desc = styled.textarea`
    border: 1px solid #969696;
    color: aliceblue;
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const UploadBtn = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 30px;
    font-weight: 500;
    cursor: pointer;
    background-color : #373737;
    color: #e4e4e4;
`;

const Label = styled.label`
    font-size: 14px;
`;

const UploadVideo = ({setOpen}) => {

  const [img,setImg] = useState(undefined)
  const [video,setVideo] = useState(undefined)
  const [imgPerc,setImgPerc] = useState(0)
  const [videoPerc,setVideoPerc] = useState(0)
  const [inputs,setInputs] = useState({})

  const [tags,setTags] = useState([])

  const navigate = useNavigate()
  const handleChange = e=>{
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value};
    })
  }

  const handleTags = (e)=>{
    setTags(e.target.value.split(","))
  }

  const uploadFile = (file, urlType) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime()+file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},() => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(()=>{
    video && uploadFile(video, "videoUrl")

  },[video])

  useEffect(()=>{
   img && uploadFile(img, "imgUrl")

  },[img]);

  const handleUpload = async (e)=>{
    e.preventDefault();
    
    const res = await axios.post("http://localhost:8000/api/videos", {...inputs, tags}
    )
    setOpen(false)
    res.status===200 && navigate(`http://localhost:8000/api/video/${res.data._id}`)
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={()=>setOpen(false)} >X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc>0 ? ("uploading:"+ videoPerc) : (<Input type='file' accept='video/*' onChange={e=>setVideo(e.target.files[0])}/>)}
        <Input type='text' placeholder='Title' name='title' onChange={handleChange}/>
        <Desc placeholder='Description' rows={8} name='desc' onChange={handleChange}/>
        <Input type='text' placeholder='Seperate the tags with commas.' onChange={handleTags}/>
        <Label>Image:</Label>
       { imgPerc>0 ? ("uploading:"+ imgPerc) +"%" : (<Input type='file' accept='image/*' onChange={e=>setImg(e.target.files[0])}/>)}
        <UploadBtn onClick={handleUpload}>Upload</UploadBtn>
      </Wrapper>
    </Container>
  )
}

export default UploadVideo
