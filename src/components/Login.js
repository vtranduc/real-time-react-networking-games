import React, { useState } from "react";
import "../styles/login.css";
import axios from "axios";


function Login({loginStatus, setLoginStatus}) {

	const [userInfo, setUserInfo] = useState({ email: "", password: "" });
console.log(loginStatus)
	function handleSubmit(event) {
		// console.log("submit handled");
		event.preventDefault();
		//alert(`${user.username} ${user.password}`);


		axios.post('http://localhost:3001/login', {email: userInfo.email, password: userInfo.password}).then((response)=>{
			if(response.data.length){
				setLoginStatus(true)
				console.log(loginStatus)
				console.log("this is right")
				
			}
			console.log("success response!", response.data)
		}).catch((err)=>{
			console.log("error: ", err);
		})
		
	}
	function updateInput(event) {
		switch (event.target.name) {
			case "email":
				
				setUserInfo({ ...userInfo, email: event.target.value });
				break;
			case "password":
				
				setUserInfo({ ...userInfo, password: event.target.value });
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
					value={userInfo.email}
					onChange={updateInput}
				></input>
				<br />
				Password:
				<br />
				<input
					name="password"
					value={userInfo.password}
					onChange={updateInput}
				></input>
				<br></br>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default Login;
