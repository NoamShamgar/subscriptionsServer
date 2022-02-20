const axios = require("axios");

// returning all users from external api
const getAllMembers_WS = async () => {
        return await axios.get("https://jsonplaceholder.typicode.com/users");
}

module.exports = getAllMembers_WS;