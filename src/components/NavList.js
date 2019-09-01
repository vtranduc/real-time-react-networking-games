import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { Icon } from "@material-ui/core";
function NavList() {
	const [pageName, setPageName] = useState("The Best Website in the World");
	const [user, setUser] = useState(false);
	return (
		<nav>
			{!user && (
				<>
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
									<li>Game Lobby</li>
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
				</>
			)}
			{user && (
				<>
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
									<li>Game Lobby</li>
								</Link>
							</ul>
						</div>
					</div>
				</>
			)}
		</nav>
	);
}

export default NavList;
