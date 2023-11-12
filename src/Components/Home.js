import Title from "./Title";
import References from "./References";

const Home = () => {
  const homeStyle = {
    height: "88vh",
    background: "linear-gradient(to bottom right, #003663, #01183d, #421236)",
    padding: "6vh",
  };

  return (
    <div style={homeStyle}>
      <Title />
      <References />
    </div>
  );
};

export default Home;
