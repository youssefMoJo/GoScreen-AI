import React, { useEffect, useRef } from "react";

import "./App.css";
import Home from "./Components/Home";
import MoviesPage from "./Components/MoviesPage";
import { useSelector } from "react-redux";
import TMDBApi from "./TMDBApi";

function App() {
  const isConfirmationLoadingFinished = useSelector(
    (state) => state.isConfirmationLoadingFinished.isConfirmationLoadingFinished
  );

  const moviesRef = useRef(null);

  async function someFunction() {
    // let movies = ["The Shawshank Redemption", "The Godfather", "Inception"];
    let movies = ["The Shawshank Redemption"];
    let result = await TMDBApi.startTMDBApi(movies);
    console.log(result);
  }

  useEffect(() => {
    someFunction();

    if (isConfirmationLoadingFinished) {
      setTimeout(() => {
        moviesRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }, 450);
    }
  }, [isConfirmationLoadingFinished]);

  return (
    <div className="App">
      <Home />
      {isConfirmationLoadingFinished ? (
        <div ref={moviesRef}>
          <MoviesPage />
        </div>
      ) : null}
    </div>
  );
}

export default App;
