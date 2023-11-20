import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import youtube from "../assets/youtube.json";

const MovieTrailer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsRendered(true);
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  const movieTrailerStyle = {
    backgroundColor: "rgba(109, 109, 109, 0.33)",
    borderRadius: "15px",
    color: "#38C02C",
    fontWeight: "bold",
    fontSize: "1.2rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s, transform 0.2s",
    width: "88%",
    height: "13%",
    transform: isRendered ? "scale(1)" : "scale(0)",
  };

  const onHoverStyle = {
    backgroundColor: "rgba(109, 109, 109, 0.5)",
  };

  const youtubeAnimationStyle = {
    width: "45px",
    paddingTop: "10px",
  };

  return (
    <a
      href="https://your-trailer-link.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...movieTrailerStyle, ...(isHovered && onHoverStyle) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Lottie
        style={youtubeAnimationStyle}
        loop={true}
        animationData={youtube}
      />
      WATCH TRAILER
    </a>
  );
};

export default MovieTrailer;
