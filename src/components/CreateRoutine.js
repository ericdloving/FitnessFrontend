import React, { useEffect, useState } from "react";
import { createUserRoutine } from "../api";


const createRoutine = ({setShowCreateModal}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token")
    alert("Routine has been Added!");
    const newRoutine = await createUserRoutine(name, goal, isPublic,token);
    return newRoutine;
  };

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const goalChange = (event) => {
    setGoal(event.target.value);
  };

  const isPublicChange = (event) => {
    setIsPublic(event.target.checked);
  };

  return (
    <div className="createForm">
        <p className="xButton" onClick={()=>setShowCreateModal(false)}>❌</p>
      <h1 className="title">Add New Routine</h1>
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
            name="goal"
            placeholder="Goal"
            required={true}
            onChange={goalChange}
          />
          <label>
            <input type="checkbox" onChange={isPublicChange} />
            Public
            </label>
            <button type="submit" onClick={handleSubmit}>CREATE</button>
        </div>
      </form>
    </div>
  );
};

export default createRoutine;
