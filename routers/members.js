const express = require("express");
const {getAllMembers,getAllMembersWithMoviesWatched,getMember, addMember,updateMember,deleteMember} = require("../controllers/member");
const { checkIfIdExist } = require("../helpers/checkExistence");

const router = express.Router();

router.route("/")
.get(async (req,res,next)=>{
    try {
        res.json(await getAllMembersWithMoviesWatched());
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).post(async (req,res,next)=>{
    try{
        res.json(await addMember(req.body));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

router.route("/:id")
.get(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id,"member");
        res.json(await getMember(req.params.id));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).put(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id,"member")
        res.json(await updateMember(req.params.id,req.body));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
}).delete(async (req,res,next)=>{
    try{
        await checkIfIdExist(req.params.id,"member")
        res.json(await deleteMember(req.params.id));
    } catch(err) {  
        res.locals.err = err;
        next();
    }
});

module.exports = router;