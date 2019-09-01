import React, { useState } from "react";

function Register() {
	const [user, setUser] = useState({
		firstName: null,
		lastName: null,
		email: null,
		username: null,
		password: null,
		confirmPassword: null
	});

	function handleSubmit(event) {
		console.log("submit handled");
		alert(
			`${user.firstName}${user.lastName}${user.email}${user.username}${user.password}${user.confirmPassword}`
		);
		event.preventDefault();
	}
	function updateInput(event) {
		switch (event.target.name) {
			case "firstName":
				console.log("updated firstName");
				console.log(event.target);
				setUser({ ...user, firstName: event.target.value });
				break;
			case "lastName":
				console.log("updated lastName");
				console.log(event.target);
				setUser({ ...user, lastName: event.target.value });
				break;
			case "email":
				console.log("updated email");
				console.log(event.target);
				setUser({ ...user, email: event.target.value });
				break;
			case "username":
				console.log("updated username");
				console.log(event.target);
				setUser({ ...user, username: event.target.value });
				break;
			case "password":
				console.log("updated password");
				console.log(user);
				setUser({ ...user, password: event.target.value });
				break;
			case "confirmPassword":
				console.log("updated confirmPassword");
				console.log(user);
				setUser({ ...user, confirmPassword: event.target.value });
				break;
			default:
				console.log("not working", event.target);
		}
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				First Name:
				<input
					name="firstName"
					value={user.firstName}
					onChange={updateInput}
				></input>
				<br></br>
				Last Name:
				<input
					name="lastName"
					value={user.lastName}
					onChange={updateInput}
				></input>
				<br></br>
				Email:
				<input name="email" value={user.email} onChange={updateInput}></input>
				<br></br>
				Username:
				<input
					name="username"
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
				Confirm password:
				<input
					name="confirmPassword"
					value={user.confirmPassword}
					onChange={updateInput}
				></input>
				<br></br>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default Register;
