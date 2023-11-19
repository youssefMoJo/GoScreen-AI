import coverImage from "../assets/cover.png";
import MoviePoster from "./MoviePoster";

const EachMovie = () => {
  const eachMovieStyle = {
    position: "relative",
    height: "50vh",
  };

  const coverImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const coverImageBlackLayerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: "0.5",
    background: "linear-gradient(to top, #003157, transparent)",
  };

  return (
    <div style={eachMovieStyle}>
      <img src={coverImage} style={coverImageStyle} />
      <div style={coverImageBlackLayerStyle}></div>

      <MoviePoster />
    </div>
  );
};

export default EachMovie;
