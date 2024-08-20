import React, { useState } from "react";
import "./signup.css"
import { Link, useNavigate } from "react-router-dom";
import { Base_URL } from "../../Services/helper";
const SignUp = () => {
    const navigate=useNavigate()
    const [user, setUser] = useState({
        name:"",
        uin:"",
        email: "",
        password: "",
        cPassword:""
    });
    const handleData=async(e)=>{
        e.preventDefault();
        const { name,uin, email, password, cPassword } = user;
        if (password !== cPassword) {
            alert("Passwords Not matchs")

        }
        else {
            let result=await fetch(`${Base_URL}/signup`,{
                method: "POST",
                body: JSON.stringify({ name,uin, email, password, cPassword }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            if(result.result === "present"){
                alert("User Allready exists try another email_id")
            }
            else{
                sessionStorage.setItem("user",JSON.stringify(result))
            }
            setUser({
                name: "",
                uin:"",
                email: "",
                password: "",
                cPassword: ""
            });
             
            alert("stored");
                navigate('/');
        }
    }

    return <>
       
        <div className="signup-box">
            <div className="form">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Enter your Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}/>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" placeholder="211P*** " value={user.uin} onChange={(e) => setUser({ ...user, uin: e.target.value })} />
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </div>
                    <p class="help is-success">This username is available</p>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input " type="email" placeholder="a@b.com" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                    </div>
                    <p class="help is-primary">This email is invalid</p>
                </div>


                <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" placeholder="password " value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </div>
                    
                </div>
                <div class="field">
                    <label class="label">Confirm Password</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" placeholder="Confirm password " value={user.cPassword} onChange={(e) => setUser({ ...user, cPassword: e.target.value })}/>
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </div>
                    
                </div>



                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" onClick={handleData}>Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light">Cancel</button>
                    </div>
                </div>


                <p>Allready have an Account? <Link to={"/login"}>Le chalo Login </Link></p>
                </div>
        </div>
    </>
}
export default SignUp;
