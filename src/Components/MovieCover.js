import React, { useEffect, useState } from "react";
import coverImage from "../assets/cover.png";

const MovieCover = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulating a delay for demonstration purposes
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const animateCover = async () => {
      await delay(400); // Adjust the delay as needed

      // Set the isLoaded state to trigger the transition
      setIsLoaded(true);
    };

    animateCover();
  }, []);

  const movieCoverStyle = {
    position: "relative",
    height: "50vh",
    overflow: "hidden", // Hide the overflow to ensure gradient is clipped
  };

  const coverImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: isLoaded ? "scale(1)" : "scale(0)", // Scale from smallest to original size
    transition: "transform 0.5s ease-in-out", // Transition property for transform
  };

  const coverImageBlackLayerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to top, #003157, transparent)",
    transition: "opacity 0.3s ease-in-out", // Transition property for opacity
    opacity: isLoaded ? 0.7 : 0, // Initial opacity set to 0
  };

  return (
    <div style={movieCoverStyle}>
      <img src={coverImage} style={coverImageStyle} alt="Movie Cover" />
      <div style={coverImageBlackLayerStyle}></div>
    </div>
  );
};

export default MovieCover;
