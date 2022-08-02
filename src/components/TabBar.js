import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



import "./TabBar.css"
const TabBar = ({loggedIn,setLoggedIn})=>{
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("1");
    


    const handleTabClick = (event)=>{
        setSelectedTab(event.target.value);
        if(selectedTab=== 1){
            navigate("/Tab1")
        }
        if(selectedTab=== 2){
            navigate("/Routines")
        }
        if(selectedTab=== 1){
            navigate("/Tab1")
        }
        if(selectedTab=== 4){
            navigate("/Activities")
        }
    }
    const handleLoginTab = (event) =>{
       if (loggedIn) { 
         
        setLoggedIn(false)
        localStorage.clear()
         }
       setSelectedTab(event.target.value)
       navigate("/Login")
    }

    return (
     <div className = "tabbar">
        <button className={selectedTab==="1" ? "tab active": "tab"} id="tab1" onClick={(event)=>{setSelectedTab(event.target.value); navigate("/home")}} value="1">Home</button>
        <button className={selectedTab==="2" ? "tab active": "tab"} id="tab2" onClick={(event)=>{setSelectedTab(event.target.value); navigate("/Routines")}} value="2">Routines</button>
        <button className={selectedTab==="3" ? "tab active": "tab"} id="tab3" onClick={handleTabClick} value="3">Tab 3</button>
        <button className={selectedTab==="4" ? "tab active": "tab"} id="tab4" onClick={(event)=>{setSelectedTab(event.target.value); navigate("/Activities")}} value="4">Activities</button>
        <button className={selectedTab==="5" ? "tab active": "tab"} id="tab5" onClick={handleLoginTab} value="5">{loggedIn ? "Logout" : "Login/Register" }</button>
    </div> 
    )

}

export default TabBar;