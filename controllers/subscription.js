const {getAllSubscriptions_DAL,getMemberSubscription_DAL, addSubscription_DAL,updateSubscription_DAL,deleteSubscription_DAL,addMovieToSubscription_DAL} = require("../DAL/SubscriptionsDB");

const getAllSubscriptions = async () => {
    return await getAllSubscriptions_DAL();
}

const getMemberSubscription = async (memberid) => {
    return await getMemberSubscription_DAL(memberid);
}

const addSubscription = async (obj) => {
    return await addSubscription_DAL(obj);
}

const updateSubscription = async (id,obj) => {
    return await updateSubscription_DAL(id,obj);
}

const deleteSubscription = async (id) => {
    return await deleteSubscription_DAL(id);
}

// expected obj = {movieId:"...",watchDate:}
const addMovieToSubscription = async (id,obj) => {
    return await addMovieToSubscription_DAL(id,obj);
}
    
module.exports = {  
                    getAllSubscriptions,
                    getMemberSubscription,
                    addSubscription,
                    updateSubscription,
                    deleteSubscription,
                    addMovieToSubscription
                 }