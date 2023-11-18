import React, { useState } from "react";
import Lottie from "lottie-react";
import moviesAnimation from "../assets/moviesAnimation.json";

const Movies = () => {
  const [animationFinished, setAnimationFinished] = useState(false);

  const handleAnimationFinish = () => {
    setAnimationFinished(true);
  };

  const moviesContainerStyle = {
    position: "relative",
    minHeight: "100vh",
    background: animationFinished ? "#003157" : "black",
    transition: "background 0.5s ease",
    color: "white",
    overflow: "hidden",
    // padding: "6vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const animationWrapperStyle = {
    position: "absolute",
    top: animationFinished ? "0vh" : "50%",
    left: animationFinished ? "0vh" : "50%",
    transform: animationFinished
      ? "scale(0.5) translate(-50%, -50%)"
      : "translate(-50%, -50%)",
    transition: "top 0.5s ease, left 0.5s ease, transform 0.5s ease",
  };

  const moviesAnimationStyle = {
    width: animationFinished ? "40%" : "100%",
    transition: "width 0.5s ease-in-out",
  };

  const navBarStyle = {
    position: "absolute",
    top: 0,
    background: "black",
    width: "100%",
    height: "7%",
    opacity: "0.3",
  };

  return (
    <div style={moviesContainerStyle}>
      <div style={navBarStyle}></div>
      <div style={animationWrapperStyle}>
        <Lottie
          style={moviesAnimationStyle}
          loop={false}
          animationData={moviesAnimation}
          onComplete={handleAnimationFinish}
        />
      </div>
    </div>
  );
};

export default Movies;
