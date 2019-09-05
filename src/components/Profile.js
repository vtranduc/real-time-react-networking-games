import React, { useState } from "react";
import "../styles/profile.css";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useKeyPress from "../helpers/useKeyPress";
import Container from "@material-ui/core/Container";

function Profile() {
	const [posts, setPosts] = useState([
		<div className="post">
			<h3>Post Title</h3>
			<p>
				Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
				consectetur, adipisci velit.
			</p>
		</div>
	]);

	function onSubmit() {
		let temp = [...posts];
		temp.push(
			<div className="post">
				<h3>Post Title</h3>
				<p>
					Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
					consectetur, adipisci velit.
				</p>
			</div>
		);
		setPosts(temp);
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
					<input type="text" placeholder="Title" />
					<input type="text" placeholder="Type your tweet here!" />
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
