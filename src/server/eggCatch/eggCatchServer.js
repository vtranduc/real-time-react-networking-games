let getRandomInt = require("../../helpers/getRandomInt");

const eggCatch = function(socket, sockets, rooms, gameData) {
	socket.on("eggCatchInit", data => {
		console.log(`user ${socket.id} has joined the Egg room`);

		socket.join(data.room);
		if (!gameData[data.room]) {
			gameData[data.room] = {
				config: { frameDuration: 0.1 },
				players: {},
				interval: null,
				egg: {
					pos: {
						x: getRandomInt(
							data.background.left,
							data.background.left + data.background.width
						),
						y: data.background.top
					}
				}
			};
			//------Start the game------------
			gameData[data.room].interval = setInterval(() => {
				updatePlayerPositions(gameData[data.room]);
				//console.log("setInterval server egg")
				console.log(getPos(gameData, data.room));
				// console.log(data.room)
				sockets
					.to(data.room)
					.emit("eggCatchGetPlayerPosition", getPos(gameData, data.room));
			}, gameData[data.room].config.frameDuration * 1000);
			//----------------------------------
			gameData[data.room].players[socket.id] = {
				pos: {
					x: getRandomInt(
						data.background.left,
						data.background.left + data.background.width
					),
					y: data.background.top
				},
				commands: { x: "", y: "" }
			};
		}
	});

	socket.on("updatEggPlayerDirection", data => {
		// console.log("data has been received: ", data);
		try {
			gameData[data.room].players[socket.id].commands[data.axis] = data.dir;
			console.log(
				"current command for egg is: ",
				gameData[data.room].players[socket.id].commands
			);
		} catch (error) {
			console.log("Room is not ready!");
		}
	});

	socket.on("eggGameDisconnect", room => {
		if (gameData[room] && gameData[room].players[socket.id]) {
			socket.leave(room);
			delete gameData[room].players[socket.id];
			console.log("deleted: " + socket.id + ": ", gameData);
			console.log("remaining users: ", Object.keys(gameData[room].players));
			if (Object.keys(gameData[room].players).length === 0) {
				clearInterval(gameData[room].interval);
				delete gameData[room];
				console.log("deleted entire egg room");
			}
		}
	});

	socket.on("disconnect", () => {
		//------------literals
		const room = "eggCatchTest";
		//------------literals
		if (gameData[room] && gameData[room].players[socket.id]) {
			delete gameData[room].players[socket.id];
			if (Object.keys(gameData[room].players.length === 0)) {
				clearInterval(gameData[room].interval);
				delete gameData[room];
				console.log("deleted eggRoom");
			}
		}
	});
};

function updatePlayerPositions(roomData) {
	for (let socketId in roomData.players) {
		if (roomData.players[socketId].commands.x == "left") {
			roomData.players[socketId].pos.x = 900;
		} else {
			roomData.players[socketId].pos.x = 600;
		}
	}
}

function getPos(gameData, room) {
	let output = {
		egg: gameData[room].egg.pos,
		players: {}
	};
	for (let socketId in gameData[room].players) {
		output.players[socketId] = gameData[room].players[socketId].pos;
	}
	return output;
}

module.exports = eggCatch;
