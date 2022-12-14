import React from "react";
import "./app.css"
import "./routineActivities.css";

const RoutineActivities = ({ selectedRoutine,setSelectedRoutine, setShowModal }) => {
  return (
    <div className="modal">
      {selectedRoutine && selectedRoutine.activities.length?  (
        <div className="routineDetails">
          <div className="routineDetailsTitle">{selectedRoutine.name}<p className="xButton" onClick={()=>{setShowModal(false);setSelectedRoutine(false)}}>❌</p></div>
          <div className="routineBody">
            <p>Goal: {selectedRoutine.goal}</p>
            <p>Creator: {selectedRoutine.creatorName}</p>
          </div>
<div className="activities">
          {selectedRoutine.activities.map((activity) => {
            return selectedRoutine.activities.length ? (
              <div className="routineActivity" key={activity.id}>
                <p className = "routineActivityDetails title" onClick = {()=>{setShowModal(false)}}>{activity.name}</p>
                <p className = "routineActivitiyDetails description">{activity.description}</p>
                <p className = "routineActivityDetails">Count: {activity.count}</p>
                <p className = "routineActivitiyDetails">Duration: {activity.duration}</p>
              </div>
            ) : null;
          })}</div>
          <footer id="footerButtons">
                <button id="closeButton" onClick={() => {setShowModal(false);setSelectedRoutine(false)}}>Close</button>
                </footer>
        </div>
      ) : <div className="routineDetails" onClick={()=>{setShowModal(false);setSelectedRoutine(false)}}>
        <div className="routineActivityDetails title">{`Sorry there aren't any activities for ${selectedRoutine.name}!`}</div>
        
        <div>
        <center><img src="https://raw.githubusercontent.com/gist/brudnak/dbe7bcbae5a283d2f393b0bb88d0d834/raw/8efb958d79fd81630ee777d62d85bb085391ef4a/portal.gif"/></center>
          </div>
          <footer id="footerButtons">
                <button id="closeButton" onClick={() => {setShowModal(false);setSelectedRoutine(false)}}>Close</button>
                </footer>
          </div>}

    </div>
  );
};

export default RoutineActivities;
