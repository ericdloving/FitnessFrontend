import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./routineActivities.css"
import { getRoutinesByUser } from "../api";
import { CreateRoutine } from "./";


const MyRoutines = ({username, setUsername}) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const [showModal,setShowModal] = useState(false)
    const token = localStorage.getItem("token")

    async function fetchMyRoutines() {
        const returnRoutines = await getRoutinesByUser(username, token);
        setMyRoutines(returnRoutines);
      }
      useEffect(() => {
        fetchMyRoutines();
      }, []);


    return (
        <div className="tab1Bdy">
            <button onClick={()=>{setShowModal(true)}}>Create Routine</button>
            <Modal show={showModal}  className="modal">
            <CreateRoutine setShowModal={setShowModal}/>
            </Modal>
            <div>
                
                { myRoutines.length ? myRoutines.map((routine) => {
                    return (
                        <div className="routine" key={`Routine${routine.id}`}onClick={()=>{
                        }}>
                          <p>Name: {routine.name}</p>
                          <p>Goal: {routine.goal}</p>
                          <p>Creator: {routine.creatorName}</p>
                          
                        </div>
                      );

                } ): null}
            </div>
        </div>
    )
}

export default MyRoutines;