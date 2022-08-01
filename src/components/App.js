import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Route, Routes } from "react-router-dom";
import {Header,Tab1,Tab2,Login,Register} from "./";
const App = ()=>{
    const [loggedIn,setLoggedIn] = useState(false)
    return (
        <div id="App">
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
            <Routes>
                <Route path="/Tab1" element={<Tab1 loggedIn={loggedIn}/>}/>
                <Route path="/Tab2" element={<Tab2 loggedIn={loggedIn}/>}/>
                {/* <Route path="/Tab3" element={<Tab3 />}/> */}
                <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}/>
                <Route path="/Register" element={<Register  />}/>
            </Routes>
        </div>
    );
}

export default App;