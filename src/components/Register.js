// 	return (
// 		<div className="main">
// 			<div id="register">
// 				<h3>Register</h3>
// 				<form onSubmit={handleSubmit}>
// 					First Name:
// 					<br />
// 					<input
// 						name="firstName"
// 						value={user.firstName}
// 						onChange={updateInput}
// 					></input>
// 					<br></br>
// 					Last Name:
// 					<br />
// 					<input
// 						name="lastName"
// 						value={user.lastName}
// 						onChange={updateInput}
// 					></input>
// 					<br></br>
// 					Email:
// 					<br />
// 					<input name="email" value={user.email} onChange={updateInput}></input>
// 					<br></br>
// 					Username:
// 					<br />
// 					<input
// 						name="username"
// 						value={user.username}
// 						onChange={updateInput}
// 					></input>
// 					<br></br>
// 					Password:
// 					<br />
// 					<input
// 						name="password"
// 						value={user.password}
// 						onChange={updateInput}
// 					></input>
// 					<br></br>
// 					Confirm password:
// 					<br />
// 					<input
// 						name="confirmPassword"
// 						value={user.confirmPassword}
// 						onChange={updateInput}
// 					></input>
// 					<br></br>
// 					<input id="submit" type="submit" value="Submit" />
// 				</form>
// 			</div>
// 		</div>
// 	);
// }

// export default Register;

// ------

import React, { useState } from "react";
import "../styles/register.css";
import axios from "axios";
function Register({ httpServer }) {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: ""
	});
	function createUserSubmit() {
		if (
			user.firstName &&
			user.lastName &&
			user.email &&
			user.password &&
			user.confirmPassword &&
			user.password == user.confirmPassword
		) {
			axios
				.post(`${httpServer}register`, {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					username: user.username,
					password: user.password,
					avatar: "alsdjfalsdjfalsjf"
				})
				.then(response => {
					console.log("added to database");
				});
		}
	}

	// axios
	// 		.post("register", {
	// 			if(user.)
	// 		})
	// 		.then(response => {
	// 			if (response.data.length) {
	// 				setLoginStatus(true);
	//       //this should be set to a cookies session instead
	// 				setProfileInfo({
	// 					username: response.data[0].username,
	// 					avatar: response.data[0].avatar,
	// 					firstName: response.data[0].first_name,
	// 					lastName: response.data[0].last_name
	// 				});
	// 				console.log(loginStatus);
	// 				console.log("this is right");
	// 			}
	// 			console.log("success response!", response.data);
	// 		})
	// 		.catch(err => {
	// 			console.log("error: ", err);
	// 		});

	function handleSubmit(event) {
		console.log("submit handled");

		event.preventDefault();

		createUserSubmit();
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
		<div className="limiter">
			<div className="container-login100">
				<div className="wrap-login100 p-t-85 p-b-20" id="joieiscute">
					<span className="login100-form-title p-b-70">Welcome</span>

					<form onSubmit={handleSubmit}>
						<div
							className="wrap-input100 validate-input m-t-85 m-b-35"
							data-validate="Enter username">
							<input
								className="input100"
								type="text"
								value={user.firstName}
								name="firstName"
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="First Name"></span>
						</div>

						<div
							className="wrap-input100 validate-input m-b-50"
							data-validate="Enter password">
							<input
								className="input100"
								type="text"
								name="lastName"
								value={user.lastName}
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="Last Name"></span>
						</div>

						<div
							className="wrap-input100 validate-input m-b-50"
							data-validate="Enter password">
							<input
								className="input100"
								type="email"
								name="email"
								value={user.email}
								onChange={updateInput}
							/>
							<span className="focus-input100" data-placeholder="Email"></span>
						</div>

						<div
							className="wrap-input100 validate-input m-b-50"
							data-validate="Enter password">
							<input
								className="input100"
								type="text"
								name="username"
								value={user.username}
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="Username"></span>
						</div>
						<div
							className="wrap-input100 validate-input m-b-50"
							data-validate="Enter password">
							<input
								className="input100"
								type="password"
								name="password"
								value={user.password}
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="Password"></span>
						</div>
						<div
							className="wrap-input100 validate-input m-b-50"
							data-validate="Enter password">
							<input
								className="input100"
								type="password"
								name="confirmPassword"
								value={user.confirmPassword}
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="Confirm Password"></span>
						</div>

						<div className="container-login100-form-btn">
							<button className="login100-form-btn">Login</button>
						</div>
					</form>

					<ul className="login-more p-t-190">
						<li className="m-b-8">
							<span className="txt1">Forgot </span>

							<a href="#" className="txt2">
								Username / Password?
							</a>
						</li>

						<li>
							<span className="txt1">Don’t have an account? </span>

							<a href="#" className="txt2">
								Sign up
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Register;
