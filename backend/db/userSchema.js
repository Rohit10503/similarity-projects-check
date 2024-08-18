const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:String,
    uin:String,    //username hi UIN Number hai
    email:String,
    password:String,
    cPassword:String,
    grpid:String
})

module.exports=mongoose.model("users",userSchema); 