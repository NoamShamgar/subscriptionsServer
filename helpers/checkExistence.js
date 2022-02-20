const { getMember_DAL } = require("../DAL/membersDB");
const { getMovie_DAL } = require("../DAL/moviesDB");
const { getSubscription_DAL } = require("../DAL/subscriptionsDB");

// this function being called from the router, if rejecting, the router will catch the error
const checkIfIdExist = async (id,type) => {

    return new Promise(async(resolve,reject) => {
        try {
            let exist;
            switch (type) {
                case "member":
                    exist = await getMember_DAL(id)
                    break

                        case "movie":
                            exist = await getMovie_DAL(id)
                            break

                            case "subscription":
                                exist = await getSubscription_DAL(id)
                                break
            }
            if (!exist){ // if exist is empty, it will reject
                reject(`wrong ${type} ID`)
                return
            }

            resolve(true)
            
        } catch (err) {
            reject(`wrong ${type} ID`)
        }
    });
}


module.exports = {checkIfIdExist}