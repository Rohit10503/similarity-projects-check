const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/similarity-prj", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Database is Connected");
}).catch((err)=>{
    console.log("Not connected",err)
})
