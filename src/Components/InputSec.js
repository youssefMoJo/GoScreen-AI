import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Lottie from "lottie-react";
import aiAnimation from "../assets/AI.json";
import { setUserInput } from "../redux/slices/userInputSlice";

const InputSec = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const aiAnimationRef = useRef();
  const userPreference = useSelector(
    (state) => state.userPreference.preference
  );

  const dispatch = useDispatch();

  const inputSectionContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "45px",
  };

  const textAreaStyle = {
    width: "40%",
    minHeight: "40vh",
    resize: "none",
    padding: "12px 20px",
    boxSizing: "border-box",
    borderRadius: "15px",
    fontSize: "18px",
    outline: "none",
    zIndex: "1",
  };

  const aiAnimationStyle = {
    width: "13%",
    position: "absolute",
    marginRight: "55%",
    left: animationStarted ? "22%" : "27.5%",
    opacity: animationStarted ? 1 : 0,
    transform: `scale(${animationStarted ? 1 : 0})`,
    transition:
      "opacity 0.4s ease-in-out, transform 0.4s ease-in-out, left 0.5s ease-in-out",
  };

  const handleTextAreaFocus = () => {
    if (!animationStarted) {
      setAnimationStarted(true);
    }
  };

  const handleTextAreaBlur = () => {
    setAnimationStarted(false);
  };

  const getPlaceholderText = () => {
    switch (userPreference) {
      case "Movies":
        return "Tell us about the Movie you want to watch...";
      case "Tv Shows":
        return "Tell us about the Tv Show you want to watch...";
      default:
        return "Please select your preference: Movies or TV Shows";
    }
  };

  const handleInputChange = (event) => {
    dispatch(setUserInput(event.target.value));
  };

  return (
    <div style={inputSectionContainerStyle}>
      <div style={aiAnimationStyle}>
        <Lottie
          lottieRef={aiAnimationRef}
          loop={animationStarted ? true : false}
          animationData={aiAnimation}
        />
      </div>
      <textarea
        placeholder={getPlaceholderText()}
        style={textAreaStyle}
        onFocus={handleTextAreaFocus}
        onBlur={handleTextAreaBlur}
        onChange={handleInputChange}
      ></textarea>
    </div>
  );
};

export default InputSec;
