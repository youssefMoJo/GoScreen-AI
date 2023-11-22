import React, { useEffect, useState } from "react";
import poster from "../assets/poster.jpg";
import MovieTrailer from "./MovieTrailer";
import { useSelector } from "react-redux";

const MoviePoster = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const userMovies = useSelector((state) => state.movies.movies);
  const currentMovie = useSelector((state) => state.currentMovie.currentMovie);

  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const animateCard = async () => {
      await delay(400);

      setIsLoaded(true);
    };

    animateCard();
  }, []);

  const posterContainerStyle = {
    width: "16rem",
  };

  const moviePosterStyle = {
    height: "21rem",
    // width: "14rem",
    borderRadius: "4%",
    // position: "absolute",
    // top: "35%",
    // left: "10%",
    marginTop: "-10rem",
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(-15deg)",
    transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
  };

  return (
    <div style={posterContainerStyle}>
      <img
        src={
          `https://image.tmdb.org/t/p/original` +
          userMovies[currentMovie].poster_path
        }
        style={moviePosterStyle}
        alt="Movie Poster"
      />
      <MovieTrailer />
    </div>
  );
};

export default MoviePoster;
