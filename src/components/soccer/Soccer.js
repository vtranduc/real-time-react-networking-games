import React, { useEffect, useState } from "react";
import useKeyPressMultiple from "../../helpers/useKeyPressMultiple";
import useKeyPress from "../../helpers/useKeyPress";
import ChatBox from "../chatBox/ChatBox";

export default function Soccer({ socket, room }) {
	//----------------------Literals
	const soccerGameTextId = "soccerGameTextId";
	// const temporaryRoom = "testingSoccer";
	// All values for this myst be integers
	// goalSize is realtive to height
	const fieldSpec = {
		height: 700,
		width: 1100,
		top: 150,
		left: 70,
		goalSize: 0.25
	};
	// Both width and height are the ratio relative to the fieldSpec's width
	// The MUST be the value between 0 and 1
	const ballSpec = { width: 0.05, height: 0.05 };
	const playerSpec = { width: 0.06, height: 0.09, team: null };
	const config = { frameDuration: 0.07, gameTime: 30 };
	// const goalSize = 0.25;
	const playerPhysics = {
		reverseAccel: { x: 2, y: 2 }, // Ratio to the field width. Per second
		wallBounce: 0.5, // Speed reduced upon collision with the wall
		ballToPlayerMassRatio: 1,
		accelMag: 0.8,
		maxSpeed: 0.3,
		accelReverseMag: 1.7,
		kickPower: 0.7
	};
	const ballPhysics = {
		// resistance: { x: 0.2, y: 0.2 }, // Ratio to the field width. Per second
		wallBounce: 0.9, // Speed reduced upon collision with the wall
		// Think of it as magnitude of acceleration which acts in  the direction opposite
		// to the ball's velocity
		// It is in the ratio wrt the width of the field
		friction: 0.4
	};
	const pinSpec = { width: 40, height: 40 };
	//----------------------

	const [gameStat, setGameStat] = useState(null);
	const [flagged, setFlagged] = useState(true);
	const [pause, setPause] = useState(false);
	const [chats, setChats] = useState([]);
	const [entry, setEntry] = useState({ inQueue: false, msg: "" });

	useEffect(() => {
		socket.emit("soccerInit", {
			room: room,
			fieldSpec,
			config,
			playerPhysics,
			playerSpec,
			ballSpec,
			ballPhysics
		});

		const soccerUpdateGameCallback = function(data) {
			setGameStat(data);
		};
		socket.on("soccerUpdateGame", soccerUpdateGameCallback);
		const soccerRemoveFlagCallback = function() {
			setFlagged(false);
		};
		socket.on("soccerRemoveFlag", soccerRemoveFlagCallback);
		const soccerGetChatCallback = function(data) {
			setChats(data);
		};
		socket.on("soccerGetChat", soccerGetChatCallback);
		return () => {
			socket.removeListener("soccerUpdateGame", soccerUpdateGameCallback);
			socket.removeListener("soccerRemoveFlag", soccerRemoveFlagCallback);
			socket.removeListener("soccerRemoveFlag", soccerGetChatCallback);
			socket.emit("soccerDisconnect", room);
		};
	}, []);

	const w = useKeyPressMultiple(["w", "W", "ArrowUp"]);
	const a = useKeyPressMultiple(["a", "A", "ArrowLeft"]);
	const d = useKeyPressMultiple(["d", "D", "ArrowRight"]);
	const s = useKeyPressMultiple(["s", "S", "ArrowDown"]);

	useEffect(() => {
		if (!pause) {
			socket.emit("soccerHandleKeyPress", {
				axis: "x",
				dir: a ? (d ? "" : "left") : d ? "right" : "",
				room: room
			});
		}
	}, [a, d]);
	useEffect(() => {
		if (!pause) {
			socket.emit("soccerHandleKeyPress", {
				axis: "y",
				dir: w ? (s ? "" : "up") : s ? "down" : "",
				room: room
			});
		}
	}, [w, s]);

	const spaceBar = useKeyPress(" ");
	const Shift = useKeyPress("Shift");
	useEffect(() => {
		if (!pause) {
			socket.emit("soccerChaseBall", { chase: spaceBar, room: room });
		}
	}, [spaceBar]);
	useEffect(() => {
		if (!pause) {
			socket.emit("soccerApplyBrake", { brake: Shift, room: room });
		}
	}, [Shift]);

	const mousing = useMouseClick(fieldSpec);
	useEffect(() => {
		if (!pause) {
			if (flagged) {
				socket.emit("soccerAim", { room: room, aim: null });
				setFlagged(false);
			} else {
				socket.emit("soccerAim", { room: room, aim: mousing });
				setFlagged(true);
			}
		}
	}, [mousing]);

	useEffect(() => {
		if (entry.inQueue) {
			socket.emit("soccerReceiveChat", { room: room, msg: entry.msg });
			setEntry({ inQueue: false, msg: "" });
		}
	}, [entry.inQueue]);

	//----------------------------------------------
	const Enter = useKeyPress("Enter");
	useEffect(() => {
		if (Enter) {
			if (pause) {
				if (entry.msg) {
					setEntry({ ...entry, inQueue: true });
					// document.getElementById(soccerGameTextId).blur();
				} else {
					document.getElementById(soccerGameTextId).blur();
				}
			} else {
				document.getElementById(soccerGameTextId).focus();
			}
		}
	}, [Enter]);
	//--------------------------------------------

	return (
		<div>
			<img
				src="assets/soccer/field.png"
				style={{
					height: fieldSpec.height,
					width: fieldSpec.width,
					borderRadius: "10px",
					position: "absolute",
					top: fieldSpec.top,
					left: fieldSpec.left
				}}></img>
			<ChatBox
				id={soccerGameTextId}
				entry={entry.msg}
				chats={chats}
				handleOnClick={() => {
					if (entry.msg) {
						setEntry({ ...entry, inQueue: true });
					}
				}}
				handleOnChange={e => {
					setEntry({ ...entry, msg: e.target.value });
				}}
				handleFocus={() => {
					console.log("pause the game");
					setPause(true);
				}}
				handleBlur={() => {
					console.log("resume the game");
					setPause(false);
				}}
				left={fieldSpec.left + fieldSpec.width + 20}
				top={fieldSpec.top}
				height={fieldSpec.height}
				width={500}></ChatBox>
			{gameStat && (
				<div>
					<div
						style={{
							position: "absolute",
							top: fieldSpec.top - 65,
							left: fieldSpec.left + fieldSpec.width / 3,
							background: "white",
							width: "25em",
							borderRadius: "10px"
						}}>
						{gameStat.timeRemaining > 0 ? (
							<h3>
								Score: {gameStat.score.A} - {gameStat.score.B} Time remaining:{" "}
								{gameStat.timeRemaining} s
							</h3>
						) : (
							<h3>
								Score: {gameStat.score.A} - {gameStat.score.B} Game Over
							</h3>
						)}
					</div>

					{Object.keys(gameStat.players).map(socketId => {
						return (
							<img
								key={socketId}
								src={`assets/soccer/dog${gameStat.players[socketId].team}left.gif`}
								style={{
									height: Math.floor(playerSpec.height * fieldSpec.width) * 1.4,
									width: Math.floor(playerSpec.width * fieldSpec.width) * 1.4,
									top: gameStat.players[socketId].pos.y,
									left: gameStat.players[socketId].pos.x,
									position: "absolute",
									border: socket.id === socketId ? "solid" : "none"
								}}></img>
						);
					})}
					<img
						src="assets/soccer/ball.png"
						style={{
							height: Math.floor(ballSpec.height * fieldSpec.width),
							width: Math.floor(ballSpec.width * fieldSpec.width),
							position: "absolute",
							top: gameStat.ball.y,
							left: gameStat.ball.x
						}}></img>
					{/* <img
            src="assets/soccer/ANIME.png"
            style={{
              position: "absolute",
              top: Math.floor(
                ((1 - goalSize) / 2) * fieldSpec.height + fieldSpec.top
              ),
              left: fieldSpec.left + fieldSpec.width,
              height: Math.floor(goalSize * fieldSpec.height)
            }}
          ></img> */}
					{flagged && (
						<img
							src="assets/soccer/pin.png"
							style={{
								width: pinSpec.width,
								height: pinSpec.height,
								top: mousing.y - pinSpec.height,
								left: mousing.x - pinSpec.width / 2,
								position: "absolute",
								border: "solid"
							}}></img>
					)}
				</div>
			)}
			<img src="assets/soccer/background.jpg" />
		</div>
	);
}

//=============================================================

const useMouseClick = function(fieldSpec) {
	const [mousing, setMousing] = useState({ x: null, y: null });
	const handleMouseUp = function(event) {
		if (
			event.pageX >= fieldSpec.left &&
			event.pageX <= fieldSpec.left + fieldSpec.width &&
			event.pageY >= fieldSpec.top &&
			event.pageY <= fieldSpec.top + fieldSpec.height
		) {
			setMousing({ x: event.pageX, y: event.pageY });
		}
	};
	useEffect(() => {
		window.addEventListener("mouseup", handleMouseUp);
		return () => {
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);
	return mousing;
};
