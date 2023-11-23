import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Lottie from "lottie-react";
import aiAnimation from "../assets/AI.json";
import { setUserInput } from "../redux/slices/userInputSlice";
import robotScaningBrain from "../assets/robotScaningBrain1.json";
import bgBehindScaning from "../assets/bgBehindScaning.json";
import comingSoon from "../assets/comingSoon1.json";
import Example from "./Example";

const InputSec = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  const aiAnimationRef = useRef();

  const userPreference = useSelector(
    (state) => state.userPreference.preference
  );
  const userInput = useSelector((state) => state.userInput.userInput);
  const recommendationsStatus = useSelector(
    (state) => state.getRecommendationsStatus.getRecommendationsStatus
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
    width: recommendationsStatus ? "23%" : "40%",
    minHeight: "40vh",
    resize: "none",
    padding: "12px 20px",
    boxSizing: "border-box",
    borderRadius: recommendationsStatus ? "100%" : "15px",
    fontSize: "18px",
    outline: "none",
    zIndex: "1",
    transition: "width 0.5s ease, border-radius 0.5s ease",
  };

  const aiAnimationStyle = {
    width: "13%",
    position: "absolute",
    marginRight: "55%",
    left:
      animationStarted & !recommendationsStatus && userPreference !== "Tv Shows"
        ? "22%"
        : "27.5%",
    opacity:
      animationStarted & !recommendationsStatus && userPreference !== "Tv Shows"
        ? 1
        : 0,
    transform: `scale(${
      animationStarted & !recommendationsStatus && userPreference !== "Tv Shows"
        ? 1
        : 0
    })`,
    transition:
      "opacity 0.4s ease-in-out, transform 0.4s ease-in-out, left 0.5s ease-in-out",
  };

  const handleTextAreaFocus = () => {
    if (!animationStarted) {
      setAnimationStarted(true);
    }
  };

  const handleTextAreaBlur = () => {
    if (userInput.length === 0) {
      setAnimationStarted(false);
    }
  };

  const getPlaceholderText = () => {
    switch (userPreference) {
      case "Movies":
        return "Tell us about the Movie you want to watch...";
      case "Tv Shows":
        // return "Tell us about the Tv Show you want to watch...";
        return "";
      default:
        return "Please select your preference: Movies or TV Shows";
    }
  };

  const handleInputChange = (event) => {
    dispatch(setUserInput(event.target.value));
  };

  const robotScaningBrainStyle = {
    width: "16%",
    position: "absolute",
    zIndex: "100",
    opacity: recommendationsStatus ? 1 : 0,
    transform: `scale(${recommendationsStatus ? 1 : 0})`,
    transition:
      "opacity 0.4s ease-in-out, transform 0.4s ease-in-out, left 0.5s ease-in-out",
  };

  const bgBehindScaningStyle = {
    width: "30%",
    position: "absolute",
    opacity: recommendationsStatus ? 1 : 0,
    transform: `scale(${recommendationsStatus ? 1 : 0})`,
    transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
  };

  const comingSoonStyle = {
    width: "25%",
    position: "absolute",
    opacity: userPreference === "Tv Shows" ? 1 : 0,
    transform: `scale(${userPreference === "Tv Shows" ? 1 : 0})`,
    transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
  };

  const examplesStyle = {
    width: "13%",
    position: "absolute",
    // marginRight: "-5%",
    right:
      userPreference !== "Tv Shows" &&
      userPreference === "Movies" &&
      !recommendationsStatus
        ? "17%"
        : "45%",
    opacity:
      userPreference !== "Tv Shows" &&
      userPreference === "Movies" &&
      !recommendationsStatus
        ? 1
        : 0,
    transform: `scale(${
      userPreference !== "Tv Shows" &&
      userPreference === "Movies" &&
      !recommendationsStatus
        ? 1
        : 0
    })`,
    transition:
      "opacity 0.2s ease-in-out, transform 0.2s ease-in-out, right 0.3s ease-in-out",
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
        placeholder={recommendationsStatus ? "" : getPlaceholderText()}
        style={textAreaStyle}
        onFocus={handleTextAreaFocus}
        onBlur={handleTextAreaBlur}
        onChange={handleInputChange}
        value={
          recommendationsStatus || userPreference === "Tv Shows"
            ? ""
            : userInput
        }
        disabled={
          recommendationsStatus || userPreference === "Tv Shows" ? true : false
        }
      ></textarea>

      <div style={examplesStyle}>
        <Example />
      </div>

      <Lottie
        style={comingSoonStyle}
        loop={userPreference === "Tv Shows" ? false : true}
        animationData={comingSoon}
      />
      <Lottie
        style={bgBehindScaningStyle}
        loop={recommendationsStatus ? true : false}
        animationData={bgBehindScaning}
      />
      <Lottie
        style={robotScaningBrainStyle}
        loop={recommendationsStatus ? true : false}
        animationData={robotScaningBrain}
      />
    </div>
  );
};

export default InputSec;
