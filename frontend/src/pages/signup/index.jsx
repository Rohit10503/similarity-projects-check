import React, { useState } from "react";
import "./signup.css"
import { Link } from "react-router-dom";
const SignUp = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });


    return <>
       
        <div className="signup-box">
            <form action="">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Enter your email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" placeholder="username " />
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
                        <input class="input " type="email" placeholder="a@b.com" />
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
                        <input class="input is-success" type="text" placeholder="password " />
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
                        <input class="input is-success" type="text" placeholder="Confirm password " />
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
                        <button class="button is-link">Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light">Cancel</button>
                    </div>
                </div>


                <p>Allready have an Account? <Link to={"/login"}>Le chalo Login </Link></p>
            </form>
        </div>
    </>
}
export default SignUp;