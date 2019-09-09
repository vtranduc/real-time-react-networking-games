import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function NavBar({ loginStatus, setLoginStatus, profileInfo }) {
	const [pageName, setPageName] = useState("The Best Website");

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
										setPageName("Home");
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
