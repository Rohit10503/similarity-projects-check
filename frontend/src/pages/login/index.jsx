import React, { useState } from "react";
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import { Base_URL } from "../../Services/helper";


const Login = () => {

  const navigate=useNavigate()
  const [user, setUser] = useState({
    uin: "",
    password: ""
  });


  const collectData = async () => {
    const { uin, password } = user;
    let result = await fetch(`${Base_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ uin, password }),
      headers: {
        "Content-Type": "application/json"

      }

    });
    result = await result.json();
    if (result.name) {
      sessionStorage.setItem("user", JSON.stringify(result));
      navigate("/")
      alert((result.name) + " Welcome")
    } else {
      alert("Invalid Credentials!");
    }
  }

  return <>
    <div className="login-box">
      <div className="form">
        <div class="field">
          <label class="label">UIN Number</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter 211P***" value={user.uin} onChange={(e) => setUser({ ...user, uin: e.target.value })} />
          </div>
        </div><div class="field">
          <label class="label">Enter password</label>
          <div class="control">
            <input class="input" type="password" placeholder="Enter password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" onClick={collectData}>Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
        <p>Create an account? <Link to={"/signup"}>Register Here</Link></p>
        </div>
    </div>
  </>

}
export default Login;