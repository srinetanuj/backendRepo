const mongoose=require("mongoose");
require('dotenv').config();

const userConnection = mongoose.connect(process.env.userUrl);

module.exports = {
    userConnection
};