import React, { useEffect, useState } from "react";
import { getRoutinesByUser } from "../api";
import { CreateRoutine } from "./";


const MyRoutines = ({username, setUsername}) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const token = localStorage.getItem("token")

    async function fetchMyRoutines() {
        const returnRoutines = await getRoutinesByUser(username, token);
        setMyRoutines(returnRoutines);
        console.log(myRoutines,'asdf')
      }
      useEffect(() => {
        fetchMyRoutines();
      }, []);


    return (
        <div className="tab1Bdy">
            <CreateRoutine />
            <div>
                {myRoutines.map((routine) => {
                    return (
                        <div className="routine" key={`Routine${routine.id}`}onClick={()=>{
                        }}>
                          <p>Name: {routine.name}</p>
                          <p>Goal: {routine.goal}</p>
                          <p>Creator: {routine.creatorName}</p>
                          
                        </div>
                      );

                })}
            </div>
        </div>
    )
}

export default MyRoutines;