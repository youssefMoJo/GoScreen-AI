import "../Styles/GlowingBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { setPreference } from "../redux/slices/preferenceSlice";

const Preference = () => {
  const userPreference = useSelector(
    (state) => state.userPreference.preference
  );

  const dispatch = useDispatch();
  console.log(userPreference);
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
    dispatch(setPreference("Movies"));
  };

  const handleTvShowsClick = () => {
    dispatch(setPreference("Tv Shows"));
  };

  return (
    <div style={referencrsSectionContainer}>
      <div style={referencrsTile}>What are you in the mood for?</div>
      <div style={glowingBtnsContainer}>
        <div
          className={`glowing-btn ${
            userPreference === "Movies" ? "clicked" : ""
          }`}
          onClick={handleMoviesClick}
        >
          <span className="glowing-txt">
            M<span className="faulty-letter">O</span>VIES
          </span>
        </div>

        <div
          className={`glowing-btn ${
            userPreference === "Tv Shows" ? "clicked" : ""
          }`}
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
