import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { Icon } from "@material-ui/core";
function NavList() {
	return (
		<nav>
			<h3>Games</h3>

			<div>
				<div className="logo">
					<ul className="nav-links">
						<Link to="/">
							<li>Home</li>
						</Link>
						<Link to="/about">
							<li>About</li>
						</Link>
						<Link to="/lobby">
							<li>Game Lobby</li>
						</Link>
						<Link to="/Login">
							<li>Login</li>
						</Link>
						<Link to="/Register">
							<li>Register</li>
						</Link>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default NavList;
