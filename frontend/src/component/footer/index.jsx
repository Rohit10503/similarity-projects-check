import React from "react";
import "./footer.css"
import { useNavigate } from "react-router-dom";
const Footer=()=>{
    const navigate=useNavigate()
    const goToAdmin=()=>{
        navigate("/adashboard")
    }
    return<>
    <div className="footer-main">
        <h1 onClick={goToAdmin} className="title   ">Developed and Maintained by Group 4 </h1>
        
    </div>
    </> 
}
export default Footer