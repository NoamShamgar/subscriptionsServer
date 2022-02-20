const {getAllMembers_DAL,addMember_DAL} = require("../DAL/membersDB");
const {getAllMovies_DAL,addMovie_DAL} = require("../DAL/moviesDB");
const getAllMembers_WS = require("../DAL/membersWS");
const getAllMovies_WS = require("../DAL/moviesWS");

// if members or movies DB is empty this function fill them up with external data.
(async function checkIfDbEmptyAndFill () {
    try{
        if((await getAllMembers_DAL()).length === 0){
            console.log("      MEMBERS db is empty, filling it up");
            fillMembersDB((await getAllMembers_WS()).data);
        } else {
            console.log("      MEMBERS db contain data");
        }

        if((await getAllMovies_DAL()).length === 0){
            console.log("      MOVIES db is empty, filling it up");
            fillMoviesDB((await getAllMovies_WS()).data);
        } else {
            console.log("      MOVIES db contain data");
        }
    } catch (err) {
        console.log("         couldn't get relevant data to fill datebases");
        console.log(err);
    }
})()



// get array of members and loop them into the members database
const fillMembersDB = async (members) => {
    const relevantMembersData = members.map(member=> {
        return {
            name:member.name,
            email:member.email,
            city:member.address.city
        }
    });


    let addingSuccess = true;
    for (const member of relevantMembersData) { 
       try{
           await addMember_DAL(member);
       } catch (err) {
        addingSuccess = false;
        console.log(err);
       }
    }
    console.log(`         populating the empty [MEMBERS] database was ${addingSuccess?"":"un"}succsessfull`);
}

// get array of movies and loop them into the movies database
const fillMoviesDB = async (movies) => {
    const relevantMoviesData = movies.map(movie => {
        return {
            name:movie.name,
            genres:movie.genres,
            image:movie.image.medium,
            premiered:movie.premiered
        }
    })
    let addingSuccess = true;
    for (const movie of relevantMoviesData) { 
       try{
            await addMovie_DAL(movie)
       } catch (err) {
        addingSuccess = false;
       }
    }

    console.log(`         populating the empty [MOVIES] database was ${addingSuccess?"":"un"}succsessfull`);
}
