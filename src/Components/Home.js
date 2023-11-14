import React from "react";

import Title from "./Title";
import Preference from "./Preference";
import InputSec from "./InputSec";
import SmallRobot from "./SmallRobot";
import GetRecommendationsBtn from "./GetRecommendationsBtn";

const Home = () => {
  const homeStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #003663, #01183d, #421236)",
    padding: "6vh",
  };

  return (
    <div style={homeStyle}>
      <Title />
      <Preference />
      <InputSec />
      <SmallRobot />
      <GetRecommendationsBtn />
    </div>
  );
};

export default Home;
