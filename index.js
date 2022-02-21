require("dotenv").config()
const express = require("express");
const cors = require("cors")

const app = express();
require("./config/configDB"); // connecting to DB


app.use(cors({origin:"http://localhost:8001"}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const memberRouter = require("./routers/members");
app.use("/members",memberRouter);

const movieRouter = require("./routers/movies");
app.use("/movies",movieRouter);

const subscriptionsRouter = require("./routers/subscriptions");
app.use("/subscriptions",subscriptionsRouter);


app.use((req,res) => { // error handling, this is the next function after the routers, if it triggers there was an error.
  console.log('\x1b[36m%s\x1b[0m',"inside error handler"); // color change
  
  if(!res.locals.err){ // it didnt make it to the routers, wrong path.
      console.log(`wrong resource -  ${req.path} or wrong method [${req.method}]`);
      res.status(422).json(`no such resource -  ${req.path} or wrong method [${req.method}]`);
  } else { // generic error
    console.log(res.locals.err);
    res.status(401).json(res.locals.err);
  }

});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8001;
}
app.listen(port,()=>console.log("subscription server has started and running on port", port));