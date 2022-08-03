import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./routineActivities.css";
import { getRoutinesByUser, whoAmI } from "../api";
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
  }
  useEffect(() => {
    async function fetchGetMe() {
      const me = await whoAmI(localStorage.getItem("token"))
      const name = me.username
      fetchMyRoutines(name);}

    
    fetchGetMe();
  
  }, [username]);

  useEffect(()=> {
    if(selectedRoutine && !showDetailsModal) setShowDetailsModal(true)
  },[selectedRoutine])

  useEffect(()=> {
    if(selectedRoutine && !showDetailsModal) setShowDetailsModal(true)
  },[selectedRoutine])

function handleClickSummary(){
  setShowCreateModal(true);
}
  return (
    <div className="tab1Bdy">
      
      <Modal show={showCreateModal} className="modal">
        <CreateRoutine setShowCreateModal={setShowCreateModal} />
      </Modal>
      <div>
        <div className="routine"
             onClick = {handleClickSummary}>
               <p>Welcome, {username}!  You have {myRoutines.length || "no"} routines.Click here to create a new one.</p>
             </div>
        {myRoutines.length
          ?
          myRoutines.map((routine) => {
              return (
                <div
                  className="routine"
                  key={`Routine${routine.id}`}onClick={()=>{
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
