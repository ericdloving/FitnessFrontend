import React, { useEffect, useState } from "react";
import { attachActivity, editUserRoutine,getActivities } from "../api";
import "./routineActivities.css";



const editRoutine = ({ setShowEditModal, selectedRoutine, username }) => {
  const [name, setName] = useState(selectedRoutine.length ? selectedRoutine.name : "");
  const [goal, setGoal] = useState(selectedRoutine.length ? selectedRoutine.goal : "");
  const [isPublic, setIsPublic] = useState(null);
  const [allActivities, setAllActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [count, setCount] = useState(0)
  const [duration, setDuration] = useState(0)

  const getAllActivities = async () => {
    console.log("getallactivities")
    try {
      const activities = await getActivities();
      console.log(activities);
      setAllActivities(activities);
    }catch(error) {throw error}
  }
  useEffect(() => {
    getAllActivities()
  },[])

  useEffect(() =>{
    setName(selectedRoutine.name)
    setGoal(selectedRoutine.goal)
},[selectedRoutine])

const handleSelectChange = (event) => {
  console.log(event.target.value,"pterodactyl")
  setSelectedActivityId(parseInt(event.target.value))
  console.log(selectedActivityId,"selectedActivity")
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("calling the function")
    const updatedStuff = await attachActivity(selectedRoutine.id,selectedActivityId,count,duration)
    console.log("called the function",updatedStuff)
    const token = localStorage.getItem("token");
    if (username === selectedRoutine.creatorName) {
      alert("Larry!@!");
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
            defaultValue={ name}
            onChange={nameChange}
          />
          <input
            className="input"
            type="text"
            name="goal"
            defaultValue={goal}
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
          <select onChange = {handleSelectChange}>
            {allActivities.map((activity)=> {
              return (
                <option value={activity.id} key={activity.id}>{activity.name}</option>
              )
            })}
          </select>
          <input 
            className="input"
            type="number"
            name="count"
            onChange={(event)=>{setCount(event.target.value)}}
            placeholder="Count" />
          <input 
            className="input"
            type="number"
            name="duration"
            onChange={(event)=>{setDuration(event.target.value)}}
            placeholder="duration" />
                 
          <button type="submit">UPDATE</button>
        </div>
      </form>
    </div>
  );
};

export default editRoutine;
