import React, { useEffect, useState } from "react";
import useKeyPress from "../../helpers/useKeyPress";

export default function EggCatch({ socket }) {
	const tempRoom = "eggCatchTest";
	const eggSpec = { width: 0.07, height: 0.07 };
	const playerSpec = { width: 0.1, height: 0.1 };

	const background = { height: 800, width: 1000, top: 150, left: 50 };
	//------------Game Initialization-----------
	const [spritePos, setSpritePos] = useState(null);

	//console.log('eggcatch client initialized')
	useEffect(() => {
		console.log("emitting things");
		socket.emit("eggCatchInit", {
			room: tempRoom,
			background,
			eggSpec
		});
		socket.on("eggCatchGetPlayerPosition", data => {
			setSpritePos(data);
			//console.log(data);
			//console.log(spritePos, "HERERHERERER");
		});
		return () => {
			console.log("Unmonting egg game");
			socket.removeListener("eggCatchGetPlayerPosition");
			socket.emit("eggGameDisconnect", tempRoom);
		};
	}, []);

	const a = useKeyPress("a");
	const d = useKeyPress("d");

	useEffect(() => {
		socket.emit("updatEggPlayerDirection", {
			axis: "x",
			dir: a ? (d ? "" : "left") : d ? "right" : "",
			room: tempRoom
		});
	}, [a, d]);

	return (
		<>
			{spritePos &&
				Object.keys(spritePos.players).map(socketId => {
					return (
						<img
							key={socketId}
							src="assets/eggCatch/chansey.png"
							style={{
								height: Math.floor(playerSpec.height * background.width),
								width: Math.floor(playerSpec.width * background.width),
								left: spritePos.players[socketId].x,
								top: 400,
								position: "absolute"
							}}
						></img>
					);
				})}
		</>
	);
}
