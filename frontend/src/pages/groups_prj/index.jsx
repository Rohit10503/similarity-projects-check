import React, { useEffect, useState } from "react";
import { Base_URL } from "../../Services/helper";
import "./group_prj.css"
const GroupProject = () => {

    const [projects, setProjects] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [prjData,setPrjData]=useState();
    const [grpPass,setGrpPass]=useState("");

    const getProjects = async () => {
        let fetch_projects = await fetch(`${Base_URL}/disp_prj`);
        let actual_projects = await fetch_projects.json();
        if (actual_projects.result === "none") {
            setProjects(false)
        }
        else {
            setProjects(actual_projects)
        }

    }
    useEffect(() => {
        getProjects();
    }, []);

    const openModal = (item) => {
        setPrjData(item)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const getJoin=async(prj_id)=>{
        const user_id=JSON.parse(sessionStorage.getItem("user"))._id
        const name=JSON.parse(sessionStorage.getItem("user")).name
        const grp_id=prj_id;
        const grp_pass=grpPass;
        let result = await fetch(`${Base_URL}/join_group`, {
            method: "POST",
            body: JSON.stringify({ grp_id, grp_pass,name,user_id }),
            headers: {
              "Content-Type": "application/json"
      
            }})
            result = await result.json();
            if(result.result=="Success"){
                alert("Congratulations")
            }
            else{

                alert(result.message)
            }
      



    }

    return <>
        <div className="main_view">
            {
                projects ? <>

                    <table>
                        <thead>
                            <th>Group Names</th>
                            <th>Project Title</th>
                            <th>Meambers</th>
                            <th>Status</th>
                        </thead>
                        <tbody>
                            {
                                projects.map((item,index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td >{item.grp_name}</td>
                                                <td >{item.grp_title ? item.grp_title :  item.grp_mem[0]}</td>
                                                <td>
                                                    <ol>
                                                        {item.grp_mem.map((mem, idx) => (
                                                            <li key={idx}>{mem}</li>
                                                        ))}
                                                    </ol>
                                                </td>
                                                <td>Approved <button className="button is-primary is-small" onClick={()=>openModal(item) } >Join</button></td>

                                            </tr>


                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    

                </>
                    :
                    <>
                        Nahi hai</>

            }
        </div>

        {isModalOpen ? <>
                <div className="modal">
                    <div className="modal-background" onClick={closeModal}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{prjData.grp_name}</p>
                            <button className="delete" aria-label="close" onClick={closeModal}></button>
                        </header>
                        <section className="modal-card-body">
                            <h1 className="Title is-size-1">Group Leader is {prjData.grp_mem[0]}</h1>
                            <h1 className="Title is-size-4">Project Title : {prjData.grp_title}</h1>
                            <p>
                                Abstract : {prjData.grp_abstract ? prjData.grp_abstract : "Not yet Declared"}
                            </p>

                            <h1 className="Title is-size-5">Group Members: <ol> {
                                prjData.grp_mem.map((mem, idx) => (
                                    <li key={idx}>{mem}</li>
                                ))
                                }</ol></h1>
                            

                            <input class="input" type="text" placeholder="Enter Passcode" value={grpPass} onChange={(e)=>setGrpPass(e.target.value)}/>
                           
                        </section>
                        <footer className="modal-card-foot">
                            <div className="buttons">
                                <button className="button is-success" onClick={()=>getJoin(prjData._id)}>Join Now</button>
                                <button className="button" onClick={closeModal}>Cancel</button>
                            </div>
                        </footer>
                    </div>
                </div>
                </>
                :
                <></>
            }


    </>
}
export default GroupProject;