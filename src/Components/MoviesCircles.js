import React, { useState, useEffect } from "react";
import movieImage from "../assets/spider.png";
import { useSelector } from "react-redux";

const MoviesCircles = () => {
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const userMovies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const animateCircles = async () => {
      for (let i = 1; i <= 3; i++) {
        setSelectedCircle(i);
        await delay(500);
      }

      setSelectedCircle(0);
      setAnimationFinished(true);
    };

    animateCircles();
  }, []);

  const moviesCirclesContainerStyle = {
    position: "absolute",
    bottom: 10,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const movieCircleStyle = (circleNumber) => {
    return {
      width: "80px",
      height: "80px",
      margin: "0 10px",
      borderRadius: "50%",
      cursor: "pointer",
      border:
        selectedCircle === circleNumber
          ? "4px solid green"
          : "6px solid transparent",
      opacity: animationFinished ? 1 : 0,
      transition: "opacity 0.3s ease-in-out",
    };
  };

  const movieImageStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const handleCircleClick = (circleNumber) => {
    setSelectedCircle(circleNumber);
  };

  return (
    <div style={moviesCirclesContainerStyle}>
      {userMovies.map((eachMovie, index) => (
        <div
          key={index}
          style={{
            ...movieCircleStyle(index),
            transitionDelay: `${index * 0.1}s`,
          }}
          onClick={() => handleCircleClick(index)}
        >
          <img
            src={`https://image.tmdb.org/t/p/original` + eachMovie.poster_path}
            alt={`Movie ${index}`}
            style={movieImageStyle}
          />
        </div>
      ))}
    </div>
  );
};

export default MoviesCircles;
