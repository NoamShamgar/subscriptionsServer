const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
    name:String,
    genres:[String],
    image:String,
    premiered:Date
});

const movieModel = mongoose.model("movie",moviesSchema);

module.exports = movieModel;