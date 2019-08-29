let getRandomInt = require("../../helpers/getRandomInt");

const soccerGame = function(socket, sockets, rooms, soccerData) {
	console.log("this is a soccer game");
	socket.on("soccerHandleKeyPress", data => {
		// console.log("data has been received: ", data);
		try {
			soccerData[data.room].players[socket.id].commands[data.axis] = data.dir;
			console.log(
				"current command is: ",
				soccerData[data.room].players[socket.id].commands
			);
		} catch (error) {
			console.log("Room is not ready!");
		}
	});
	socket.on("soccerInit", data => {
		console.log("A user has joined the room: ", socket.id);
		socket.join(data.room);
		if (!soccerData[data.room]) {
			soccerData[data.room] = {
				config: {
					frameDuration: data.fieldSpec.frameDuration,
					playerPhysics: data.playerPhysics
				},
				players: {},
				interval: null,
				ball: {
					pos: {
						x: getRandomInt(
							data.fieldSpec.left,
							data.fieldSpec.left + data.fieldSpec.width
						),
						y: data.fieldSpec.top
					}
				}
			};
			//----Start the game-------
			soccerData[data.room].interval = setInterval(() => {
				updateSoccerGame(soccerData[data.room]);
				// console.log("updating");
				sockets
					.to(data.room)
					.emit("soccerUpdateGame", allPos(soccerData, data.room));
			}, data.config.frameDuration * 1000);
			//---------------------------
		}

		soccerData[data.room].players[socket.id] = {
			pos: {
				x: getRandomInt(
					data.fieldSpec.left,
					data.fieldSpec.left + data.fieldSpec.width
				),
				y: data.fieldSpec.top
			},
			commands: { x: "", y: "" }
		};
	});

	// ==============ALL THE DISCONNECTIONS==============================

	socket.on("soccerDisconnect", room => {
		// if (soccerData[room] && soccerData[room].players[socket.id]) {
		socket.leave(room);
		delete soccerData[room].players[socket.id];
		console.log("deleted: " + socket.id + ": ", soccerData);
		console.log("Remaining users: ", Object.keys(soccerData[room].players));
		if (Object.keys(soccerData[room].players).length === 0) {
			clearInterval(soccerData[room].interval);
			delete soccerData[room];
			console.log("Deleted the entire room!");
		}
		// }
	});

	socket.on("disconnect", () => {
		//----------------------Literals
		const room = "testingSoccer";
		//----------------------
		if (soccerData[room] && soccerData[room].players[socket.id]) {
			delete soccerData[room].players[socket.id];
			console.log("deleted: " + socket.id + ": ", soccerData);
			console.log("Remaining users: ", Object.keys(soccerData[room].players));
			if (Object.keys(soccerData[room].players).length === 0) {
				clearInterval(soccerData[room].interval);
				delete soccerData[room];
				console.log("Deleted the entire room!");
			}
		}
	});
};

const updateSoccerGame = function(roomData) {
	for (let socketId in roomData.players) {
		if (roomData.players[socketId].commands.x === "right") {
			roomData.players[socketId].pos.x += 5;
			console.log("yooooo");
		} else if (roomData.players[socketId].commands.x === "left") {
			roomData.players[socketId].pos.x -= 5;
		} else if (roomData.players[socketId].commands.x === "") {
			// roomData.players[socketId].pos.x += 5;
		}
		if (roomData.players[socketId].commands.y === "up") {
			roomData.players[socketId].pos.y -= 5;
		} else if (roomData.players[socketId].commands.y === "down") {
			roomData.players[socketId].pos.y += 5;
		} else if (roomData.players[socketId].commands.y === "") {
			// roomData.players[socketId].pos.x += 5;
		}
	}
};

const displacement = function(vi, accel, time) {
	return vi * time + 0.5 * accel * time * time;
};

//tells the clients where all the players are.
const allPos = function(soccerData, room) {
	let output = {
		ball: soccerData[room].ball.pos,
		players: {}
	};
	for (let socketId in soccerData[room].players) {
		output.players[socketId] = soccerData[room].players[socketId].pos;
	}
	return output;
};

module.exports = soccerGame;
