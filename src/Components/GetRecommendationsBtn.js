import "../Styles/GetRecommendationsBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { setGetRecommendationsStatus } from "../redux/slices/getRecommendationsStatus";
import { setIsConfirmationLoadingFinished } from "../redux/slices/confirmationLoading";
import TMDBApi from "../TMDBApi";
import { setMovies } from "../redux/slices/movies";

const GetRecommendationsBtn = () => {
  const userPreference = useSelector(
    (state) => state.userPreference.preference
  );

  const userInput = useSelector((state) => state.userInput.userInput);
  const recommendationsStatus = useSelector(
    (state) => state.getRecommendationsStatus.getRecommendationsStatus
  );

  const dispatch = useDispatch();

  const GetRecommendationsBtnStyle = {
    textAlign: "center",
  };
  let isButtonDisabled = !(userPreference === "Movies" && userInput.length > 0);

  async function startTMDBApi() {
    let movies = ["The Shawshank Redemption", "The Godfather", "Inception"];
    let result = await TMDBApi.startTMDBApi(movies);
    console.log(result);
  }

  const handleConfirmation = async () => {
    dispatch(setGetRecommendationsStatus(true));
    dispatch(setIsConfirmationLoadingFinished(false));

    let movies = ["The Shawshank Redemption", "The Godfather", "Inception"];
    let allMovies = await TMDBApi.startTMDBApi(movies);
    dispatch(setMovies(allMovies));

    if (allMovies) {
      dispatch(setGetRecommendationsStatus(false));
      dispatch(setIsConfirmationLoadingFinished(true));
    }

    // setTimeout(() => {
    //   dispatch(setGetRecommendationsStatus(false));
    //   dispatch(setIsConfirmationLoadingFinished(true));
    // }, 4500);
  };

  return (
    <div style={GetRecommendationsBtnStyle}>
      <a
        href="#"
        className={`button ${
          isButtonDisabled || recommendationsStatus ? "buttonDisabled" : ""
        }`}
        onClick={handleConfirmation}
      >
        Get Recommendations
      </a>
    </div>
  );
};

export default GetRecommendationsBtn;
