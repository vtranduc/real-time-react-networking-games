import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function ChatBox(props) {
	return (
		<div
			style={{
				position: "absolute",
				top: props.top,
				borderRadius: "10px",
				left: props.left,
				border: "solid",
				width: props.width,
				height: props.height,
				background: "white",
				opacity: 0.8
			}}>
			<div style={{ margin: "1em" }}>
				{/* <div style={{ display: "flex" }}> */}
				<TextField
					id={props.id}
					label="Send a chat!"
					onFocus={props.handleFocus}
					onBlur={props.handleBlur}
					onChange={props.handleOnChange}
					value={props.entry}
					style={{ border: "none", width: "85%" }}>
					Hello
				</TextField>
				<Button
					variant="contained"
					color="primary"
					onClick={props.handleOnClick}
					// style={{ position: "absolute", right: 0 }}
				>
					Send
				</Button>
				{/* </div> */}
				<p></p>
				{/* <div style={{ height: props.height }}> */}
				<div
					style={{
						overflow: "auto",
						height: props.height * 0.85
					}}>
					{props.chats.map(entry => {
						return (
							<p key={entry.key}>
								{entry.user}: {entry.msg}
							</p>
						);
					})}
				</div>
				{/* </div> */}
			</div>
		</div>
	);
}
