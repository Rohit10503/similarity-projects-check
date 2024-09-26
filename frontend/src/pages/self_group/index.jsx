import React, { useEffect, useState } from "react";
import "./self_group.css"
import { Base_URL } from "../../Services/helper";
import { Link } from "react-router-dom";
const SelfGroup = () => {
    const auth = JSON.parse(sessionStorage.getItem("user"))
    const [showDetail, setShowDetail] = useState(null)


    const getDetail = async () => {

            

        if (auth.grpid == "") {
            setShowDetail(null)
        }
        else {
            let result = await fetch(`${Base_URL}/disp_single`, {
                method: "POST",
                body: JSON.stringify({ "grp_id": auth.grpid }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json()
            setShowDetail(result[0])
            // console.log(result[0])
        }
    }

    useEffect(() => {
        getDetail();
    }, []);




    return <>
        <div className="self_grp_main">
            
            <ul>
                {
                    showDetail ? <>

                        <div class="container">
                            <div class=" is-primary">

                                <li><strong>Group name</strong> : {showDetail.grp_name} </li>
                                <li><strong>Group Title:</strong> {showDetail.grp_title}</li>
                                <li><strong>Group Meambers :<tb/></strong>{
                                    showDetail.grp_mem.map((item, index) => {
                                        return (<>
                                            <h1 key={index}>{item}   {index==0 ? <span>(Leader)</span> : <></>}  </h1>
                                        </>)
                                    })
                                }

                                </li>
                            </div>
                        </div>

                    </> : <>
                    <div className="show-none-main">
                    <h1 className="title is-size-3">nahi hai Bhai Abhi <br/>Join Kar </h1> 
                                
                        Do Create Group Or You Can join othr Groups <br/> <br /><Link to={"/"}>Click Here</Link>
                    </div>
                    </>
                }
            </ul>

        </div>
    </>
}
export default SelfGroup