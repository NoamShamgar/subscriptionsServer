const {getAllMembers_DAL,getMember_DAL, addMember_DAL,updateMember_DAL,deleteMember_DAL} = require("../DAL/membersDB");
const {getAllSubscriptions_DAL,deleteMemberSubscription_DAL} = require("../DAL/subscriptionsDB");
const {getAllMovies_DAL} = require("../DAL/MoviesDB");


const getAllMembers = async () => {
    return await getAllMembers_DAL();
}

const getAllMembersWithMoviesWatched = () => {
    return new Promise(async (resolve,reject)=>{
        try{
            // getting data
            const AllMembers = JSON.parse(JSON.stringify(await getAllMembers_DAL())); // for some reason mongoose doesnt let addition of key to returned documents (which has a special mongoose type), json stringify and parse used to make it regulat object 
            const AllSubs = await getAllSubscriptions_DAL();
            const AllMovies = await getAllMovies_DAL();

            AllSubs.forEach(sub => {
                const memberIndex = AllMembers.findIndex(member => member._id == sub.memberId.toString()) // getting the member index who own this subscription
                AllMembers[memberIndex].subId = sub._id;
                sub.movies.forEach(movieInSub => {
                    
                    if(AllMembers[memberIndex].moviesWatched == undefined) {
                        AllMembers[memberIndex].moviesWatched = [];
                    }
                    AllMembers[memberIndex].moviesWatched.push({
                        watchDate:movieInSub.watchDate,
                        movie:AllMovies.find(movie => movie._id.toString() == movieInSub.movieId.toString())});
                    
                });
            });
            resolve(AllMembers);
        } catch (err) {
            reject(err);
        }
    });
}

const getMember = async (id) => {
    return await getMember_DAL(id);
}

const addMember = async (obj) => {
    return await addMember_DAL(obj);
}

const updateMember = async (id,obj) => {
    return await updateMember_DAL(id,obj);
}

const deleteMember = async (id) => {
        return new Promise(async (resolve,reject) => {
            try {
              await deleteMember_DAL(id);
                await deleteMemberSubscription_DAL(id);
                resolve(true)
            } catch(err) {
                reject(err)
            }
                
    });
}
    
module.exports = {  
                    getAllMembers,
                    getAllMembersWithMoviesWatched,
                    getMember,
                    addMember,
                    updateMember,
                    deleteMember
                 }