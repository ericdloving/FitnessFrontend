import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Route, Routes } from "react-router-dom";
import {Header,Tab1,Tab2,Login} from "./";
const App = ()=>{
    return (
        <div id="App">
            <Header/>
            <Routes>
                <Route path="/Tab1" element={<Tab1 />}/>
                <Route path="/Tab2" element={<Tab2 />}/>
                {/* <Route path="/Tab3" element={<Tab3 />}/> */}
                <Route path="/Login" element={<Login />}/>
            </Routes>
        </div>
    );
}

export default App;