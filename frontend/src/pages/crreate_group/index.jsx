import React, { useState } from "react";
import "./create_group.css"
import { Base_URL } from "../../Services/helper";
import { useNavigate } from "react-router-dom";
const CreateGroup = () => {

    const auth = JSON.parse(sessionStorage.getItem("user"))
    const navigate = useNavigate()
    const [prj_group, setGroup] = useState({
        grp_name: "",
        grp_title:"",
        grp_pass: "",
        user_id: auth._id,
        grp_mem: [auth.name]
    });

    const handleCreateGroup = async () => {
        const {grp_name,grp_title,grp_pass,user_id,grp_mem}=prj_group
        let result = await fetch(`${Base_URL}/create_group`, {
            method: "POST",
            body: JSON.stringify({ grp_name,grp_title,grp_pass,user_id,grp_mem}),
            headers: {
                "Content-Type": "application/json"

            }
        })
        result=await result.json()

        if(result.result=="Success"){
            auth.grpid=result.grp_id
            let updatedData = JSON.stringify(auth);
            sessionStorage.setItem('user', updatedData);


            alert("Create Ho Gaya group");
            navigate("/view_groups")
        }

        else{
            alert("nahi hua create")
        }
    }
    return <>
        <div className="create-main">
            <div className="group_field">
                <div class="field">
                    <label class="label">Group Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Text input" value={prj_group.grp_name} onChange={(e) => setGroup({ ...prj_group, grp_name: e.target.value })} />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Project title</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Text input" value={prj_group.grp_title} onChange={(e) => setGroup({ ...prj_group, grp_title: e.target.value })} />
                    </div>
                </div>


                <div class="field">
                    <label class="label">Set Password</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="" value={prj_group.grp_pass} onChange={(e) => setGroup({ ...prj_group, grp_pass: e.target.value })} />
                    </div>
                </div>


                <div class="field">
                    <label class="label">Group Leader Name</label>
                    <div class="control">
                        <input class="input" type="text" value={auth.name} />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Attach github Hub repository (if Present)</label>
                    <div class="control">
                        <input class="input" type="text" required />
                    </div>
                </div>
                <div class="buttons">
                    <button class="button is-warning" onClick={handleCreateGroup}>Create Group</button>
                </div>

            </div>

        </div>
    </>
}
export default CreateGroup;
