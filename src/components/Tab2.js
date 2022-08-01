import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./tabs.css"

const Tab2 = () => {
    
    return (
        <div className= "tab1Bdy">
            <h1 className="tab1Hd">Welcome to tab two where you build the new you!</h1>
            <div> Here's where you'll find loads of different routines and activities to try</div>
            <img src="https://i.pinimg.com/originals/57/83/89/578389bff890f2c376c329f54af05645.png"/>
            <div>Eventually you'll be albe to sort through different topics</div>
        </div>
    )
}

export default Tab2;