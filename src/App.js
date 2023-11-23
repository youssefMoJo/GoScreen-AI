import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import MoviesPage from "./Components/MoviesPage";
import { useSelector } from "react-redux";
import ResponsiveMessage from "./Components/ResponsiveMessage";

function App() {
  const isConfirmationLoadingFinished = useSelector(
    (state) => state.isConfirmationLoadingFinished.isConfirmationLoadingFinished
  );

  const moviesRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isConfirmationLoadingFinished) {
      setTimeout(() => {
        moviesRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }, 450);
    }
  }, [isConfirmationLoadingFinished]);

  const renderContent = () => {
    if (screenWidth < 1000) {
      return <ResponsiveMessage />;
    } else {
      return (
        <>
          <Home />
          {isConfirmationLoadingFinished ? (
            <div ref={moviesRef}>
              <MoviesPage />
            </div>
          ) : null}
        </>
      );
    }
  };

  return <div className="App">{renderContent()}</div>;
}

export default App;
