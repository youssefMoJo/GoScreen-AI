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

  const askChatGPT = async() => {
    const options = {
      method: 'POST',
      url: 'https://chatgpt-api8.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b81f2cbc1amsh75d040f81ce647fp1fa4e1jsn6b50598596df',
        'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
      },
      data: [
        {
          content: 'Hello! I\'m an AI assistant bot based on ChatGPT 3. How may I help you?',
          role: 'system'
        },
        {
          content: 'Provide 3 excellent movie titles and return them in a JSON object under the "movies" key. Just return the JSON',
          role: 'user'
        }
      ]
    };
    
    try {
      const response = await axios.request(options);
      const movies = JSON.parse(response.data.text);
      return movies.movies
      // movies.movies.map((eachMovie, i)=> {
      //   console.log(eachMovie);

      // })
    } catch (error) {
      console.error(error);
    }

 
  }

  const handleConfirmation = async () => {
    dispatch(setGetRecommendationsStatus(true));
    dispatch(setIsConfirmationLoadingFinished(false));
    let movies = await askChatGPT()
    console.log(movies)
    // let movies = ["The Shawshank Redemption", "spider man", "Inception"];
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
