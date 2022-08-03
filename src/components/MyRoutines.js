import React, { useEffect, useState } from "react";
import { getRoutinesByUser } from "../api";


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
            <h1>MyRoutines</h1>
        </div>
    )
}

export default MyRoutines;