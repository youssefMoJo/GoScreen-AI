import poster from "../assets/poster.jpg";

const MoviePoster = () => {
  const moviePoterStyle = {
    height: "21rem",
    borderRadius: "4%",
    position: "absolute",
    top: "35%",
    left: "10%",
  };

  return (
    <div>
      <img src={poster} style={moviePoterStyle} />
    </div>
  );
};

export default MoviePoster;
