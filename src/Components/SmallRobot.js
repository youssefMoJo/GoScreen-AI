import smallRobot from "../assets/smallRobot.json";
import robotBG from "../assets/robotBG.json";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";

const SmallRobot = () => {
  const userInput = useSelector((state) => state.userInput.userInput);
  let isAnimationReady = userInput.length > 0;

  const smallRobotStyle = {
    width: "13%",
    position: "absolute",
    right: "0",
    bottom: "0px",
    opacity: isAnimationReady > 0 ? 1 : 0,
    transform: `scale(${isAnimationReady > 0 ? 1 : 0})`,
    transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
  };

  const smallRobotBGStyle = {
    width: "13%",
    position: "absolute",
    right: "0",
    bottom: "0px",
    opacity: isAnimationReady > 0 ? 1 : 0,
    transform: `scale(${isAnimationReady > 0 ? 1 : 0})`,
    transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
  };

  return (
    <div>
      <div style={smallRobotStyle}>
        <Lottie loop={true} animationData={smallRobot} />
      </div>
      <div style={smallRobotBGStyle}>
        <Lottie loop={true} animationData={robotBG} />
      </div>
    </div>
  );
};

export default SmallRobot;
