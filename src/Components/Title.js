const Title = () => {
  const titleStyle = {
    fontSize: "25px",
    fontFamily: "'Press Start 2P', sans-serif",
    color: "white",
    marginBottom: "13px",
  };
  const aiPoweredStyle = {
    fontFamily: "'Press Start 2P', sans-serif",
    color: "#53FC38",
    fontSize: "18px",
  };

  const titleSectionContainerStyle = {
    marginBottom: "45px",
  };

  return (
    <div style={titleSectionContainerStyle}>
      <div style={titleStyle}>Welcome to Movies & TV Shows Recommender</div>
      <span style={aiPoweredStyle}>AI-Powered</span>
    </div>
  );
};

export default Title;
