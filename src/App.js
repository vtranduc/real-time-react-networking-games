import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/Nav";
import Lobby from "./components/Lobby";

import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Soccer from "./components/soccer/Soccer";
import EggCatchGame from "./components/eggCatch/eggCatchClient";
import Home from "./components/Home";
import Profile from "./components/Profile";
import PhaserGame from "./components/PhaserGame";
import RockPaperScissors from "./components/rockPaperScissors/RockPaperScissors";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import io from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import { Socket } from "net";
const serverPORT = 3001;

function App() {
	//--------------------global states----------------------
	const [loginStatus, setLoginStatus] = useState(true);
	const [room, setRoom] = useState("soccerHAHA");
	//-------------------------------------------------------

	let socket = io(`:${serverPORT}`);
	console.log("initializing app");

	return (
		<Router>
			<NavBar loginStatus={loginStatus} setLoginStatus={setLoginStatus} />

			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/profile" exact component={Profile} />
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
							/>
						);
					}}
				/>

				<Route path="/register" exact component={Register} />
				<Route
					path="/soccer"
					exact
					render={() => {
						return <Soccer socket={socket} room={room} />;
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
				<Route path="/profile" exact component={Profile} />
			</Switch>
		</Router>
	);

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
