import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {Link} from "react-router-dom";
import "./tabs.css"

const Tab1 = () => {
    const [isClicked,setIsClicked] = useState(false)
    const listItems = () => {
        return (<ul>
                <li>You should set realistic expectations</li>
                <li>Eat 15 times a day only broccoli rice and chicken</li>
                <li>Understand that this isn't a normal body shape</li>
                <li>Drink milk</li>
                </ul>
                )
                
    }
    return (
        <div className= "tab1Bdy">
            <h1 className="tab1Hd">Welcome to FitnessTrackr where we save lives!</h1>
            <div> Do you want to look like this?</div>
            <img src="https://media4.giphy.com/media/t9lBEE2FGMzbY9s5IX/giphy.gif"/>
            <div>Well for $99.99 we'll tell you everything you need to know!</div>
            <div> Click <button className="tipsBttn" onClick={()=>isClicked ? setIsClicked(false): setIsClicked(true)}>here</button> for some free tips </div>
            <section>
                {isClicked ? listItems() : null}
            </section>
            <div className="player">
            <ReactPlayer url="https://soundcloud.com/90s-dance-music/technotronic-pump-up-the-jam?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" 
            width='100%'
            />
            </div>
        </div>
    )
}

export default Tab1;