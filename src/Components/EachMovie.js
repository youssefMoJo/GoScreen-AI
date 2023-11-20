import MovieCover from "./MovieCover";
import MoviePoster from "./MoviePoster";
import MovieInfo from "./MovieInfo";

const EachMovie = () => {
  const movieDataSecStyle = {
    display: "flex",
    // backgroundColor: "blue",
    paddingLeft: "17rem",
  };

  return (
    <div>
      <MovieCover />
      <div style={movieDataSecStyle}>
        <MoviePoster />
        <MovieInfo />
      </div>
    </div>
  );
};

export default EachMovie;
