import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRoutines } from "../api";
import "./tabs.css";

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

  return (
    <div className="Tab1Bdy">
      {allRoutines.length ? (
        allRoutines.map((routine) => {
          <div className="routine" id={`Routine${routine.id}`}>
            <p>Name: {routine.name}</p>
            <p>Goal: {routine.goal}</p>
            <p>Creator: {routine.creatorName}</p>
        </div>
        })
      ) : 
        <h3>There are no routines to display</h3>
      }
    </div>
  );
};

export default Routines;
