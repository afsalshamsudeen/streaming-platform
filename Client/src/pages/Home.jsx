import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../Components/Card'
import Banner from '../Components/Banner'
import axios from "axios";
import banner_image from "../assets/banner_image.jpeg";


const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
`

const Home = ({type}) => {

  const [videos, setVideos] = useState([])
  const [bannerVideo, setBannerVideo] = useState({});
  const defaultBannerImage = banner_image;

  useEffect(()=>{
    const fetchVideos = async ()=>{
      const res = await axios.get(`http://localhost:8000/api/videos/${type}`,{
        withCredentials:true
      });
      setVideos(res.data)

      if (res.data.length > 0) {
        setBannerVideo(res.data[0]);
      }
    };

    fetchVideos()
  },[type])
  
  const bannerImage = bannerVideo.imgUrl ;
  
  return (
    <Container>
      { <Banner title={bannerVideo.title || "Default Title"} description={bannerVideo.desc || "Default Description"} image={bannerImage} videoId={bannerVideo._id}/> }
     {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
        
    </Container>
  )
}

export default Home
