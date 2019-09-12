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
import World from "./components/World";
import EggCatchGame from "./components/eggCatch/eggCatchClient";
import Home from "./components/Home";
import Profile from "./components/Profile";
import PhaserGame from "./components/PhaserGame";
import ExternalGames from "./components/ExternalGames";
import RockPaperScissors from "./components/rockPaperScissors/RockPaperScissors";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from "socket.io-client";
import Cookies from "universal-cookie";

import Pmbox from "./components/pmbox/Pmbox";
import TestPm from "./components/TestPm";

const serverPORT = 3001;

function App() {
  //--------------------global states----------------------
  const [count, setCount] = useState(0);
  const [loginStatus, setLoginStatus] = useState(null);
  const [room, setRoom] = useState("testingSoccer");
  const [profileInfo, setProfileInfo] = useState(null);
  const httpServer = "http://localhost:3001/";
  const [socket, setSocket] = useState(null);
  const [toOtherUser, setToOtherUser] = useState({
    trigger: false,
    username: null
  });
  //-------------------------------------------------------
  // let socket;
  console.log("initializing app");

  useEffect(() => {
    setSocket(io(`:${serverPORT}`));
  }, []);
  useEffect(() => {
    // socket = io(`:${serverPORT}`);
    console.log("after socket setup. This is to be printed only twice!");
    let handleCatchGuestProfile;
    if (socket) {
      // setSocket(io(`:${serverPORT}`));
      let cookies = new Cookies();
      if (cookies.get("profile")) {
        console.log("LOGGED IN HERE BABY!");
        axios
          .post(`${httpServer}loggedInStatus`, {
            cookie: cookies.get("profile")
          })
          .then(response => {
            if (response.data.length === 1) {
              setLoginStatus(true);
              setProfileInfo({
                username: response.data[0].username,
                avatar: response.data[0].avatar,
                firstName: response.data[0].first_name,
                lastName: response.data[0].last_name
              });
              socket.emit("login", {
                username: response.data[0].username,
                avatar: response.data[0].avatar
              });
            } else {
              console.log("did not find the user!");
              cookies.remove("profile");
              socket.emit("requestGuestProfile");
            }
          });
      } else {
        console.log("NO COOKIE FOUND!");
        console.log(socket);
        socket.emit("requestGuestProfile");
      }
      const handleCatchGuestProfile = function(data) {
        console.log("getting guest profile");
        setLoginStatus(false);
        setProfileInfo({
          username: data.username,
          avatar: data.avatar,
          firstName: "",
          lastName: ""
        });
      };
      socket.on("catchGuestProfile", handleCatchGuestProfile);
    }
    return () => {
      if (socket && handleCatchGuestProfile) {
        socket.removeListener("catchGuestProfile", handleCatchGuestProfile);
      }
    };
  }, [socket]);

  return (
    <Router>
      <NavBar
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        profileInfo={profileInfo}
        socket={socket}
        toOtherUser={toOtherUser}
        setToOtherUser={setToOtherUser}
        Profile={Profile}
      />

      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route
          path="/profile"
          exact
          render={() => {
            return (
              <Profile profileInfo={profileInfo} httpServer={httpServer} />
            );
          }}
        /> */}

        <Route path="/about" exact component={About} />
        {/* <Route path="/test" exact component={TestPm} /> */}
        <Route
          path="/test"
          exact
          render={() => {
            return (
              <div>
                {profileInfo && socket ? (
                  <TestPm
                    socket={socket}
                    // setRoom={setRoom}
                    profileInfo={profileInfo}
                  />
                ) : (
                  <h3>Retrieving user info...</h3>
                )}
              </div>
            );
          }}
        />
        <Route
          path="/lobby"
          exact
          render={() => {
            return (
              <div>
                {profileInfo && socket ? (
                  <Lobby
                    socket={socket}
                    setRoom={setRoom}
                    profileInfo={profileInfo}
                  />
                ) : (
                  <h3>Retrieving user info...</h3>
                )}
              </div>
            );
          }}
        />
        <Route
          path="/aboutus"
          exact
          render={() => {
            return <Aboutus />;
          }}
        />
        <Route
          path="/login"
          exact
          render={() => {
            return socket ? (
              <Login
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
                setProfileInfo={setProfileInfo}
                socket={socket}
                httpServer={httpServer}
              />
            ) : (
              <h3>Waiting for socket</h3>
            );
          }}
        />
        {/* <Route path="/world/:username" exact component={World} /> */}
        <Route
          path="/chatworld"
          render={props => {
            return socket ? (
              <World socket={socket} count={count} setCount={setCount} />
            ) : (
              <h3>Loading...</h3>
            );
          }}
        />
        <Route
          path="/register"
          exact
          render={() => {
            return <Register httpServer={httpServer} />;
          }}
        />
        <Route
          path="/user/:username"
          exact
          render={props => {
            return profileInfo && loginStatus !== null && socket ? (
              <Profile
                profileInfo={profileInfo}
                httpServer={httpServer}
                loginStatus={loginStatus}
                socket={socket}
                toOtherUser={toOtherUser}
                setToOtherUser={setToOtherUser}
                {...props}
              />
            ) : (
              <h3>Waiting for the server response...</h3>
            );
          }}
        />
        <Route
          path="/soccer"
          exact
          render={() => {
            return socket ? (
              <Soccer socket={socket} room={room} />
            ) : (
              <h3>Waiting for socket</h3>
            );
          }}
        />
        <Route
          path="/rockpaperscissors"
          exact
          render={() => {
            return socket && profileInfo ? (
              <RockPaperScissors socket={socket} profileInfo={profileInfo} />
            ) : (
              <h3>Waiting to generate socket</h3>
            );
          }}
        />
        <Route
          path="/chansey"
          exact
          render={() => {
            return socket ? (
              <EggCatchGame socket={socket} />
            ) : (
              <h3>Waiting for socket</h3>
            );
          }}
        />
        <Route path="/phaser-game" exact component={PhaserGame} />
        {/* <Route

          path="/profile"
          exact
          render={() => {
            return <Profile profileInfo={profileInfo} />;
          }}
        /> */}

        <Route
          path="/externalgames"
          exact
          render={() => {
            return <ExternalGames />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
