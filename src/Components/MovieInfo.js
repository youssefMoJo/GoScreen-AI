import React, { useEffect, useState } from "react";
import imdbIcon from "../assets/imdb.png";
import rottenTomatoesIcon from "../assets/rottenTomatoes.png";
import { useSelector } from "react-redux";

const MovieInfo = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const userMovies = useSelector((state) => state.movies.movies);
  const currentMovie = useSelector((state) => state.currentMovie.currentMovie);

  useEffect(() => {
    // Delay the animation by 1000 milliseconds (1 second)
    const delay = 500;

    // Trigger animation after the specified delay
    const timeoutId = setTimeout(() => {
      setAnimationFinished(true);
    }, delay);

    // Clear the timeout when the component unmounts to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  const movieInfoStyle = {
    // backgroundColor: "green",
    width: "60%",
    marginTop: "-6rem",
    zIndex: "1",
    opacity: animationFinished ? 1 : 0,
    transform: animationFinished
      ? "translateX(0) scale(1)"
      : "translateX(-50px) scale(0)",
    transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
  };

  const movieNameStyle = {
    fontSize: "40px",
  };

  const timeGenraDateStyle = {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#C8C8C8",
  };

  const ratingsContainerStyle = {
    display: "flex",
    gap: "40px",
  };

  const IMDBIconStyle = {
    width: "3rem",
  };

  const RatingContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const IMDBRatingStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#C8C8C8",
  };

  const rottenTomatoesIconStyle = {
    width: "2.1rem",
  };

  const castStyle = {
    fontSize: "20px",
    marginBottom: "12px",
    color: "#C8C8C8",
  };

  const descriptionStyle = {
    fontSize: "18px",
    height: "200px",
    overflowY: "auto",
    color: "white",
    paddingRight: "15px",
  };

  return (
    <div style={movieInfoStyle}>
      <h2 style={movieNameStyle}>{userMovies[currentMovie].original_title}</h2>
      <div style={timeGenraDateStyle}>
        2h 30min / adventure, Drama / 2023-09-20
      </div>

      <div style={ratingsContainerStyle}>
        <div style={RatingContainerStyle}>
          <img style={IMDBIconStyle} src={imdbIcon} alt="IMDB Icon" />
          <span style={IMDBRatingStyle}>7/10</span>
        </div>

        <div style={RatingContainerStyle}>
          <img
            style={rottenTomatoesIconStyle}
            src={rottenTomatoesIcon}
            alt="rottenTomatoes Icon"
          />
          <span style={IMDBRatingStyle}>97%</span>
        </div>
      </div>

      <div style={castStyle}>
        Cast: Jason Statham, 50 Cent, Megan Fox, Dolph Lundgren, Iko Uwais...
      </div>

      <div style={descriptionStyle}>
        Armed with every weapon they can get their hands on and the skills to
        use them, The Expendables are the world’s last line of defense and the
        team that gets called when all other options are off the table. But new
      </div>
    </div>
  );
};

export default MovieInfo;
