const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@cinemacluster.vnjed.mongodb.net/subscriptionsDB?retryWrites=true&w=majority`,
    ()=>{
        console.log("   successfully connected to subscriptions database");
        require("../helpers/fillDB") // filling DB if its empty
});
