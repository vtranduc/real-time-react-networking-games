import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import Posts from "./Post";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useKeyPress from "../helpers/useKeyPress";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile({ profileInfo, httpServer, loginStatus, match }) {
	//axios call to get user messages
	const [posts, setPosts] = useState(null);
	const [postList, setPostList] = useState([]);
	const [userMessage, setUserMessage] = useState({
		title: "",
		message: ""
	});

	function handleSubmit() {
		console.log(profileInfo);
		if (
			profileInfo &&
			userMessage.title.length > 1 &&
			userMessage.message.length > 1
		) {
			axios
				.post(`${httpServer}postmessage`, {
					title: userMessage.title,
					message: userMessage.message,
					sender: profileInfo.username,
					reciever: "a"
				})
				.then(function(response) {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});
		} else {
			alert("not logged in, or empty title or message");
		}
	}

	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================

	useEffect(() => {
		// console.log(
		//   "attempt to retrie user data from the server",
		//   match.params.username
		// );

		axios
			.post(`${httpServer}retrieveuserprofile`, {
				username: match.params.username
				// viewer: loginStatus ? profileInfo.username : null
			})
			.then(res => {
				console.log("Data received by client: ", res.data);
			});
	}, []);

	// useEffect(() => {
	//   console.log("PASS ME THE DATAAAAAAAAAAAAA: ", match.params.username);

	//   if (profileInfo) {
	//     axios
	//       .get(`${httpServer}getmessages/${profileInfo.username}`)
	//       .then(data => {
	//         setPosts(data.data);
	//       });
	//   }
	// }, []);

	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================
	// =========ALL LOADING============================

	useEffect(() => {
		let postHistory = [];
		if (posts) {
			for (let messageData of posts) {
				postHistory.push(
					<Posts
						title={messageData.message_title}
						message={messageData.sent_message}
						sender={"not sure"}
					/>
				);
			}

			setPostList(postHistory);
			//console.log(postList);
		}
	}, [posts]);
	//getMessage("jzizzless").then(console.log);

	// function onSubmit() {
	// 	let temp = [...posts];
	// 	temp.push(
	// 		<Posts title={userMessage.title} message={userMessage.message} />
	// 	);
	// 	setPosts(temp);
	// }

	function updateInput(event) {
		switch (event.target.name) {
			case "title":
				setUserMessage({ ...userMessage, title: event.target.value });
				break;
			case "message":
				setUserMessage({ ...userMessage, message: event.target.value });
				break;
			default:
				break;
		}
	}

	return (
		<div id="divider">
			<div id="left">
				<div id="profile">
					{!profileInfo && (
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
							id="profile-img"
						/>
					)}

					{profileInfo && <img src={profileInfo.avatar} id="profile-img" />}

					{profileInfo && profileInfo.username}
					<div id="profile-button">
						<Button variant="contained" color="primary">
							Add Friend
						</Button>
						<Button variant="contained" color="secondary">
							Follow
						</Button>
					</div>
					<div id="profile-about">
						Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
						consectetur, adipisci velit.
					</div>
				</div>
			</div>
			<div className="right">
				<form id="form-post">
					<Input
						onChange={updateInput}
						name="title"
						value={userMessage.title}
						type="text"
						placeholder="Title"
					/>
					<Input
						onChange={updateInput}
						name="message"
						value={userMessage.message}
						type="text"
						placeholder="Add Message"
					/>

					<Button onClick={handleSubmit}>Submit</Button>
				</form>
				{postList}
			</div>
		</div>
	);
}

export default Profile;
