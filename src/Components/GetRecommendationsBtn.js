import "../Styles/GetRecommendationsBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { setGetRecommendationsStatus } from "../redux/slices/getRecommendationsStatus";
import { setIsConfirmationLoadingFinished } from "../redux/slices/confirmationLoading";
import TMDBApi from "../TMDBApi";
import { setMovies } from "../redux/slices/movies";
import axios from "axios";
import React, { useState, useEffect } from "react";

const GetRecommendationsBtn = () => {
  const [error, setError] = useState("");
  const [RapidAPIKey, setRapidAPIKey] = useState(null);

  const RapidAPIKeys = [
    "42b784d278msh9968340461abba7p11162bjsn1e9e2aa283f5", //67
    "b18129b7eamsh49823c12ed46d8fp15fdbajsnb83dd341a2b2", // 848
    "b81f2cbc1amsh75d040f81ce647fp1fa4e1jsn6b50598596df", // yrs
    "10e50224a5msh13c90e024fccde6p1f6d08jsn7a08f5bd9293", //sparkledrive
    "9d08ec770bmshe7c36e50e9a135ep10438cjsn8899f23a2335", //workwithyoussef
    "4402431e98mshc28c91a8db7a4d2p121317jsn573d39e2cbf7", //yekola
  ];

  const userPreference = useSelector(
    (state) => state.userPreference.preference
  );

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * RapidAPIKeys.length);
    const randomKey = RapidAPIKeys[randomIndex];
    setRapidAPIKey(randomKey);
  }, []);

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
        ? `here is the user input: ${userInput}.  Provide me with a list of 10 excellent movies that match my criteria. Return them in a JSON object under the 'movies' key. The JSON should consist of an array of movie names, each represented as a string 'movie name'. do not number the movies just each element in the movie names array is "movie name" `
        : `here is the user input: ${userInput}.  Provide me with a list of 10 excellent movies that match my criteria. Return them in a JSON object under the 'movies' key. The JSON should consist of an array of movie names, each represented as a string 'movie name'. do not number the movies just each element in the movie names array is "movie name". try to get new movies other than these ${moviesNames}`;

    const options = {
      method: "POST",
      url: "https://chatgpt-api8.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": `42b784d278msh9968340461abba7p11162bjsn1e9e2aa283f5`,
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
      const responseString = `Certainly! Here are 10 romantic movies that fit your criteria:

        {
          "movies": [
            "1. The Holiday",
            "2. About Time",
            "3. Before Sunrise",
            "4. Amélie",
            "5. Silver Linings Playbook",
            "6. Crazy, Stupid, Love",
            "7. The Proposal",
            "8. La La Land",
            "9. The Princess Bride",
            "10. Love Actually"
          ]
        } 
        I hope you find these movies enjoyable! Let me know if there's anything else I can assist you with.`;
      console.log(response);
      console.log(extractMovies(response.data.text));

      // const movies = JSON.parse(response.data.text);
      return extractMovies(response.data.text);
    } catch (err) {
      console.log("from chatGPT func: ", err);
    }
  };

  function extractMovies(response) {
    try {
      // Extract the JSON object from the response string
      const jsonString = response.match(/{[^]*}/);

      // Check if a valid JSON string is found
      if (jsonString) {
        const responseObject = JSON.parse(jsonString[0]);

        // Check if the 'movies' array exists in the response object
        if (responseObject && responseObject.movies) {
          return responseObject.movies;
        } else {
          console.error("Movies array not found in the response.");
          return null;
        }
      } else {
        console.error("No valid JSON object found in the response.");
        return null;
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

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
      let randomIndex = Math.floor(Math.random() * RapidAPIKeys.length);
      let randomKey = RapidAPIKeys[randomIndex];
      while (randomKey === RapidAPIKey) {
        randomIndex = Math.floor(Math.random() * RapidAPIKeys.length);
        randomKey = RapidAPIKeys[randomIndex];
      }
      setRapidAPIKey(randomKey);
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
