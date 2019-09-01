import React, { useState } from "react";

function Login() {
	const [user, setUser] = useState({ username: null, password: null });

	function handleSubmit(event) {
		console.log("submit handled");
		alert(`${user.username} ${user.password}`);
		event.preventDefault();
	}
	function updateInput(event) {
		switch (event.target.name) {
			case "email":
				console.log("updated username");
				console.log(event.target);
				setUser({ ...user, username: event.target.value });
				break;
			case "password":
				console.log("updated password");
				console.log(user);
				setUser({ ...user, password: event.target.value });
				break;
			default:
				console.log("not working", event.target);
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				Email:
				<input
					name="email"
					value={user.username}
					onChange={updateInput}
				></input>
				<br></br>
				Password:
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
