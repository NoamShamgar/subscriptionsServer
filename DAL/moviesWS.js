const axios = require("axios");

// returning all movies from external api
const getAllMovies_WS = async () => {
        return await axios.get("https://api.tvmaze.com/shows");
}

module.exports = getAllMovies_WS;