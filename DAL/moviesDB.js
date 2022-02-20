const Movie = require("../models/movie");

const getAllMovies_DAL = async () => {
    return await Movie.find({}).lean();
}

const getMovie_DAL = async (id) => {
    return await Movie.findById(id);
}

const addMovie_DAL = async (obj) => {
    let newMovie = new Movie(obj);
    return await newMovie.save();
}

const updateMovie_DAL = async (id,obj) => {
    return await Movie.findByIdAndUpdate(id,obj);
}

const deleteMovie_DAL = async (id) => {
    return await Movie.findByIdAndRemove(id);
}

module.exports = {  
                    getAllMovies_DAL,
                    getMovie_DAL,
                    addMovie_DAL,
                    updateMovie_DAL,
                    deleteMovie_DAL
                 }