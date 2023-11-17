import React from "react";
import Lottie from "lottie-react";
import moviesAnimation from "../assets/moviesAnimation.json";

const MoviesAnimation = ({ onAnimationFinish }) => {
  const moviesAnimationStyle = {
    width: "30%",
    transition: "width 1s ease-in-out",
  };

  const moviesAnimationContainer = {
    minHeight: "100vh",
    background: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 1s ease-in-out",
  };

  const handleAnimationComplete = () => {
    onAnimationFinish();
  };

  return (
    <div style={moviesAnimationContainer}>
      <Lottie
        style={moviesAnimationStyle}
        loop={false}
        animationData={moviesAnimation}
        onComplete={handleAnimationComplete}
      />
    </div>
  );
};

export default MoviesAnimation;
