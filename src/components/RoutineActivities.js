import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./routineActivities.css";

const RoutineActivities = ({ selectedRoutine, showModal, setShowModal }) => {
  return (
    <div className="modal">
      {selectedRoutine ? (
        <div className="routineDetails">
          <div className="routineDetailsTitle">{selectedRoutine.name}<p className="xButton" onClick={()=>setShowModal(false)}>❌</p></div>
          <div className="routineBody">
            <p>Goal: {selectedRoutine.goal}</p>
            <p>Creator: {selectedRoutine.creatorName}</p>
          </div>
          {selectedRoutine.activities.map((activity) => {
            return selectedRoutine.activities.length ? (
              <div className="routineActivity" key={activity.id}>
                <p className = "routineActivityDetails title" onClick = {()=>{setShowModal(false)}}>{activity.name}</p>
                <p className = "routineActivitiyDetails description">{activity.description}</p>
                <p className = "routineActivityDetails">Count: {activity.count}</p>
                <p className = "routineActivitiyDetails">Duration: {activity.duration}</p>
              </div>
            ) : null;
          })}
                <button id="closeButton" onClick={() => setShowModal(false)}>Close</button>
        </div>
      ) : null}

    </div>
  );
};

export default RoutineActivities;
