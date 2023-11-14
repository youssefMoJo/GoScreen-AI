import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Lottie from "lottie-react";
import aiAnimation from "../assets/AI.json";
import { setUserInput } from "../redux/slices/userInputSlice";

const InputSec = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationGoBackStarted, setanimationGoBackStarted] = useState(false);
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
    marginRight: "25%",
    left: animationStarted & !animationGoBackStarted ? "22%" : "26%",
    transition: "left 0.5s ease-in-out",
  };

  const handleTextAreaFocus = () => {
    if (!animationStarted) {
      setAnimationStarted(true);
      setTimeout(() => {
        setanimationGoBackStarted(true);
      }, 3000);
    }
  };

  const handleTextAreaBlur = () => {
    setAnimationStarted(false);
    setanimationGoBackStarted(false);
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
        {animationStarted ? (
          <Lottie
            lottieRef={aiAnimationRef}
            loop={false}
            animationData={aiAnimation}
          />
        ) : null}
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
