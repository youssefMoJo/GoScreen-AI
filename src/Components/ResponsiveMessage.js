import Lottie from "lottie-react";
import ResponsiveMessageAnimation from "../assets/ResponsiveMessageAnimation.json";

const ResponsiveMessage = () => {
  const responsiveMessageStyle = {
    position: "absolute",
    minHeight: "100vh",
    color: "white",
    background: "linear-gradient(to bottom right, #003663, #01183d, #421236)",

    padding: "3rem",
    fontSize: "1.5rem",
    textAlign: "justify",
    border: "1px solid #f5c6cb",
  };

  const responsiveMessageAnimationStyle = {
    width: "70%",
    margin: "auto",
  };

  return (
    <div style={responsiveMessageStyle}>
      <p>
        Oops! It looks like your screen size is a bit narrow for the optimal
        experience.
      </p>
      <p>
        Our website is best viewed on wider screens (1000px and above). Feel
        free to explore, but for the best user experience, we recommend using a
        device with a larger screen. Thank you for your understanding!
      </p>
      <Lottie
        style={responsiveMessageAnimationStyle}
        loop={true}
        animationData={ResponsiveMessageAnimation}
      />
    </div>
  );
};

export default ResponsiveMessage;
