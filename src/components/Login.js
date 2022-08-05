import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./app.css"
// import "./login.css"
// import "./TabBar.css"
import {login} from "../api"

const Login = ({setLoggedIn,loggedIn, username, setUsername}) => {
    
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    
    const handleSubmit = async (event) => {
        try {
        event.preventDefault();
        const token = await login(username, password);
        
        if(token){
        localStorage.setItem("token", token);
        setLoggedIn(true)
        navigate("/Tab1")
        }
        } catch (error) {
            throw error
        }
        
    }

    const userNameChange = (event) => {
            setUsername(event.target.value);
          };
        
    const passwordChange = (event) => {
            setPassword(event.target.value);
          };
    return (
        <div className= "tab1Bdy">
        <h1 className="tab1Hd">Welcome Please Login</h1>
        <form id="loginform" onSubmit={handleSubmit}>
        <div className="boxes">
            <input className="input"
            type="text"
            name="username"
            placeholder="UserName"
            required={true}
            minLength="1"
            onChange={userNameChange}/>
            <input className="input"
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            minLength="5"
            onChange={passwordChange}/>
            <button type="submit">Log In</button>
            </div>
        </form>
        <Link to="/Register">Don't have account? Sign up here!</Link>
    </div>
    );
    };
export default Login;