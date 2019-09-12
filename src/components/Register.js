import React, { useState } from "react";
import "../styles/register.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
function Register({ httpServer }) {
	const [redirectStatus, setRedirectStatus] = useState(false);

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
					avatar:
						"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEUKME7///+El6bw8vQZPVlHZHpmfpHCy9Ojsbzg5ekpSmTR2N44V29XcYayvsd2i5yTpLFbvRYnAAAJcklEQVR4nO2d17arOgxFs+kkofz/154Qmg0uKsuQccddT/vhnOCJLclFMo+//4gedzcApf9B4srrusk+GsqPpj+ypq7zVE9LAdLWWVU+Hx69y2FMwAMGyfusLHwIpooyw9IAQfK+8naDp3OGHvZ0FMhrfPMgVnVjC2kABOQ1MLvi0DEIFj1ILu0LU2WjNRgtSF3pKb4qqtd9IHmjGlJHlc09IHlGcrQcPeUjTAySAGNSkQlRhCCJMGaUC0HSYUx6SmxFAtJDTdylsr4ApC1TY0yquKbCBkk7qnYVzPHFBHkBojhVJWviwgPJrsP4qBgTgbQXdsesjm4pDJDmIuswVZDdFx0ENTtkihoeqSDXD6tVxOFFBHndMKxWvUnzexpIcx/Gg2goJJDhVo6PCMGRAnKTmZuKm3wcJO/upphUqUHy29yVrRhJDORXOKIkEZDf4YiRhEF+iSNCEgb5KY4wSRDkB/yurUEG8nMcocgYABnvbrVL3nMIP0h/d5udKnwzSC/InfPdkJ6eWb0PJE++dyVVyQP5iQmWW27X5QG5druEKafBu0Hqu9saVOHa8HKC/K6BzHKZiRMEZCDF0Nd1/ZfXI/fcOibHOssFgokg9uFA20BhztHEAZIjIohrD/o1wljeFBDEwBo8YUt5Ir/rNLjOIACPFdy/AbEcPdcJBOCxytjeYAM4Kzp6rhOIPhRGNzwmFP3rOoTFI0irtnQKx6fj1Zt+h9njEUS9mKJxfFRrX5lt7wcQtaWTOfTHeIXVJQcQrRW+OYex2j0a66XZINoO8a7fPH2iHF2mC7ZBtB3Czb5QvjizSx7A3308mRzqAwujSywQbYfwc0iU8zqjS0yQ6ztEHX9332KCaGNIYB/Qq1z3yN0oDZBWyeFYJBCkm2sXLhDtpKFwNDMu5TnrZpYGiHbK4Nlwikg5DrYV1g6iPoJmzE5MKd/fOp53EPUaQZaLqH3u+vo2ELWp3wSyWuYGoj9EEIJoV3L9AUS/ZLsJpLNBXmqOu0CW6P5A/dx9IL0FAji/FYKot9EqE0Tvs6QBUe/2CxMEkZAlBNGPhdoAQWyTSmbxUwvUygwQyMmniAPgLt87CODXHuftWJIQgzrfQDC5AfwSgz9MmmG/gWCOqDgZ4JsQeTvZBoJJDhAFEsSDyxUEEUUekk0UEMhjBcEcGsoWVpBU3NcCgkkPkJWrKbdRZvULCMTWhYEdMrayBQRyqHcnSLmAIH7LcWJ8Hch7BsHEdWFpJsZjziCgFBpZ9TPm4e0XBJTTJKt9xjy8RoLI4gimPLP5goCSgWTrEcyzsy8IqmZVMo0H5bJiQToBCOjZ5RcElhjLN3dU7uQMAvoxwQkJZKI1CQzCthJYEigahHuDDi4rFwzCPQ7F1fiDQZgTR5iJwEGYRgIsiECD8BwwMAEfDcIaW8CRBQdhjS1kJQEchDEFhiRKr4KDFPS9FGQNVwEHoW83QjsEHdkfnuIOl6C1NjMItiaCaCWgbdpFJXQ9soh2uoB9aJcCxFdgZwlcrTmvENGlrITBBdpK25Qhd1F2RScq8CKu/gsCL8qN5THjy+Rr5E6joYgPxpdl518QrCf8Kpgjn6C8HLkbb+vt7ZM8wdVvy258khsRfHaS5DalDnlidZT7Erk+SXV5Bj1D3LS29XyhVJuoKHs9Q8S6reK11oUc7vPcr9uswP3SLiDINefXOF5rwCuGzVT6zVkVPfh2wWmHcz4wAwba2cgN1/Tsvleu7//i69CgVyt1GwjOs2+XK3rtbl151Tg3vOeioG40Mz2V+6pQ4xbJHOZj6g0EMxk93tV7fuedvVZpQSPhbwNBGInrymGrwNh1GXmL8F+lAaJ+NU/fzcmvJqvKj7177+1v1GY/GiBKI1Fdy/2XK6upXwaIJpI8B/399W0mH9zzafKaeCF9J0WF+jyCuFusTGzZKhFH8dVLZql2brxgcdVBKb7KG/7UZTmB3XJ6uL/QYT5ScRI74FcHEJ7feopyfGkaeaGlPoCw/BbjZmSBWIvINQNmTxdjWJqwUI8sztR4nYPuIPSTSUnOCZOE3ierqRoJfNSQxDjLEYs8i91eqgFCDSWiFHiuqAN9CwEGCPEISVjvwhS7Mfx6dtX8kC5aqvneGBOEFN2v6RBiYwr3DQOkLhEW6fHFbIwFQnkLiWYmZxE220z/aedPx99C+hiyKR4OzNFhg8S75CJTnxQ1dyugHTLaY10iu9dBpmhQtMz1ABLrkgtHVnRsPUO3OcU25i8cWdGxZbflCBKJqBdMs3aF/dYhNexU9RFcYEmLXYQKghyWdufyldBSU3KpjkKhZclxTXQGCTkL/HZDUIH5+Gkt4SgoCtj7pSYSNJLTK3VVRnmXZxebSMBIzmHABeIdXBebiN9eHYtUZ62ab3BdGkUm+SKJw1bdRXeewaX7qqdAnljg2sVxg3guAk3baofcg9yZ2eZpnHNvSFrEqhB9YPjesmt0pt6Xc8hl7W5L9Q4Xx09ctsrd5VhWeF6nF8SRrZdw49qns//0xTK/AZ8vGr3caTliuzeFNeCJTgafpKlhHd2WP1sy1LqDF798gjKJPLqDr9keoTd43+NyNzC1CI8Xy2lcPtOaVBI5IiAWyQ3e125AcKoXs2Djhy5eVc3KiBxREIPkhjBiLhIjU++4T91IbggjRiCJLSEIwWGddkEaxlVN5KCArPHk8mXVpHk8FHH7JL3n5dPA7C90q7XkeFJucacNmGXeRfswLE71HA79efaGiCN/Ofjmfmtcp8X10tIsqCacV5xfRWjNUiXGYbovWgyFYHcQLak15K9oM5zqmgaeKsHJetbSHfSPzXOiw/rxE9YH4CXaUpsZ0ztemFurP95Jpyvrd29YTpIZr7cEJHqfc7Wl0PFm2+yJR70udaokKFtGPTdm8WdQe24+HmVLlueboWQquBcYYVH2vEzfh8kCks1p90eWsLCyZ8qK7E86Oe+3XYFnBuiWdth20UqZR5SvMoyPg3WNauJipi0LMTQgVq5xUUlZcrPsopPHJ926z8pm7xyFLrH/PxpHSoXKdWgXsLn1scZn1ZDd/2vszN3lt254qkE+qu3yoqLM+ghN3Qz2qcVzUC/ZMFsK/alU6l0OWV/bQz6v6yYbyuN5BaZ4A7Y30vs/PPksS2+qzlvfF7OQmzzcL7W+xa7OIfRuVdtn/tdvdFLnL4OTKcm2W16PmWc4FWWXNSlWM2n3D+uPxuyrcfo74aP+Ac30a82+oLmfAAAAAElFTkSuQmCC"
				})
				.then(response => {

					console.log("nothing is here");

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
		if (user.username != "") setRedirectStatus(user.username);
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
			{redirectStatus && <Redirect to={`/user/${redirectStatus}`} />}
			<div className="container-login100">
				<div className="wrap-login100 p-t-85 p-b-20" id="joieiscute">
					<span className="login100-form-title p-b-70">Welcome</span>

					<form onSubmit={handleSubmit}>
						<div
							className="wrap-input100 validate-input m-t-85 m-b-35"
							data-validate="Enter username"
						>
							<input
								className="input100"
								type="text"
								value={user.firstName}
								name="firstName"
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="First Name"
							></span>
						</div>

						<div
							className="wrap-input100 validate-input m-b-50"
							data-validate="Enter password"
						>
							<input
								className="input100"
								type="text"
								name="lastName"
								value={user.lastName}
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="Last Name"
							></span>
						</div>

						<div
							className="wrap-input100 validate-input m-b-50"
							data-validate="Enter password"
						>
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
							data-validate="Enter password"
						>
							<input
								className="input100"
								type="text"
								name="username"
								value={user.username}
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="Username"
							></span>
						</div>
						<div
							className="wrap-input100 validate-input m-b-50"
							data-validate="Enter password"
						>
							<input
								className="input100"
								type="password"
								name="password"
								value={user.password}
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="Password"
							></span>
						</div>
						<div
							className="wrap-input100 validate-input m-b-50"
							data-validate="Enter password"
						>
							<input
								className="input100"
								type="password"
								name="confirmPassword"
								value={user.confirmPassword}
								onChange={updateInput}
							/>
							<span
								className="focus-input100"
								data-placeholder="Confirm Password"
							></span>
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
