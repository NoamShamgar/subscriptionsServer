const {getAllMovies_DAL,getMovie_DAL, addMovie_DAL,updateMovie_DAL,deleteMovie_DAL} = require("../DAL/MoviesDB");
const { getAllMembers_DAL } = require("../DAL/membersDB");
const {getAllSubscriptions_DAL,deleteMovieFromAllSubscriptions_DAL,deleteEmptyMoviesDocuments_DAL} = require("../DAL/subscriptionsDB");

const getAllMovies = async () => {
    return await getAllMovies_DAL();
}

const getAllMoviesWithMembersWatched = () => {
    return new Promise(async (resolve,reject)=>{
        try{
            // getting data
            const AllMovies = JSON.parse(JSON.stringify(await getAllMovies_DAL())); // for some reason mongoose doesnt let addition of key to returned documents (which has a special mongoose type), json stringify and parse used to make it regulat object 
            const AllSubs = await getAllSubscriptions_DAL();
            const AllMembers = await getAllMembers_DAL();

            AllSubs.forEach(sub => {
                const member = AllMembers.find(member => member._id == sub.memberId.toString()) // getting the member who own this subscription
                sub.movies.forEach(movieInSub => {
                    const movieIndex = AllMovies.findIndex(movie => movie._id.toString() == movieInSub.movieId.toString());

                    if(AllMovies[movieIndex]?.membersWatched == undefined) { // if this is the first watcher, prevent error
                        AllMovies[movieIndex].membersWatched = [];
                    }
                    AllMovies[movieIndex].membersWatched.push({watchDate:movieInSub.watchDate,member});
                });
            });
            resolve(AllMovies);
        } catch (err) {
            reject(err);
        }
    });
}



const getMovie = async (id) => {
    return await getMovie_DAL(id);
}

const addMovie = async (obj) => {
    return await addMovie_DAL(obj);
}

const updateMovie = async (id,obj) => {
    return await updateMovie_DAL(id,obj);
}

const deleteMovie = (id) => {
    return new Promise(async(resolve,reject)=>{
        try {
            await deleteMovieFromAllSubscriptions_DAL(id)
            await deleteEmptyMoviesDocuments_DAL();
            resolve(await deleteMovie_DAL(id));
            
        } catch (err) {
            reject(err)
        }
    });
}
    
module.exports = {  
                    getAllMovies,
                    getAllMoviesWithMembersWatched,
                    getMovie,
                    addMovie,
                    updateMovie,
                    deleteMovie
                 }