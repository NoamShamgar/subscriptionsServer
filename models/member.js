const mongoose = require("mongoose");


const memberSchema = mongoose.Schema({
    name:String,
    email:String,
    city:String
});

const MemberModel = mongoose.model("member",memberSchema);

module.exports = MemberModel;