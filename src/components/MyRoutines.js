import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./routineActivities.css";
import { getRoutinesByUser } from "../api";
import { CreateRoutine } from "./";

const MyRoutines = ({ username, setUsername }) => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const token = localStorage.getItem("token");

  async function fetchMyRoutines() {
    const returnRoutines = await getRoutinesByUser(username, token);
    setMyRoutines(returnRoutines);
  }
  useEffect(() => {
    fetchMyRoutines();
  }, []);


  return (
    <div className="tab1Bdy">
      <button
        onClick={() => {
          setShowCreateModal(true);
        }}
      >
        Create Routine
      </button>
      <Modal show={showCreateModal} className="modal">
        <CreateRoutine setShowCreateModal={setShowCreateModal} />
      </Modal>
      <div>
        {myRoutines.length
          ? myRoutines.map((routine) => {
              return (
                <div
                  className="routine"
                  key={`Routine${routine.id}`}
                  onClick={setSelectedRoutine(routine)} //need to add useEffect to trigger appropriate response to a change in selectedRoutine**********************************************
                >
                  <p>Name: {routine.name}</p>
                  <p>Goal: {routine.goal}</p>
                  <p>Creator: {routine.creatorName}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default MyRoutines;
