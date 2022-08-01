import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



import "./TabBar.css"
const TabBar = ()=>{
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("1");

    const handleTabClick = (event)=>{
        setSelectedTab(event.target.value);
        console.log(event.target.value);
        console.log(selectedTab);
    }

    return (
        <div className = "tabbar">
            <button className={selectedTab==="1" ? "tab active": "tab"} id="tab1" onClick={(event)=>{setSelectedTab(event.target.value); navigate("/Tab1")}} value="1">Tab 1</button>
            <button className={selectedTab==="2" ? "tab active": "tab"} id="tab2" onClick={(event)=>{setSelectedTab(event.target.value); navigate("/Tab2")}} value="2">Tab 2</button>
            <button className={selectedTab==="3" ? "tab active": "tab"} id="tab3" onClick={handleTabClick} value="3">Tab 3</button>
            <button className={selectedTab==="4" ? "tab active": "tab"} id="tab4" onClick={handleTabClick} value="4">Tab 4</button>
            <button className={selectedTab==="5" ? "tab active": "tab"} id="tab5" onClick={(event)=>{setSelectedTab(event.target.value); navigate("/Login")}} value="5">Login/Register</button>
        </div>
    )

}

export default TabBar;