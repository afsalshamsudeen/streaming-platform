import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from './Card';

const Container = styled.div`
    flex: 2;
`;



const Recommendation = ({tags}) => {
    const [videos, setVideos] = useState([]);

    useEffect(()=>{
        const fetcVideos = async ()=>{
            const res = await axios.get(`http://localhost:8000/api/videos/tags?tags=${tags}`);
            console.log("Fetched videos:", res.data);
            setVideos(res.data);
        };
        fetcVideos();
    },[tags])
  return (
    <Container>
      {videos.map(video=>{
        <Card type="sm" key={video._id} video={video}/>
      })}
    </Container>
  )
}

export default Recommendation
