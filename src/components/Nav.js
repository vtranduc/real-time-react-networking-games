import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import Cookies from "universal-cookie";

function NavBar({
	loginStatus,
	setLoginStatus,
	profileInfo,
	socket,
	setProfileInfo
}) {
	const [pageName, setPageName] = useState("The Best Website");
	let cookies = new Cookies();
	useEffect(() => {
		const handleCatchGuestProfile = function(data) {
			console.log("getting guest profile");
			setLoginStatus(false);
			setProfileInfo({
				username: data.username,
				avatar: data.avatar,
				firstName: "",
				lastName: ""
			});

			socket.on("catchGuestProfile", handleCatchGuestProfile);
		};

		return () => {
			if (socket && handleCatchGuestProfile) {
				socket.removeListener("catchGuestProfile", handleCatchGuestProfile);
			}
		};
	}, []);

	return (
		<div id="sep">
			{profileInfo && (
				<div id="navprofile">
					<img src={profileInfo.avatar} id="navimage"></img>
					<h3 id="welcomeprompt">{profileInfo.username}</h3>
				</div>
			)}

			{!loginStatus && (
				<nav>
					{/* <h3>{pageName}</h3> */}
					<div>
						<div className="logo">
							<ul className="nav-links">
								<Link
									to="/"
									onClick={() => {
										// setPageName("The Best Website in the World");
									}}>
									<li>Home</li>
								</Link>
								<Link
									to="/aboutus"
									onClick={() => {
										// setPageName("About Me and My Love Viet");
									}}>
									<li>About</li>
								</Link>
								<Link
									to="/lobby"
									onClick={() => {
										// setPageName("Games Lobby");
									}}>
									<li>Lobby</li>
								</Link>
								<Link
									to="/Login"
									onClick={() => {
										// setPageName("Login Page");
									}}>
									<li>Login</li>
								</Link>
								<Link
									to="/Register"
									onClick={() => {
										// setPageName("Register Page");
									}}>
									<li>Register</li>
								</Link>
								<Link
									to="/externalgames"
									onClick={() => {
										// setPageName("Register Page");
									}}>
									<li>Phaser Games</li>
								</Link>
							</ul>
						</div>
					</div>
				</nav>
			)}
			{loginStatus && (
				<nav>
					{/* <h3>{pageName}</h3> */}
					<div>
						<div className="logo">
							<ul className="nav-links">
								<Link
									to="/user/a"
									onClick={() => {
										setPageName("User Profile");
									}}>
									<li>Profile</li>
								</Link>
								<Link
									to="/"
									onClick={() => {
										setPageName("The Best Website in the World");
									}}>
									<li>Home</li>
								</Link>
								<Link
									to="/aboutus"
									onClick={() => {
										setPageName("About Me and My Love Viet");
									}}>
									<li>About</li>
								</Link>
								<Link
									to="/lobby"
									onClick={() => {
										setPageName("Games Lobby");
									}}>
									<li>Game Lobby</li>
								</Link>
								<Link
									to="/"
									onClick={() => {
										cookies.remove("profile");
										setPageName("Home");
										socket.emit("requestGuestProfile");
										setLoginStatus(false);
									}}>
									<li>Logout</li>
								</Link>
							</ul>
						</div>
					</div>
				</nav>
			)}
		</div>
	);
}

export default NavBar;
