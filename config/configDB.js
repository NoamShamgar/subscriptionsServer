const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://noam:7548963@cinemacluster.vnjed.mongodb.net/subscriptionsDB?retryWrites=true&w=majority",
    ()=>{
        console.log("   successfully connected to subscriptions database");
        require("../helpers/fillDB") // filling DB if its empty
});
