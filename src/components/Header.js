import React, { useState } from "react";
import TabBar from "./TabBar"

import "./header.css";

const Header = ({ user, setUser }) => {

  return (
    <header>
      <div id="logowrapper">
        <h1 className="logotext head">Fitness</h1>
        <h1 className="logotext tail">Trackr</h1>
        <img src="../../Images/stick-man-running.png" id="logoman"></img>
        <TabBar />
      </div>
    </header>
  );
};

export default Header;
