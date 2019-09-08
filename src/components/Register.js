import React, { useState } from "react";
import "../styles/register.css";
import axios from "axios";
function Register({ httpServer }) {
  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    password: null,
    confirmPassword: null
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
          if (response.data.length) {
          }
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
    alert(
      `${user.firstName}${user.lastName}${user.email}${user.username}${user.password}${user.confirmPassword}`
    );
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
    <div className="main">
      <form onSubmit={handleSubmit}>
        First Name:
        <br />
        <input
          name="firstName"
          value={user.firstName}
          onChange={updateInput}
        ></input>
        <br></br>
        Last Name:
        <br />
        <input
          name="lastName"
          value={user.lastName}
          onChange={updateInput}
        ></input>
        <br></br>
        Email:
        <br />
        <input name="email" value={user.email} onChange={updateInput}></input>
        <br></br>
        Username:
        <br />
        <input
          name="username"
          value={user.username}
          onChange={updateInput}
        ></input>
        <br></br>
        Password:
        <br />
        <input
          name="password"
          value={user.password}
          onChange={updateInput}
        ></input>
        <br></br>
        Confirm password:
        <br />
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
