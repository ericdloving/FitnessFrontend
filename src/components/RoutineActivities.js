import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./routineActivities.css";

const RoutineActivities = ({ selectedRoutine, showModal, setShowModal }) => {
  return (
    <div className="modal">
      {selectedRoutine ? (
        <div className="routineDetails">
          <div className="routineDetailsTitle">{selectedRoutine.name}</div>
          <div className="routineBody">
            <p>Goal: {selectedRoutine.goal}</p>
            <p>Creator: {selectedRoutine.creatorName}</p>
          </div>
          {selectedRoutine.activities.map((activity) => {
            return selectedRoutine.activities.length ? (
              <div className="routineActivity" key={activity.id}>
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
                <h4>Count: {activity.count}</h4>
                <h4>Duration: {activity.duration}</h4>
              </div>
            ) : null;
          })}
        </div>
      ) : null}
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  );
};

export default RoutineActivities;
