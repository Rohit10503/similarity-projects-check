const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://rohitpandey10503:Rohit1234@cluster0.oknc0ab.mongodb.net/Similarity_prj?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Database is Connected");
}).catch((err)=>{
    console.log("Not connected",err)
})



//mongodb://0.0.0.0:27017/similarity-prj
//mongodb+srv://rohitpandey10503:Rohit1234@cluster0.oknc0ab.mongodb.net/Similarity_prj?retryWrites=true&w=majority&appName=Cluster0
