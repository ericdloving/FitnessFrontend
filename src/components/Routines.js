import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {getRoutines} from "../api"
import "./tabs.css"

const Routines = () => {
const [allRoutines,setAllRoutines] = useState([])
   
    useEffect(() => {
        async function fetchRoutines() {
          const returnRoutines = await getRoutines()
          console.log(returnRoutines, "i am the shakeweight")
          setAllRoutines(returnRoutines);
        } 
        fetchRoutines();
    }, []);
    
    return (
        <div className= "tab1Bdy">
            <h1 className="tab1Hd">Welcome to routines where you build the new you!</h1>
            <div> {allRoutines?.length}</div>
            <img src="https://i.pinimg.com/originals/57/83/89/578389bff890f2c376c329f54af05645.png"/>
            <div>Eventually you'll be albe to sort through different topics</div>
        </div>
    )
}

export default Routines;