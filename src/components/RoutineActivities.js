import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./routineActivities.css"

const RoutineActivities = ({selectedRoutine,showModal,setShowModal}) => {
    console.log(selectedRoutine, "show me the loot")
return(
    <div className="modal">
            {selectedRoutine ? selectedRoutine.creatorName : null}
        <button onClick={()=>{setShowModal(false)}}>Close</button>
    </div>
    
)
}

export default RoutineActivities;