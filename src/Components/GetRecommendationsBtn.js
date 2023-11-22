import "../Styles/GetRecommendationsBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { setGetRecommendationsStatus } from "../redux/slices/getRecommendationsStatus";
import { setIsConfirmationLoadingFinished } from "../redux/slices/confirmationLoading";
import TMDBApi from "../TMDBApi";
import { setMovies } from "../redux/slices/movies";
import axios from "axios";

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

  const askChatGPT = async (userInput) => {
    const options = {
      method: "POST",
      url: "https://chatgpt-api8.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "10e50224a5msh13c90e024fccde6p1f6d08jsn7a08f5bd9293",
        "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
      },
      data: [
        {
          content:
            "Hello! I'm an AI assistant bot based on ChatGPT 3. How may I help you?",
          role: "system",
        },
        {
          content: `${userInput} give me 10 names of good movies that have what i want. and return them in a JSON object under the "movies" key. Just return the JSON`,
          role: "user",
        },
      ],
    };

    try {
      const response = await axios.request(options);
      const movies = JSON.parse(response.data.text);
      return movies.movies;
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmation = async () => {
    dispatch(setGetRecommendationsStatus(true));
    dispatch(setIsConfirmationLoadingFinished(false));
    let movies = await askChatGPT(userInput);
    console.log(movies);
    // let movies = [
    //   "Mad Max: Fury Road",
    //   "The Road",
    //   "Children of Men",
    //   "The Book of Eli",
    //   "28 Days Later",
    //   "I Am Legend",
    //   "Snowpiercer",
    //   "The Maze Runner",
    //   "The Hunger Games",
    //   "World War Z",
    // ];
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
