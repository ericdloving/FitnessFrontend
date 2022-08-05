import React, { useEffect, useState } from "react";
import { createUserActivity } from "../api";
import "./routineActivities.css";


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
    <div className="routineDetails createActivity">
    <div className="routineDetailsTitle">Add New Activity<p className="xButton" onClick={()=>{setShowModal(false);}}>❌</p></div>
      <form >
        <div className="createForm">
          <textarea className="createField"
            type="text"
            name="name"
            placeholder="Name"
            required={true}
            onChange={nameChange}
          />
          <textarea className="createField"
            type="text"
            name="description"
            placeholder="Description"
            required={true}
            onChange={descriptionChange}
          />
            <button type="submit" id="addActivityButton" onClick={handleSubmit}>CREATE</button>
        </div>
      </form>
    </div>
  );
};

export default createActivity;