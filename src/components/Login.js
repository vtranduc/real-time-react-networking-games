import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";

// import { Socket } from "net";

function Login({
	loginStatus,
	setLoginStatus,
	setProfileInfo,
	socket,
	httpServer
}) {
	const [userInfo, setUserInfo] = useState({ email: "", password: "" });

	function handleSubmit(event) {
		event.preventDefault();
		//alert(`${user.username} ${user.password}`);
		let cookies = new Cookies();
		//--------------this is to login, maybe need to add useeffect-----------
		// console.log("SERVER IS: ", httpServer);
		axios
			.post(`${httpServer}login`, {
				email: userInfo.email,
				password: userInfo.password
			})
			.then(response => {
				if (response.data.length) {
					setLoginStatus(true);
					//------Associate with socket-------------------------------------
					// socket.emit("login", {
					//   username: response.data[0].username,
					//   avatar: response.data[0].avatar
					// });

					//---------------------------------------------------------------
					console.log("Setting the cookie!");
					cookies.set("profile", response.data[0].username, {
						path: "/"
					});
					console.log("show me response!: ", response.data);
					console.log("Have set the cookie", cookies.get("profile"));
					// console.log("cookies should be setting now");
					//this should be set to a cookies session instead

					// console.log(
					// 	JSON.stringify({
					// 		username: response.data[0].username,
					// 		avatar: response.data[0].avatar,
					// 		firstName: response.data[0].first_name,
					// 		lastName: response.data[0].last_name
					// 	})
					// );
					cookies.set("profile", response.data[0].cookie, {
						path: "/"
					});
					setProfileInfo({
						username: response.data[0].username,
						avatar: response.data[0].avatar,
						firstName: response.data[0].first_name,
						lastName: response.data[0].last_name
					});

					//

					console.log(loginStatus);
					console.log("this is right");
				} else {
					alert("Wrong username or password!");
				}
				console.log("success response!", response.data);
			})
			.catch(err => {
				console.log("error: ", err);
			});
		//-----------------------------------------------------------------
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
		<div className="limiter">
			<div className="container-login100">
				<div className="wrap-login100 p-t-85 p-b-20">
					<span className="login100-form-title p-b-70">Welcome</span>
					<span className="login100-form-avatar">
						<img src="images/avatar-01.jpg" alt="AVATAR" />
					</span>
					<form onSubmit={handleSubmit}>
						<div
							className="wrap-input100 validate-input m-t-85 m-b-35"
							data-validate="Enter username">
							<input
								className="input100"
								type="email"
								name="email"
								value={userInfo.email}
								onChange={updateInput}
							/>
							<span class="focus-input100" data-placeholder="Email"></span>
						</div>

						<div
							className="wrap-input100 validate-input m-b-50"
							data-validate="Enter password">
							<input
								className="input100"
								type="password"
								name="password"
								value={userInfo.password}
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="Password"></span>
						</div>

						<div className="container-login100-form-btn">
							<button className="login100-form-btn" onClick={() => {}}>
								Login
							</button>
						</div>
					</form>

					<ul className="login-more p-t-190">
						<li className="m-b-8">
							<span className="txt1">Forgot</span>

							<a href="#" className="txt2">
								Username / Password?
							</a>
						</li>

						<li>
							<span className="txt1">Don’t have an account?</span>

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

export default Login;
