import React from "react";
import "../styles/post.css";
export default function Post({ title, message, sender }) {
	return (
		<div className="post">
			<div className="post-title">
				<h3 id="title">{title}</h3> <h4 id="sender">{sender}</h4>
			</div>

			<p id="message">{message}</p>
		</div>
	);
}
