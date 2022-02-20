const express = require("express");
const {getAllSubscriptions,getSubscription, addSubscription,updateSubscription,deleteSubscription,addMovieToSubscription} = require("../controllers/subscription");
const { checkIfIdExist } = require("../helpers/checkExistence");


const router = express.Router();

router.route("/")
.get(async (req,res,next)=>{
    try{
        res.json(await getAllSubscriptions());
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).post(async (req,res,next)=>{
    try{
        // only if its a new subscription
        res.json(await addSubscription(req.body));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

router.route("/:id")
.get(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id,"subscription")
        res.json(await getSubscription(req.params.id));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).put(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id,"subscription")
        res.json(await updateSubscription(req.params.id,req.body));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).delete(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id,"subscription")
        res.json(await deleteSubscription(req.params.id));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

// adding a movie to subscription
router.route("/:id/movies")
.post(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id,"subscription");
        res.json(await addMovieToSubscription(req.params.id,req.body));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});






module.exports = router;