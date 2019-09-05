import React, { useState } from "react";
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

function Profile() {
	const [userMessage, setUserMessage] = useState({
		title: "",
		message: ""
	});
	const [posts, setPosts] = useState([
		<Posts title={userMessage.title} message={userMessage.message} />
	]);

	function onSubmit() {
		let temp = [...posts];
		temp.push(
			<Posts title={userMessage.title} message={userMessage.message} />
		);
		setPosts(temp);
	}

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
				left
				<div id="profile">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
						id="profile-img"
					/>
					profile
					<div id="profile-button">
						<Button>Add Friend</Button>
						<Button>Follow</Button>
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
					<Button
						onClick={() => {
							onSubmit();
						}}>
						Submit
					</Button>
				</form>

				{posts}
			</div>
		</div>
	);
}

export default Profile;
