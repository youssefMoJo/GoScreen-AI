import "../Styles/GetRecommendationsBtn.css";
import { useSelector } from "react-redux";

const GetRecommendationsBtn = () => {
  const userPreference = useSelector(
    (state) => state.userPreference.preference
  );

  const userInput = useSelector((state) => state.userInput.userInput);

  const GetRecommendationsBtnStyle = {
    textAlign: "center",
  };
  const isButtonDisabled = !(userPreference.length > 0 && userInput.length > 0);

  return (
    <div style={GetRecommendationsBtnStyle}>
      <a
        href="#"
        className={`button ${isButtonDisabled ? "buttonDisabled" : ""}`}
      >
        Get Recommendations
      </a>
    </div>
  );
};

export default GetRecommendationsBtn;
