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
      return me;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const me = getMe();
      if (me) {
        setLoggedIn(true);
        setUsername(me.username);
      }
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
