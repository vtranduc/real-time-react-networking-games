import React, { useState, useEffect } from "react";
import "../styles/login.css";
import axios from "axios";
import Cookies from "universal-cookie";
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
		alert(`username: ${userInfo.email} password: ${userInfo.password}`);
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
		<div class="limiter">
			<div class="container-login100">
				<div class="wrap-login100 p-t-85 p-b-20">
					<form class="login100-form validate-form">
						<span class="login100-form-title p-b-70">Welcome</span>
						<span class="login100-form-avatar">
							<img src="images/avatar-01.jpg" alt="AVATAR" />
						</span>
						<form onSubmit={handleSubmit}>
							<div
								class="wrap-input100 validate-input m-t-85 m-b-35"
								data-validate="Enter username"
							>
								<input
									class="input100"
									type="email"
									name="email"
									value={userInfo.email}
									onChange={updateInput}
								/>
								<span class="focus-input100" data-placeholder="Email"></span>
							</div>

							<div
								class="wrap-input100 validate-input m-b-50"
								data-validate="Enter password"
							>
								<input
									class="input100"
									type="password"
									name="password"
									value={userInfo.password}
									onChange={updateInput}
								/>
								<span class="focus-input100" data-placeholder="Password"></span>
							</div>

							<div class="container-login100-form-btn">
								<button class="login100-form-btn">Login</button>
							</div>
						</form>

						<ul class="login-more p-t-190">
							<li class="m-b-8">
								<span class="txt1">Forgot</span>

								<a href="#" class="txt2">
									Username / Password?
								</a>
							</li>

							<li>
								<span class="txt1">Don’t have an account?</span>

								<a href="#" class="txt2">
									Sign up
								</a>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
