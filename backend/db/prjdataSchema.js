const mongoose=require("mongoose");
const prjdataSchema=new mongoose.Schema({
    ['Unique ID']:String,
    ID:String,
    Title:String,
    Abstract:String,
    Tag:String
})
module.exports=mongoose.model("projects",prjdataSchema); 