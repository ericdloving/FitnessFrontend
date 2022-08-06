import React, { useState } from "react";
import { createUserRoutine } from "../api";
import "./routineActivities.css";



const createRoutine = ({setShowCreateModal,setRoutineWasEdited}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token")
    alert("Routine has been Added!");
    const newRoutine = await createUserRoutine(name, goal, isPublic,token);
    setRoutineWasEdited(true)
    setShowCreateModal(false)
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
    <div className="routineDetails createActivity">
      <div className ="routineDetailsTitle">Add New Routine</div>
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
            name="goal"
            placeholder="Goal"
            required={true}
            onChange={goalChange}
          />
            <label>
            <input type="checkbox" onChange={isPublicChange} />
            Public
            </label>
            <button type="submit" id="addActivityButton" onClick={handleSubmit}>CREATE</button>
            <button id="closeButton" onClick={() => {setShowCreateModal(false)}}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default createRoutine;
