import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "29de87d3f58e703ce82ba34e2460edcd";

class TMDBApi {
  static async startTMDBApi(moviesNames) {
    let moviesIDs = await this.getMoviesIDs(moviesNames);
    return moviesIDs;
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
}

export default TMDBApi;
