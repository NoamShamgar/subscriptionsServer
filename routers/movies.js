const express = require("express");
const {getAllMovies,getAllMoviesWithMembersWatched,getMovie, addMovie,updateMovie,deleteMovie} = require("../controllers/Movie");
const { checkIfIdExist } = require("../helpers/checkExistence");


const router = express.Router();

router.route("/")
.get(async (req,res,next)=>{ // get all movies, without array of members watched
    try{
        res.json(await getAllMovies());
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).post(async (req,res,next)=>{
    try{
        res.json(await addMovie(req.body));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

router.route("/:id")
.get(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id,"movie")
        res.json(await getMovie(req.params.id));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).put(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id,"movie")
        res.json(await updateMovie(req.params.id,req.body));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).delete(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id,"movie")
        res.json(await deleteMovie(req.params.id));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

router.route("/membersWatched")
.get(async (req,res,next)=>{
    try{
        res.json(await getAllMoviesWithMembersWatched());
    } catch(err) {  
        res.locals.err = err;
        next();
    }
})




module.exports = router;