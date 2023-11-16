import "../Styles/GetRecommendationsBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { setGetRecommendationsStatus } from "../redux/slices/getRecommendationsStatus";
import { setUserInput } from "../redux/slices/userInputSlice";
import React, { useState } from "react";

const GetRecommendationsBtn = () => {
  const [userPreferenceBackup, setUserPreferenceBackup] = useState("");
  const [userInputBackup, setUserInputBackup] = useState("");

  const userPreference = useSelector(
    (state) => state.userPreference.preference
  );
  const userInput = useSelector((state) => state.userInput.userInput);

  const dispatch = useDispatch();

  const GetRecommendationsBtnStyle = {
    textAlign: "center",
  };
  let isButtonDisabled = !(userPreference.length > 0 && userInput.length > 0);

  const handleConfirmation = () => {
    dispatch(setGetRecommendationsStatus(true));
    setUserPreferenceBackup(userPreference);
    setUserInputBackup(userInput);
    // dispatch(setUserInput(""));
    setTimeout(() => {
      dispatch(setGetRecommendationsStatus(false));
    }, 4500);
  };

  return (
    <div style={GetRecommendationsBtnStyle}>
      <a
        href="#"
        className={`button ${isButtonDisabled ? "buttonDisabled" : ""}`}
        onClick={handleConfirmation}
      >
        Get Recommendations
      </a>
    </div>
  );
};

export default GetRecommendationsBtn;
