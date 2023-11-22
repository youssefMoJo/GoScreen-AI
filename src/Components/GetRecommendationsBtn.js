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

  const userMovies = useSelector((state) => state.movies.movies);

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
    let moviesNames = [];
    for (let i = 0; i < userMovies.length; i++) {
      moviesNames.push(userMovies[i].original_title);
    }

    let content =
      userMovies.length === 0
        ? `${userInput} give me 10 names of good movies that have what i want. and return them in a JSON object under the "movies" key. Just return the JSON, just the names of the movies in a JSON object under the "movies" key`
        : `${userInput} give me 10 names of good movies that have what i want. and return them in a JSON object under the "movies" key, just the names of the movies in a JSON object under the "movies" key. Just return the JSON. try to get new movies other than these ${moviesNames}`;
    console.log("userMovies:", userMovies);

    const options = {
      method: "POST",
      url: "https://chatgpt-api8.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "4402431e98mshc28c91a8db7a4d2p121317jsn573d39e2cbf7",
        "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
      },
      data: [
        {
          content:
            "Hello! I'm an AI assistant bot based on ChatGPT 3. How may I help you?",
          role: "system",
        },
        {
          content: content,
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
    let chatGPTMovies = await askChatGPT(userInput);
    console.log("chatGPTMovies: ", chatGPTMovies);
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
    let allMoviesFromTMDB = await TMDBApi.startTMDBApi(chatGPTMovies);
    dispatch(setMovies(allMoviesFromTMDB));

    if (allMoviesFromTMDB) {
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
