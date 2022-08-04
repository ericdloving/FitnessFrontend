import React, {useEffect, useState} from "react";
import "./routineActivities.css";
import { TbEdit } from "react-icons/tb"
import { attachActivity, editRoutineActivity, editUserRoutine } from "../api";

const RoutineActivities = ({setSelectedRoutine, selectedRoutine, setShowEditModal }) => {
  const [selectedRa,setSelectedRa] = useState(null);
  const [editTitle,setEditTitle] = useState(false);
  const [editGoal,setEditGoal] = useState(false);
  const [editCount,setEditCount] = useState(false);
  const [title, setTitle] = useState(selectedRoutine.name)
  const [goal, setGoal] = useState(selectedRoutine.goal)
  const [count, setCount] = useState(selectedRa ? selectedRa.count : 0)
  const [duration, setDuration] = useState("")
  const handleTitleChange = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const updateTitle = await editUserRoutine(title, selectedRoutine.goal, selectedRoutine.isPublic, token, selectedRoutine.id)
    setEditTitle(false)
  }
  const handleGoalChange = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const updateGoal = await editUserRoutine( selectedRoutine.name,goal, selectedRoutine.isPublic, token, selectedRoutine.id)
    setEditGoal(false)
  }
  const handleCountChange = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const updateCount = await editRoutineActivity(token,selectedRa.routineActivityId, count, selectedRa.duration)
    setEditCount(false)
  }

  useEffect(()=>{
    console.log(selectedRa, "i am the ra ya heard")
  },[selectedRa])

  




return (
    <div className="modal" onClick={()=> selectedRoutine.activities.length ? null : setShowEditModal(false)}>
      {selectedRoutine && selectedRoutine.activities.length?  (
        <div className="routineDetails" >
{/*TITLE        **********/}
          <div className={!editTitle ? "routineDetailsTitle" : "hidden"}>
            {selectedRoutine.name} <TbEdit onClick={()=>setEditTitle(true)} /><p className="xButton" onClick={()=>setShowEditModal(false)}>❌</p>
            </div>

            <div className={editTitle ? "routineDetailsTitle edit" : "hidden"}>
            <form onSubmit={handleTitleChange}>
            <input type="text" defaultValue={selectedRoutine.name}
             onChange={(e)=>setTitle(e.target.value)}/>
            <button type="submit">☑️</button><button onClick={()=>setEditTitle(false)}>❌</button>
            </form>
            </div>
          <div className="routineBody">
           <div className={!editGoal ? "routineGoal" : "hidden"}>
            {selectedRoutine.goal} <TbEdit onClick={()=>setEditGoal(true)} />
           </div>

            <div className={editGoal ? "routineGoal" : "hidden"}>
            <form onSubmit={handleGoalChange}>
            <input type="text" defaultValue={selectedRoutine.goal}
             onChange={(e)=>setGoal(e.target.value)}/>
            <button type="submit">☑️</button>{editGoal ? <p onClick={()=>setEditGoal(false)}>❌</p>: null}
            </form>
            </div>
            <p>Creator: {selectedRoutine.creatorName}</p>
           
          </div>
          {selectedRoutine.activities.map((activity) => {
            console.log(activity, "yo whats the plan")
            return selectedRoutine.activities.length ? (
              <div className="routineActivity" key={activity.id} onClick={(()=>{setSelectedRa(activity)})}>
                <p className = "routineActivityDetails title" onClick = {()=>{setShowEditModal(false)}}>{activity.name}</p>
                <p className = "routineActivitiyDetails description">{activity.description}</p>



                <div className={!editCount ? "raCount" : "hidden"}>
            {activity.count} <TbEdit onClick={()=>setEditCount(true)} />
           </div>

            <div className={editCount ? "raCount" : "hidden"}>
            <form onSubmit={handleCountChange}>
            <input type="text" defaultValue={activity.count}
             onChange={(e)=>setCount(e.target.value)}/>
            <button type="submit">☑️</button>{editCount ? <p onClick={()=>setEditCount(false)}>❌</p>: null}
            </form>
            </div>




                <p className = "routineActivitiyDetails">Duration: {activity.duration}</p>
              </div>
            ) : null;
          })}
                <button id="closeButton" onClick={() => setShowEditModal(false)}>Close</button>
        </div>
      ) : <div className="routineDetails" >
        {`Sorry there aren't any activities for ${selectedRoutine.name}!`}
        <div>
        <center><img src="https://raw.githubusercontent.com/gist/brudnak/dbe7bcbae5a283d2f393b0bb88d0d834/raw/8efb958d79fd81630ee777d62d85bb085391ef4a/portal.gif"/></center>
          </div>
          </div>}

    </div>
  );
};

export default RoutineActivities;
