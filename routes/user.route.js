const express = require("express");
const {UsersModel} =require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();

userRouter.use(express.json())

userRouter.get("/",(req,res)=>{
    res.send("Welcome")
})

userRouter.post("/register",async(req,res)=>{

    const {name,email,gender,password}=req.body;

  try{
     const userExist = await UsersModel.find({email});
     if(userExist.length>0){
        res.send("You are already registered");
     }else{
        bcrypt.hash(password, 5,async(err, hash)=> {
            if(err){
                console.log(err);
            }else{
                const user = new UsersModel({name,email,gender,password:hash});
                await user.save();
                res.send("Registered successfully")
            }
        });
     }
  }catch(e){
    console.log(e);
    res.send("Error while you are register")
  }

})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
       const userFind = await UsersModel.find({email});
       if(userFind.length>0){
        bcrypt.compare(password, userFind[0].password, (err, result) =>{
            if(result){
                const token = jwt.sign({ userID: userFind[0]._id }, 'anuj');
                res.send([{"msg":"Login Successfully", "token":token}])
            }else{
                console.log(err);
                res.send("Error in login")
            }
        });
       }
    }catch(e){
        console.log(e);
        res.send("Error while you are login")
    }
})


module.exports={
    userRouter
}