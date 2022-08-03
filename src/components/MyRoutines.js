import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./routineActivities.css";
import { getRoutinesByUser } from "../api";
import { CreateRoutine } from "./";

const MyRoutines = ({ username, setUsername }) => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null)
  const token = localStorage.getItem("token");

  async function fetchMyRoutines(username) {

    const returnRoutines = await getRoutinesByUser(username, token);
    setMyRoutines(returnRoutines);
    console.log(returnRoutines)
  }

  useEffect(() => {
    fetchMyRoutines(username);
  
  }, []);

  useEffect(()=> {
    if(selectedRoutine && !showDetailsModal) setShowDetailsModal(true)
    console.log(selectedRoutine, showDetailsModal)
  },[selectedRoutine])


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
                  onClick={()=>{
                    setSelectedRoutine(routine)
                  }}
                   
                >
                  <p>Name: {routine.name}</p>
                  <p>Goal: {routine.goal}</p>
                  <p>Creator: {routine.creatorName}</p>
                </div>
              );
            })
          : <p>No routines to display</p>}
      </div>
      <p>{username} there should be a username</p>
    </div>
  );
};

export default MyRoutines;
