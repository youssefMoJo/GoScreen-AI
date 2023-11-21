import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "29de87d3f58e703ce82ba34e2460edcd";

class TMDBApi {
  static async startTMDBApi(moviesNames) {
    let moviesIDs = await this.getMoviesIDs(moviesNames);
    let moviesDetails = await this.movieDetails(moviesIDs);
    let moviesDetailsWithRatings = await this.getMoviesRatings(moviesDetails);
    let moviesDetailsWithRatingsAndTrailers = await this.getMoviesTrailers(
      moviesDetailsWithRatings
    );

    let moviesDetailsWithRatingsTrailersAndCast = await this.getMoviesCast(
      moviesDetailsWithRatingsAndTrailers
    );

    return moviesDetailsWithRatingsTrailersAndCast;
  }

  static async getMoviesCast(moviesDetailsWithRatingsAndTrailers) {
    for (let i = 0; i < moviesDetailsWithRatingsAndTrailers.length; i++) {
      const url = `${API_URL}movie/${moviesDetailsWithRatingsAndTrailers[i].id}/credits?api_key=${API_KEY}`;
      moviesDetailsWithRatingsAndTrailers[i]["cast"] = await axios
        .get(url)
        .then((res) => {
          return res.data.cast.splice(0, 5);
          //   console.log(res.data.cast.splice(0, 5));
        })
        .catch((err) => {
          return err;
        });
    }
    return moviesDetailsWithRatingsAndTrailers;
  }

  static async getMoviesTrailers(moviesDetailsWithRatings) {
    for (let i = 0; i < moviesDetailsWithRatings.length; i++) {
      const url = `${API_URL}movie/${moviesDetailsWithRatings[i].id}/videos?api_key=${API_KEY}`;
      let youtubeKey = await axios
        .get(url)
        .then((res) => {
          for (let e = 0; e < res.data.results.length; e++) {
            if (
              (res.data.results[e].name === "Trailer" ||
                res.data.results[e].type === "Trailer") &&
              res.data.results[e].official &&
              res.data.results[e].site === "YouTube"
            ) {
              return res.data.results[e].key;
            }
          }
        })
        .catch((err) => {
          return err;
        });

      moviesDetailsWithRatings[i]["trailer"] = youtubeKey;
    }

    return moviesDetailsWithRatings;
  }

  static async getMoviesRatings(moviesDetails) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "42b784d278msh9968340461abba7p11162bjsn1e9e2aa283f5",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };

    for (let i = 0; i < moviesDetails.length; i++) {
      options.url = `https://moviesdatabase.p.rapidapi.com/titles/${moviesDetails[i].imdb_id}/ratings`;
      try {
        const response = await axios.request(options);
        let imdbRating = response.data.results.averageRating;
        moviesDetails[i]["ratings"] = {
          imdb: imdbRating,
        };
      } catch (error) {
        return error;
      }
    }

    return moviesDetails;
  }

  static async getMoviesIDs(moviesNames) {
    let moviesIDs = [];
    for (let i = 0; i < moviesNames.length; i++) {
      const url = `${API_URL}search/movie?api_key=${API_KEY}&query=${moviesNames[i]}`;
      moviesIDs.push(
        await axios
          .get(url)
          .then((res) => {
            return res.data.results[0].id;
          })
          .catch((err) => {
            return undefined;
          })
      );
    }

    return moviesIDs;
  }

  static async movieDetails(moviesIDs) {
    let moviesDetails = [];

    let eachMovieWantedAttributes = [
      "backdrop_path",
      "genres",
      "imdb_id",
      "original_title",
      "overview",
      "poster_path",
      "release_date",
      "runtime",
    ];

    for (let i = 0; i < moviesIDs.length; i++) {
      const url = `${API_URL}movie/${moviesIDs[i]}?api_key=${API_KEY}`;
      let eachMovieFilteredObject = {};
      moviesDetails.push(
        await axios
          .get(url)
          .then((res) => {
            eachMovieFilteredObject["id"] = moviesIDs[i];
            for (let e = 0; e < eachMovieWantedAttributes.length; e++) {
              eachMovieFilteredObject[eachMovieWantedAttributes[e]] =
                res.data[eachMovieWantedAttributes[e]];
            }

            return eachMovieFilteredObject;
          })

          .catch((err) => {
            return undefined;
          })
      );
    }

    return moviesDetails;
  }
}

export default TMDBApi;
