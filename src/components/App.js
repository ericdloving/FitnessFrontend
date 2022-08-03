import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Route, Routes } from "react-router-dom";
import {
  Header,
  Tab1,
  Routines,
  Login,
  Register,
  MyRoutines,
  Activities,
} from "./";
import { whoAmI } from "../api";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const getMe = async () => {
    try {
      const me = await whoAmI(localStorage.getItem("token"));
      console.log("setting username:", me.username)
      setUsername(me.username)
      console.log(`set username to ${username}`)
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
        console.log("There's a token present -- attempting to getMe")
      const me = getMe();
      console.log(`after we get back from getMe username is ${username}`)
        setLoggedIn(true);
        console.log(loggedIn, 'after setting to true')
        console.log(username, 'in app useeffect')

    }
  }, []);
  return (
    <div id="App">
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <Routes>
        <Route path="/Tab1" element={<Tab1 loggedIn={loggedIn} />} />
        <Route path="/Routines" element={<Routines loggedIn={loggedIn} />} />
        <Route
          path="/MyRoutines"
          element={<MyRoutines username={username} setUsername={setUsername} />}
        />
        <Route
          path="/Activities"
          element={<Activities username={username} setUsername={setUsername} />}
        />
        <Route
          path="/Login"
          element={
            <Login
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              username={username}
              setUsername={setUsername}
            />
          }
        />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
