import React from 'react'
import styled from 'styled-components'
import banner_imag from "../assets/home_banner.jpg"

const Container = styled.div`
      width: 100%;
      margin-bottom: 10px;
     
`;

const Wrapper = styled.div`

  
`;

const BannerImg = styled.img`
   height: 60vh;
   width: 100%;
`;


const Banner = () => {
  return (
    <Container>
      <Wrapper>
        <BannerImg src={banner_imag}/>
      </Wrapper>
    </Container>
  )
}

export default Banner
