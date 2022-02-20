const mongoose = require("mongoose");


const subscriptionsSchema = mongoose.Schema({
    memberId:mongoose.ObjectId,
    movies:[{movieId:String,watchDate:Date}]
});

const subscriptionsModel = mongoose.model("subscription",subscriptionsSchema);

module.exports = subscriptionsModel;