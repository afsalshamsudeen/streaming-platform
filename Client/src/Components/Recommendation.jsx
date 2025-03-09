import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;

  h2{
    color: white;
  }
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:8000/api/videos/tags?tags=${tags}`);
      setVideos(res.data);
      console.log(tags);
      
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      <h2>Recommendations</h2>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;