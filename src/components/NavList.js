import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
function NavList({ toggleState }) {
	return (
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
						<li>Game</li>
					</Link>
					<Link to="/soccer">
						<li>Soccer</li>
					</Link>
					<Link to="/chansey">
						<li>Chansey</li>
					</Link>
				</ul>
			</div>
		</div>
	);
}

export default NavList;
