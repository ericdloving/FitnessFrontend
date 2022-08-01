import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    return (
        <center><div className= "tab1Bdy">
        <h1 className="tab1Hd">Welcome Please Login</h1>
        <form>
            <input className="input"
            type="text"
            name="username"
            placeholder="UserName"/>
            <input className="input"
            type="password"
            name="password"
            placeholder="Password"/>
            <button type="submit">Log In</button>
        </form>
        <Link to="/Register">Don't have account? Sign up here!</Link>
    </div></center>
    );
    };
export default Login;