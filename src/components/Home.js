import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoutines, getActivities, getRoutinesByUser, whoAmI } from "../api";
import "./app.css";
import "./home.css";

const Home = ({ loggedIn, username }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [lengthA, setLengthA] = useState(0);
  const [lengthB, setLengthB] = useState(0);
  const [lengthC, setLengthC] = useState(0);
  const [recent, setRecent] = useState({});

  useEffect(() => {
    async function fetchGetMe() {
      const me = await whoAmI(localStorage.getItem("token"));
      const name = me.username;
      fetchMyRoutines(name);
    }
    async function fetchMyRoutines(username) {
      const returnRoutines = await getRoutinesByUser(username, token);
      let lastRoutine = Object.keys(returnRoutines).shift();
      setLengthC(returnRoutines.length);
      setRecent(returnRoutines[lastRoutine]);
    }
    async function fetchRoutines() {
      const returnRoutines = await getRoutines();
      setLengthA(returnRoutines.length);
    }
    async function fetchActivities() {
      const returnActivities = await getActivities();
      setLengthB(returnActivities.length);
    }
    fetchActivities();
    fetchRoutines();
    fetchGetMe();
  }, []);

  return (
    <div className={loggedIn ? "userHomePage" : "homepageMain"}>
      {loggedIn ? (
        <div>
          <h1 className="userHomeTitle">{`Welcome ${username}!`}</h1>
          <p className="userHomePitch">
            {`There are currently ${lengthA} Routines`} <br />
            {`${lengthC} of these were created by you.`}
          </p>
          <div className="userRecent">
            <div id="info">
              <p id="recentTitle">Your most recent routine was:</p>
              <p className="text">Name: {recent.name}</p>
              <p className="text">Goal: {recent.goal}</p>
              {recent.activities ? (
                <p className="text">
                  Activities: {`${recent.activities.length}`}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="homeTitle">
            Build the Best
          </h1>
          <h1 className="homeTitle2">You</h1>
          <div className="homePitch">
            {" "}
            <b>
              {`With over ${
                Math.round(lengthA / 100) * 100
              } routines and ${lengthB} activities `}
              <br />
              {`you can achieve any fitness goal `}
            </b>
          </div>
          <div>
            <button
              className="homeSignUp"
              onClick={() => {
                navigate("/Register");
              }}
            >
              Start Today!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
