import React, { useState } from "react";
import "../styles/login.css";
import axios from "axios";


function Login() {
	const [user, setUser] = useState({ email: "", password: "" });

	function handleSubmit(event) {
		// console.log("submit handled");
		event.preventDefault();
		//alert(`${user.username} ${user.password}`);


		axios.post('http://localhost:3001/login', {email: user.email, password: user.password}).then((response)=>{
			console.log("success response!", response)
		}).catch((err)=>{
			console.log("error: ", err);
		})
		
	}
	function updateInput(event) {
		switch (event.target.name) {
			case "email":
				
				setUser({ ...user, email: event.target.value });
				break;
			case "password":
				
				setUser({ ...user, password: event.target.value });
				break;
			default:
				console.log("not working", event.target);
		}
	}

	return (
		<div id="login-main">
			<form onSubmit={handleSubmit}>
				Email:
				<br />
				<input
					name="email"
					value={user.email}
					onChange={updateInput}
				></input>
				<br />
				Password:
				<br />
				<input
					name="password"
					value={user.password}
					onChange={updateInput}
				></input>
				<br></br>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default Login;
