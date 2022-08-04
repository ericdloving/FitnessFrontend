import React, {useState} from "react";
import "./routineActivities.css";
import { TbEdit } from "react-icons/tb"
import { attachActivity, editUserRoutine } from "../api";

const RoutineActivities = ({ selectedRoutine, setShowEditModal }) => {
  const [editTitle,setEditTitle] = useState(false);
  const [title, setTitle] = useState(selectedRoutine.name)

  const handleTitleChange = async (event) => {
    event.preventDefault();
    console.log("HANDLE TITLE CHANGE!!!")
    const token = localStorage.getItem("token");
    const updateTitle = await editUserRoutine(title, selectedRoutine.goal, selectedRoutine.isPublic, token, selectedRoutine.id)
    setEditTitle(false)
  }

  return (
    <div className="modal">
      {selectedRoutine && selectedRoutine.activities.length?  (
        <div className="routineDetails">
{/*TITLE        **********/}
          <div className={!editTitle ? "routineDetailsTitle" : "hidden"}>
            {selectedRoutine.name} <TbEdit onClick={()=>setEditTitle(true)} /><p className="xButton" onClick={()=>setShowEditModal(false)}>❌</p></div>

            <div className={editTitle ? "routineDetailsTitle edit" : "hidden"}>
            <form onSubmit={handleTitleChange}>
            <input type="text" defaultValue={selectedRoutine.name}
             onChange={(e)=>setTitle(e.target.value)}/>
            <button type="submit">☑️</button><button onClick={()=>setEditTitle(false)}>❌</button>
            </form>
            </div>

          <div className="routineBody">
            <p>Goal: {selectedRoutine.goal}</p>
            <p>Creator: {selectedRoutine.creatorName}</p>
          </div>
          {selectedRoutine.activities.map((activity) => {
            return selectedRoutine.activities.length ? (
              <div className="routineActivity" key={activity.id}>
                <p className = "routineActivityDetails title" onClick = {()=>{setShowEditModal(false)}}>{activity.name}</p>
                <p className = "routineActivitiyDetails description">{activity.description}</p>
                <p className = "routineActivityDetails">Count: {activity.count}</p>
                <p className = "routineActivitiyDetails">Duration: {activity.duration}</p>
              </div>
            ) : null;
          })}
                <button id="closeButton" onClick={() => setShowEditModal(false)}>Close</button>
        </div>
      ) : <div className="routineDetails">
        {`Sorry there aren't any activities for ${selectedRoutine.name}!`}
        <div>
        <center><img src="https://raw.githubusercontent.com/gist/brudnak/dbe7bcbae5a283d2f393b0bb88d0d834/raw/8efb958d79fd81630ee777d62d85bb085391ef4a/portal.gif"/></center>
          </div>
          </div>}

    </div>
  );
};

export default RoutineActivities;
