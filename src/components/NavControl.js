import React, { useState } from "react";

import { red } from "@material-ui/core/colors";
// import { View, Text } from "react-native";
import Burger from "./Hamburger";
import NavList from "./NavList";
import Hamburger from "./Hamburger";
import "../styles/navbar.css";
function sideBarToggle(setToggle, toggle) {
	setToggle(!toggle);
}

function NavControl() {
	const [toggle, setToggle] = useState(true);

	return (
		<nav>
			<div>
				<h3>Games</h3>
			</div>
			<Hamburger />
			<NavList />
		</nav>
	);
}

export default NavControl;
