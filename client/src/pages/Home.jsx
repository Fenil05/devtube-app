import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import newRequest from "../utils/newRequest";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos,setVideos] = useState([])

  useEffect(()=>{
    const fetchVideos = async()=>{
      const res = await newRequest.get(`videos/${type}`)
      setVideos(res.data)
    }
    fetchVideos()
  },[type])

  return (
    <Container>
      {
        videos.map((video)=>{
          return <Card key={video._id} video={video} />
        })
      } 
      
    </Container>
  );
};

export default Home;
