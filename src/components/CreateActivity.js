import React, { useEffect, useState } from "react";
import { createUserActivity } from "../api";


const createActivity = ({setShowModal}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token")
    alert("Activity has been Added!");
    const newActivity = await createUserActivity(name, description,token);
    setShowModal(false)
    return newActivity;
  };

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="createForm">
        <p className="xButton" onClick={()=>setShowModal(false)}>❌</p>
      <h1 className="title">Add New Activity</h1>
      <form id="loginForm">
        <div className="routine">
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Name"
            required={true}
            onChange={nameChange}
          />
          <input
            className="input"
            type="text"
            name="description"
            placeholder="Description"
            required={true}
            onChange={descriptionChange}
          />
            <button type="submit" onClick={handleSubmit}>CREATE</button>
        </div>
      </form>
    </div>
  );
};

export default createActivity;