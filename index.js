const express = require('express');
require('dotenv').config();
const {userConnection} = require("./config/db");
const  {userRouter} = require("./routes/user.route");
const {postRouter} = require("./routes/post.routes");
const {authenticate} = require("./middlewares/authenticate.middleware");



const app = express();

app.use("/users",userRouter);
app.use(authenticate);
app.use("/posts",postRouter);

app.use(express.json());




app.listen(process.env.port,async()=>{
    try{
       await userConnection;
       console.log("you are connected to Database")
    }catch(e){
        console.log(e);
        console.log("Error while Connecting to Database")
    }
})
