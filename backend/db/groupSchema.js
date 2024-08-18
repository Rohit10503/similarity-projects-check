const mongoose=require("mongoose");
const groupSchema=new mongoose.Schema({
    grp_name:String,
    grp_pass:String,
    grp_leader:String,
    grp_abstract:String,
    grp_mem:{
        type: [String],  // This field is an array of strings
        default: []      // Initialize with an empty array by default
      }
    

})

module.exports=mongoose.model("prj_groups",groupSchema); 