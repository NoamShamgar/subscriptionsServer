const Subscription = require("../models/subscription");

const getAllSubscriptions_DAL = async () => {
    return await Subscription.find({});
}

const getSubscription_DAL = async (id) => {
    return await Subscription.findById(id);
}

const getMemberSubscription_DAL = async (memberId) => {
    return await Subscription.find({memberId});
}

const addSubscription_DAL = async (obj) => {
    let newSubscription = new Subscription(obj);
    return await newSubscription.save();
}

const updateSubscription_DAL = async (id,obj) => {
    return await Subscription.findByIdAndUpdate(id,obj);
}

const deleteSubscription_DAL = async (id) => {
    return await Subscription.findByIdAndRemove(id);
}

const deleteMemberSubscription_DAL = async (memberId) => {
    return await Subscription.findOneAndRemove({memberId:memberId});
}

const addMovieToSubscription_DAL = async (id,obj) => {
    return await Subscription.updateOne({_id:id}, { $push: { movies: obj } });
}

const deleteMovieFromAllSubscriptions_DAL = async (movieId) => {
    await Subscription.updateMany({movies:{$elemMatch:{movieId}}},{$pull:{movies:{movieId:movieId}}}); // removing movie from movies array
}

const deleteEmptyMoviesDocuments_DAL = async () => {
    return await Subscription.remove({ movies: { $exists: true, $size: 0 } }); // deleting documents with empty movies array

}
 

module.exports = {  
                    getAllSubscriptions_DAL,
                    getSubscription_DAL,
                    getMemberSubscription_DAL,
                    addSubscription_DAL,
                    updateSubscription_DAL,
                    deleteSubscription_DAL,
                    deleteMemberSubscription_DAL,
                    addMovieToSubscription_DAL,
                    deleteMovieFromAllSubscriptions_DAL,
                    deleteEmptyMoviesDocuments_DAL
                 }