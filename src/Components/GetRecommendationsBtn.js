import "../Styles/GetRecommendationsBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { setGetRecommendationsStatus } from "../redux/slices/getRecommendationsStatus";
import { setIsConfirmationLoadingFinished } from "../redux/slices/confirmationLoading";
import TMDBApi from "../TMDBApi";
import { setMovies } from "../redux/slices/movies";
import axios from "axios";
import React, { useState } from "react";

const GetRecommendationsBtn = () => {
  const [error, setError] = useState("");

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

    const options = {
      method: "POST",
      url: "https://chatgpt-api8.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "42b784d278msh9968340461abba7p11162bjsn1e9e2aa283f5",
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
    } catch (err) {
      console.log("from chatGPT func: ", err.response);
    }
  };

  const handleConfirmation = async () => {
    dispatch(setGetRecommendationsStatus(true));
    dispatch(setIsConfirmationLoadingFinished(false));

    try {
      let chatGPTMovies = await askChatGPT(userInput);
      console.log("chatGPTMovies: ", chatGPTMovies);

      // let chatGPTMovies = ["Mad Max: Fury Road", "The Road"];
      let allMoviesFromTMDB = await TMDBApi.startTMDBApi(chatGPTMovies);
      dispatch(setMovies(allMoviesFromTMDB));

      if (allMoviesFromTMDB) {
        dispatch(setGetRecommendationsStatus(false));
        dispatch(setIsConfirmationLoadingFinished(true));
        setError("");
      }
    } catch (err) {
      dispatch(setGetRecommendationsStatus(false));
      setError(
        "Unable to process your request at the moment. Please try again with a different input or use a predefined example. Alternatively, try again later."
      );
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
      {error ? (
        <div style={{ color: "red", paddingTop: "10px" }}>{error}</div>
      ) : null}
    </div>
  );
};

export default GetRecommendationsBtn;
