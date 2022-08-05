import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoutines,getActivities } from "../api"
import "./app.css"
import "./home.css"

const Home = ({loggedIn,username}) => {
const token = localStorage.getItem("token") 
const navigate = useNavigate();
const [lengthA,setLengthA] = useState(0)
const [lengthB,setLengthB] = useState(0)
const [lengthC,setLengthC] = useState(0)
useEffect(()=>{
    async function fetchMyRoutines(username) {
        const returnRoutines = await getRoutinesByUser(username, token);
        setLengthC(returnRoutines.length);
      }
    async function fetchRoutines() {
        const returnRoutines = await getRoutines();
        setLengthA(returnRoutines.length)
      }
      async function fetchActivities() {
        const returnActivities = await getActivities();
        setLengthB(returnActivities.length);
      }
    fetchActivities()
    fetchRoutines()

},[])

    return(
        
        <div className= "homepageMain">
            {loggedIn ?
            <div>
            <h1>{`Welcome ${username}!`}</h1>
            <p>{`There are currently ${lengthA} Routines`} <br/>{` of which ${lengthC} you are the author of`}</p>
            </div>
            : <div><h1 className="homeTitle">Build the Best <br/><i>You</i></h1>
            <div className="homePitch"> <b>{`With over ${Math.round(lengthA/ 100) * 100} routines and ${lengthB} activities ` }<br/>
             {`you can achieve any fitness goal `}</b></div>
            <div >
                <button className="homeSignUp" onClick={()=>{navigate("/Register")}}>Start Today!</button>
                </div></div>}
        </div>)
}

export default Home;



// {loggedIn ? null : 
//             }
{/* <h1 className="homeTitle">Build the Best <br/><i>You</i></h1>
            <div className="homePitch"> <b>{`With over ${Math.round(lengthA/ 100) * 100} routines and ${lengthB} activities ` }<br/>
             {`you can achieve any fitness goal `}</b></div>
            <div >
                <button className="homeSignUp" onClick={()=>{navigate("/Register")}}>Start Today!</button>
                </div>
            <div> </div>
            <section>
            </section> */}