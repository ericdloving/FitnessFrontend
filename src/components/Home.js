import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoutines,getActivities } from "../api"
import "./app.css"
import "./home.css"

const Home = ({loggedIn}) => {
const token = localStorage.getItem("token") 
const navigate = useNavigate();
const [lengthA,setLengthA] = useState(0)
const [lengthB,setLengthB] = useState(0)
useEffect(()=>{
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
            <center><h1 className="homeTitle">Build the Best <br/><i>You</i></h1>
            <div className="homePitch"> <b>{`With over ${Math.round(lengthA/ 100) * 100} routines and ${lengthB} activities ` }<br/>
             {`you can achieve any fitness goal `}</b></div>
            <div >
                <button className="homeSignUp" onClick={()=>{navigate("/Register")}}>Start Today!</button>
                </div>
            <div> </div>
            <section>
            </section>
            </center>
        </div>
    )
}

export default Home;