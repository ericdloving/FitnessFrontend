import React, { useEffect, useState } from "react";
import { editUserRoutine } from "../api";
import "./routineActivities.css";


const editRoutine = ({ setShowEditModal, selectedRoutine, username }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(null);
  console.log(username, "whats going on here");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (username === selectedRoutine.creatorName) {
      alert("Routine has been Added!");
      const updateRoutine = await editUserRoutine(
        name,
        goal,
        isPublic,
        token,
        selectedRoutine.id
      );
      setShowEditModal(false);
      return updateRoutine;
    }
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
    <div className="routineDetails">
      <p className="xButton" onClick={() => setShowEditModal(false)}>
        ❌
      </p>
      <form onSubmit={handleSubmit} id="loginForm">
        <div className="routine">
          <input
            className="input"
            type="text"
            name="name"
            defaultValue={selectedRoutine ? selectedRoutine.name : name}
            onChange={nameChange}
          />
          <input
            className="input"
            type="text"
            name="goal"
            defaultValue={selectedRoutine ? selectedRoutine.goal : goal}
            onChange={goalChange}
          />
          <label>
            <input
              type="checkbox"
              onChange={isPublicChange}
              defaultValue={
                selectedRoutine ? selectedRoutine.isPublic : isPublic
              }
            />
            Public
          </label>
          <button type="submit">UPDATE</button>
        </div>
      </form>
    </div>
  );
};

export default editRoutine;
