import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Route, Routes } from "react-router-dom";
import {Header,Tab1,Routines,Login,Register,MyRoutines} from "./";
const App = ()=>{
    const [loggedIn,setLoggedIn] = useState(false)
    return (
        <div id="App">
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
            <Routes>
                <Route path="/Tab1" element={<Tab1 loggedIn={loggedIn}/>}/>
                <Route path="/Routines" element={<Routines loggedIn={loggedIn}/>}/>
                <Route path="/MyRoutines" element={<MyRoutines />}/>
                <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}/>
                <Route path="/Register" element={<Register  />}/>
            </Routes>
        </div>
    );
}

export default App;