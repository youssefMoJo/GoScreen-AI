import "../Styles/GlowingBtn.css";
import { useState } from "react";

const Preference = () => {
  const [moviesClicked, setMoviesClicked] = useState(false);
  const [tvShowsClicked, setTvShowsClicked] = useState(false);

  const referencrsSectionContainer = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const referencrsTile = {
    fontFamily: "'Press Start 2P', sans-serif",
    color: "#09F0FF",
    marginBottom: "40px",
    fontSize: "18px",
  };

  const glowingBtnsContainer = {
    display: "flex",
    gap: "80px",
  };

  const handleMoviesClick = () => {
    setMoviesClicked(true);
    setTvShowsClicked(false);
  };

  const handleTvShowsClick = () => {
    setMoviesClicked(false);
    setTvShowsClicked(true);
  };

  return (
    <div style={referencrsSectionContainer}>
      <div style={referencrsTile}>What are you in the mood for?</div>
      <div style={glowingBtnsContainer}>
        <div
          className={`glowing-btn ${moviesClicked ? "clicked" : ""}`}
          onClick={handleMoviesClick}
        >
          <span className="glowing-txt">
            M<span className="faulty-letter">O</span>VIES
          </span>
        </div>
        <div
          className={`glowing-btn ${tvShowsClicked ? "clicked" : ""}`}
          onClick={handleTvShowsClick}
        >
          <span className="glowing-txt">
            T<span className="faulty-letter">V</span> SHOWS
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preference;
