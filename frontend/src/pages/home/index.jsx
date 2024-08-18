import React from "react";
import "./home.css"
import { useNavigate } from "react-router-dom";
const Home=()=>{
    const auth=JSON.parse(sessionStorage.getItem("user"))
    const navigate=useNavigate()


    return<>

    <div className="box">
        <div className="upper">
            <div className="upper-left box">
                <div className="pro_img">
                    <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" alt="Profile_Logo" />
                </div>
                <div className="user_name">
                    <h1 className="Title is-size-3">Name: {auth.name}</h1>
                </div>
                <div className="uin">
                    <h1 className="Title is-size-4">UIN: {auth.uin}</h1>
                </div>
                <div className="user_email">
                    <h1 className="Title is-size-4">Email: {auth.email}</h1>
                </div>
                <div className="user_school">
                    <h1 className="Title is-size-4">College: Rizvi College Of Engineering</h1>
                </div>

                <div className="buttons button_field">
                <button class="button is-warning  ">Create group</button>
                <button class="button is-warning">View & join group</button>
                </div>
            </div>
            <div className="upper-right "> 
                <h1 className="Title is-size-2">"Uncover Uniqueness: Seamlessly Check Abstract Similarities"</h1>
                <br/>
                <p className="Title is-size-5">Enter your project abstract and title below to discover how closely your work aligns with past projects. </p>
            </div>
        </div>
        <div className="middle box">
        <textarea class="textarea" placeholder="e.g. Give your project idea here"></textarea>
        <div ><button class="button is-warning  ">Create group</button></div>

        </div>
        <div className="lower"></div>

    </div>
    

    </>
}
export default Home;

