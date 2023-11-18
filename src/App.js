import React, { useEffect, useRef } from "react";

import "./App.css";
import Home from "./Components/Home";
import MoviesPage from "./Components/MoviesPage";
import { useSelector } from "react-redux";

function App() {
  const isConfirmationLoadingFinished = useSelector(
    (state) => state.isConfirmationLoadingFinished.isConfirmationLoadingFinished
  );

  const moviesRef = useRef(null);

  useEffect(() => {
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
