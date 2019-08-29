import React, { useEffect, useState } from "react";
import useKeyPress from "../../helpers/useKeyPress";
// const useKeyPress = require("../../helpers/useKeyPress");

export default function Soccer({ socket }) {
	//----------------------Literals
	const temporaryRoom = "testingSoccer";
	// All values for this myst be integers
	const fieldSpec = { height: 600, width: 800, top: 150, left: 50 };
	// Both width and height are the ratio relative to the fieldSpec's width
	// The must be the value between 0 and 1
	const ballSpec = { width: 0.05, height: 0.05 };
	const playerSpec = { width: 0.1, height: 0.1 };
	const config = { frameDuration: 0.1 };
	const playerPhysics = {
		accel: { x: 1.2, y: 1.2 },
		reverseAccel: { x: 3, y: 3 },
		resistance: { x: 1.2, y: 1.2 },
		wallBounce: 0.8
	};
	//----------------------

	const [spritePos, setSpritePos] = useState(null);

	useEffect(() => {
		socket.emit("soccerInit", {
			room: temporaryRoom,
			fieldSpec,
			config,
			playerPhysics
		});
		socket.on("soccerUpdateGame", data => {
			console.log("update the game");
			console.log(data);
			setSpritePos(data);
		});
		return () => {
			console.log("Unmounting!");
			socket.removeListener("soccerUpdateGame");

			socket.emit("soccerDisconnect", temporaryRoom);
		};
	}, []);

	const w = useKeyPress("w");
	const a = useKeyPress("a");
	const d = useKeyPress("d");
	const s = useKeyPress("s");

	useEffect(() => {
		socket.emit("soccerHandleKeyPress", {
			axis: "x",
			dir: a ? (d ? "" : "left") : d ? "right" : "",
			room: temporaryRoom
		});
	}, [a, d]);
	useEffect(() => {
		socket.emit("soccerHandleKeyPress", {
			axis: "y",
			dir: w ? (s ? "" : "up") : s ? "down" : "",
			room: temporaryRoom
		});
	}, [w, s]);

	return (
		<>
			<img
				src="assets/soccer/field.jpg"
				style={{
					height: fieldSpec.height,
					width: fieldSpec.width,
					position: "absolute",
					top: fieldSpec.top,
					left: fieldSpec.left
				}}
			></img>
			{spritePos && (
				<div>
					<img
						src="assets/soccer/ball.png"
						style={{
							height: Math.floor(ballSpec.height * fieldSpec.width),
							width: Math.floor(ballSpec.width * fieldSpec.width),
							position: "absolute",
							top: spritePos.ball.y,
							left: spritePos.ball.x
						}}
					></img>
					{Object.keys(spritePos.players).map(socketId => {
						return (
							<img
								key={socketId}
								src="assets/soccer/player.png"
								style={{
									height: Math.floor(playerSpec.height * fieldSpec.width),
									width: Math.floor(playerSpec.width * fieldSpec.width),
									top: spritePos.players[socketId].y,
									left: spritePos.players[socketId].x,
									position: "absolute"
								}}
							></img>
						);
					})}
				</div>
			)}
		</>
	);
}
