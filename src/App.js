import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/Nav";
import Lobby from "./components/Lobby";
import Aboutus from "./components/Aboutus";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Soccer from "./components/soccer/Soccer";
import World from "./components/world/World";
import EggCatchGame from "./components/eggCatch/eggCatchClient";
import Home from "./components/Home";
import Profile from "./components/Profile";
import PhaserGame from "./components/PhaserGame";
import RockPaperScissors from "./components/rockPaperScissors/RockPaperScissors";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import io from "socket.io-client";
import Cookies from "universal-cookie";

// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import { Socket } from "net";
const serverPORT = 3001;

function App() {
  //--------------------global states----------------------
  const [loginStatus, setLoginStatus] = useState(false);
  const [room, setRoom] = useState("soccerHAHA");
  const [profileInfo, setProfileInfo] = useState(null);
  const httpServer = "http://localhost:3001/";
  //-------------------------------------------------------
  // useEffect(() => {
  //   console.log(profileInfo);
  // }, [profileInfo]);
  let socket = io(`:${serverPORT}`);
  console.log("initializing app");

  useEffect(() => {
    console.log("load the cookie when component loads");
    let cookies = new Cookies();
    if (cookies.get("profile")) {
      console.log("LOGGED IN HERE BABY!");
      axios.post(`${httpServer}loggedInStatus`).then(res => {
        console.log("bring back pull");
        console.log(res.data);
      });
    } else {
      console.log("NO COOKIE FOUND!");
    }
  }, []);

  return (
    <Router>
      <NavBar loginStatus={loginStatus} setLoginStatus={setLoginStatus} />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/profile"
          exact
          render={() => {
            return (
              <Profile profileInfo={profileInfo} httpServer={httpServer} />
            );
          }}
        />
        <Route path="/about" exact component={About} />
        <Route
          path="/lobby"
          exact
          render={() => {
            return <Lobby socket={socket} setRoom={setRoom} />;
          }}
        />
        <Route
          path="/login"
          exact
          render={() => {
            return (
              <Login
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
                setProfileInfo={setProfileInfo}
                socket={socket}
                httpServer={httpServer}
              />
            );
          }}
        />
        <Route path="/world" exact component={World} />
        {/* <Route path="/register" exact component={Register} /> */}

        <Route
          path="/register"
          exact
          render={() => {
            return <Register httpServer={httpServer} />;
          }}
        />

        <Route
          path="/soccer"
          exact
          render={() => {
            return <Soccer socket={socket} room={room} />;
          }}
        />
        <Route
          path="/rockpaperscissors"
          exact
          render={() => {
            return <RockPaperScissors socket={socket} />;
          }}
        />
        <Route
          path="/chansey"
          exact
          render={() => {
            return <EggCatchGame socket={socket} />;
          }}
        />
        <Route path="/phaser-game" exact component={PhaserGame} />
        <Route
          path="/profile"
          exact
          render={() => {
            return <Profile profileInfo={profileInfo} />;
          }}
        />
      </Switch>
    </Router>
  );
  //       <Route path="/register" exact component={Register} />
  //       <Route path="/world" exact component={World} />
  //       <Route
  //         path="/soccer"
  //         exact
  //         render={() => {
  //           return <Soccer socket={socket} room={room} />;
  //         }}
  //       />
  //       <Route
  //         path="/rockpaperscissors"
  //         exact
  //         render={() => {
  //           return <RockPaperScissors socket={socket} />;
  //         }}
  //       />
  //       <Route
  //         path="/chansey"
  //         exact
  //         render={() => {
  //           return <EggCatchGame socket={socket} />;
  //         }}
  //       />
  //       <Route path="/phaser-game" exact component={PhaserGame} />
  //       <Route path="/profile" exact component={Profile} />
  //     </Switch>
  //   </Router>
  // );

	// return (
	//   <div className="App">
	//     <header className="App-header">
	//       <img src={logo} className="App-logo" alt="logo" />
	//       <p>
	//         Edit <code>src/App.js</code> and save to reload.
	//       </p>
	//       <a
	//         className="App-link"
	//         href="https://reactjs.org"
	//         target="_blank"
	//         rel="noopener noreferrer"
	//       >
	//         Learn React
	//       </a>
	//     </header>
	//   </div>
	// );

	// return (
	//   <div className="App">
	//     <header className="App-header">
	//       <img src={logo} className="App-logo" alt="logo" />
	//       <p>
	//         Edit <code>src/App.js</code> and save to reload.
	//       </p>
	//       <a
	//         className="App-link"
	//         href="https://reactjs.org"
	//         target="_blank"
	//         rel="noopener noreferrer"
	//       >
	//         Learn React
	//       </a>
	//     </header>
	//   </div>
	// );
}

export default App;
