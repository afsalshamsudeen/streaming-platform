import React from "react";
import styled from "styled-components";
import banner_imag from "../assets/banner_image.jpeg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Container = styled.div`
  height: 450px;
  width: 100%;
  position: relative;
  background-size: cover;
  color: aliceblue;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the container without distortion */
    position: absolute; /* Position the image absolutely */
    top: 0;
    left: 0;
    z-index: -1; /* Places the image behind other content */
  }
`;

const Wrapper = styled.div`
  padding-top: 140px;
  padding-left: 10px;
  padding-right: 10px;
  height: 190px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  padding-bottom: 0.3rem;
  line-height: 1.3;
`;

const BannerBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlayButton = styled.button`
  color: aliceblue;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 5px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;

  &:hover {
    color: black;
    background-color: #e6e6e6;
  }
`;

const Desc = styled.h1`
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  height: 80px;
  overflow: hidden;
`;

const FadeCover = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61, #111)
  );
`;

const Banner = ({ title, description, image }) => {
  const truncateTitle = (title, wordLimit) => {
    const words = title.split(" ");
    if (words.length <= wordLimit) {
      return title;
    }
    return words.slice(0, wordLimit).join(" ") + " ...";
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + " ...";
  };

  const truncatedTitle = truncateTitle(title, 5);
  const truncatedDescription = truncateText(description, 20);

  return (
    <Container >
      <img src={image} alt="banner image"/>
      <Wrapper>
        <Title>{truncatedTitle}</Title>
        <BannerBtns>
          <PlayButton>
            <PlayArrowIcon />
            Play
          </PlayButton>
          <PlayButton>
            <BookmarkIcon />
            Follow
          </PlayButton>
        </BannerBtns>
        <Desc>{truncatedDescription}</Desc>
        <FadeCover />
      </Wrapper>
    </Container>
  );
};

export default Banner;
