const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());


require("./db/config");


//Importing schemas
const User = require("./db/userSchema")
const Group = require("./db/groupSchema");




app.post("/signup", async (req, res) => {
    let check_present = await User.findOne({ email: req.body.email });
    if (check_present) {
        res.send({ result: "present" })
    }
    else {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password, result.cPassword;
        res.send(result);

    }
})


app.post("/login", async (req, res) => {
    if (req.body.uin && req.body.password) {

        let user = await User.findOne(req.body).select("-password -cPassword");
        if (user) {
            res.send(user);
        }
        else {
            res.send({ "result": "user Not found" });
        }
    }
    else {
        res.send({ "result": "necessery credentials missing" })    //json
    }
})


app.post("/create_group", async (req, res) => {         //user_id  grp_name  grp_pass grp_mem[0]
    if (req.body.grp_name && req.body.grp_pass ) {
        let new_grp = new Group(req.body);
        let result = await new_grp.save();
        if (result) {
            

                let update_user_profile = await User.updateOne({
                    _id: req.body.user_id
                }
                    , {
                        $set: { grpid: result._id }
                    })

                if (update_user_profile) {

                    res.send({ "result": "Success" })
                }
            

        }
    }
})


app.post("/join_group", async (req, res) => {           //grp_id   grp_pass  name  user_id
    if (req.body.grp_id && req.body.grp_pass) {


        let result = await Group.updateOne({
            "_id": req.body.grp_id, "grp_pass": req.body.grp_pass
        },

            {
                $addToSet: { grp_mem: req.body.name }
            }

        )

        if (result.nModified === 0) {
            // If no documents were modified, the group might not exist or password might be incorrect
            return res.status(404).send({ "result": "Error", "message": "Group not found or incorrect password" });
        }

        if (result) {

            let update_user_profile = await User.updateOne({
                _id: req.body.user_id
            }
                , {
                    $set: { grpid: req.body.grp_id }
                })

            if (update_user_profile) {

                res.send({ "result": "Success" })
            }
        }

    }
})


app.get("/disp_prj",async(req,res)=>{
    let projects= await Group.find()
    if (projects.length>0){
        res.send(projects)
    }
    else{
        res.send({"result":"none"})
    }

});

app.listen(3500);


// mongodb+srv://rohitpandey10503:Rohit1234@cluster0.oknc0ab.mongodb.net/Similarity_prj?retryWrites=true&w=majority&appName=Cluster0