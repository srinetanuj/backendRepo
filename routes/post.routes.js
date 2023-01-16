const express = require('express');
const {postModel} = require("../models/post.model");

const postRouter = express.Router();

postRouter.use(express.json());

postRouter.get("/",async(req,res)=>{
    try{
        const todo = await postModel.find();
        res.send("You arr getting posts")
        console.log("get posts")
    }catch(e){
        console.log(e);
        res.send("Something went wrong");
    }
});


postRouter.post("/add",async(req,res)=>{
    const payload=req.body;
    try{
        const post = new postModel(payload);
        await post.save();
        res.send("Post added successfully");
    }catch(e){
        console.log(e);
        res.send("Something went wrong when creating a new post");
    }
});

postRouter.patch("/update/:id", async(req,res)=>{
    const payload = req.body;
    const ID = req.params.id;
    const post = await postModel.findOne({_id:ID});

    const user_in_database_id= post.userID;
    const user_req_id = req.body.userID;

    try{
         if(user_in_database_id != user_req_id){
            res.send("You are not allowed to update this post")
         }else{
            const update_post = await postModel.findByIdAndUpdate(
                {
                    _id:ID
                },
                payload
            );
            console.log("Updated post");
            res.send("User post updated successfully");
         }
    }catch(e){
        console.log(e);
        res.send("Erroe while you updating user post")
    }

})
postRouter.delete("/delete/:id", async(req,res)=>{
    const ID = req.params.id;
    const post = await postModel.findOne({_id:ID});

    const user_in_database_id= post.userID;
    const user_req_id = req.body.userID;

    try{
         if(user_in_database_id != user_req_id){
            res.send("You are not allowed to delete this post")
         }else{
            const delete_post = await postModel.findByIdAndDelete({_id:ID});
            console.log("Deleted post");
            res.send("User post deleted successfully");
         }
    }catch(e){
        console.log(e);
        res.send("Erroe while you deleting user post")
    }

})


module.exports={
    postRouter
}