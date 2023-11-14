import React from "react";
import Lottie from "lottie-react";

import Title from "./Title";
import Preference from "./Preference";
import InputSec from "./InputSec";
import smallRobot from "../assets/smallRobot.json";

const Home = () => {
  const homeStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #003663, #01183d, #421236)",
    padding: "6vh",
  };

  const smallRobotStyle = {
    width: "13%",
    position: "absolute",
    right: "0",
    bottom: "0px",
  };

  return (
    <div style={homeStyle}>
      <Title />
      <Preference />
      <InputSec />
      <div style={smallRobotStyle}>
        <Lottie loop={true} animationData={smallRobot} />
      </div>
    </div>
  );
};

export default Home;
