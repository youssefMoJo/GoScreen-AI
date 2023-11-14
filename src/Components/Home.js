import Title from "./Title";
import Preference from "./Preference";

import InputSec from "./InputSec"

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
      <InputSec/>
      
    </div>
  );
};

export default Home;
