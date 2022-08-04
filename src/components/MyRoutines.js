import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./routineActivities.css";
import { getRoutinesByUser, whoAmI,editUserRoutine, deleteUserRoutine } from "../api";
import { CreateRoutine,RoutineEdit } from "./";


const MyRoutines = ({ username }) => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [routineWasEdited, setRoutineWasEdited] = useState(false);
  const navigate = useNavigate();
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
  
  }, [routineWasEdited]);

  useEffect(() => {
    if (selectedRoutine) setShowEditModal(true)
    console.log(selectedRoutine, "this is from my routines!!")
    setSelectedRoutine(selectedRoutine)

  },[selectedRoutine])

useEffect(()=> {
 setRoutineWasEdited(!routineWasEdited)
},[showEditModal])

function handleClickSummary(){
  setShowCreateModal(true);
  
}

const deleteRoutine = async () => {
  const token = localStorage.getItem("token");
  const routineId = selectedRoutine.id;
  if(username === selectedRoutine.creatorName){
  const eraseRoutine = await deleteUserRoutine(token, routineId);
  alert("Post has been Deleted!");
  navigate("/Routines");
  return erasePost;}}
  
  useEffect(()=>{
    
  },[showEditModal])


  return (
    <div className="tab1Bdy">
      
      <Modal show={showCreateModal} className="modal">
        <CreateRoutine setShowCreateModal={setShowCreateModal} />
      </Modal>
      <Modal show={showEditModal} className="modal">
        <RoutineEdit setShowEditModal={setShowEditModal} selectedRoutine={selectedRoutine} setSelectedRoutine={setSelectedRoutine} username={username} />
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
          : null}
      </div>
    </div>
  );
};

export default MyRoutines;
