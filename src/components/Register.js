import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPerson } from "../api";
import "./login.css";

const Register = () => {
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (regPassword !== confirmPassword) {
      alert("Passwords don't match!");
      setRegPassword("");
      setConfirmPassword("");
    } else {
      registerPerson(event);
      setRegUsername("");
      setRegPassword("");
      setConfirmPassword("");
      alert("Registration successful please Login");
      navigate("/Login");
    }
  };

  const userNameChange = (event) => {
    setRegUsername(event.target.value);
  };

  const passwordChange = (event) => {
    setRegPassword(event.target.value);
  };

  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className="loginPage" id="loginPage">
      <h1 className="loginTitle">Registration</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="boxes">
          <input
            className="input"
            type="text"
            name="username"
            placeholder="UserName*"
            required={true}
            minLength="1"
            onChange={userNameChange}
            value={regUsername}
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password*"
            required={true}
            minLength="8"
            onChange={passwordChange}
            value={regPassword}
          />
          <input
            className="input"
            type="password"
            name="confirm password"
            placeholder="Confirm Password*"
            required={true}
            minLength="8"
            onChange={confirmPasswordChange}
            value={confirmPassword}
          />
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
