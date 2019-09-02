import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function NavBar() {
	const [pageName, setPageName] = useState("The Best Website in the World");
	const [user, setUser] = useState(true);
	return (
		<div >
			{!user && (
				<nav>
					<h3>{pageName}</h3>
					<div>
						<div className="logo">
							<ul className="nav-links">
								<Link
									to="/"
									onClick={() => {
										setPageName("The Best Website in the World");
									}}
								>
									<li>Home</li>
								</Link>
								<Link
									to="/about"
									onClick={() => {
										setPageName("About Me and My Love Viet");
									}}
								>
									<li>About</li>
								</Link>
								<Link
									to="/lobby"
									onClick={() => {
										setPageName("Games Lobby");
									}}
								>
									<li>Lobby</li>
								</Link>
								<Link
									to="/Login"
									onClick={() => {
										setPageName("Login Page");
									}}
								>
									<li>Login</li>
								</Link>
								<Link
									to="/Register"
									onClick={() => {
										setPageName("Register Page");
									}}
								>
									<li>Register</li>
								</Link>
							</ul>
						</div>
					</div>
				</nav>
			)}
			{user && (
				<nav>
					<h3>{pageName}</h3>
					<div>
						<div className="logo">
							<ul className="nav-links">
								<Link
									to="/profile"
									onClick={() => {
										setPageName("User Profile");
									}}
								>
									<li>Profile</li>
								</Link>
								<Link
									to="/"
									onClick={() => {
										setPageName("The Best Website in the World");
									}}
								>
									<li>Home</li>
								</Link>
								<Link
									to="/about"
									onClick={() => {
										setPageName("About Me and My Love Viet");
									}}
								>
									<li>About</li>
								</Link>
								<Link
									to="/lobby"
									onClick={() => {
										setPageName("Games Lobby");
									}}
								>
									<li>Game Lobby</li>
								</Link>
								<Link
									to="/"
									onClick={() => {
										setPageName("Home");
										setUser(!user)
									}}
								>
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
