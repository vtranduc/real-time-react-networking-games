import React from "react";

export default function Post({ title, message }) {
	return (
		<div className="post">
			<h3>{title}</h3>
			<p>{message}</p>
		</div>
	);
}
