import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRoutines } from "../api";
import "./tabs.css";
import "./routines.css"

const Routines = () => {
  const [allRoutines, setAllRoutines] = useState([]);
  async function fetchRoutines() {
    const returnRoutines = await getRoutines();
    console.log(returnRoutines, "i am the shakeweight");
    setAllRoutines(returnRoutines);
  }
  useEffect(() => {
    fetchRoutines();
  }, []);

const getActivity = () =>{
  allRoutines.map((routine,index) => {
    routine.activities.map((activity) => {
      console.log(activity, "is this the sauce?")
      if(routine.id === activity.routineId){
        return(
      <p>Activities: {activity}</p>
      )}
    }
    )
  })
}//working on pulling activities out

  return (
    <div className="routines">
      {allRoutines.length ? (
        allRoutines.map((routine,index) => {
          return(<div className="routine" id={`Routine${routine.id}`} key={index}>
            <p>Name: {routine.name}</p>
            <p>Goal: {routine.goal}</p>
            <p>Creator: {routine.creatorName}</p>
            {getActivity()}
            
        </div>)
        })
      ) : 
        <h3>There are no routines to display</h3>
      }
    </div>
  );
};

export default Routines;
