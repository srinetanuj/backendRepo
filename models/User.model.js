const mongoose = require('mongoose');


const UsersSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String
});

const UsersModel = mongoose.model("User",UsersSchema);

module.exports = {
    UsersModel
}