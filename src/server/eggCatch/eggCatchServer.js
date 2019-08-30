let getRandomInt = require("../../helpers/getRandomInt");
let playerCount = 0;
let intervalCount = 0;
let playerPosDefault = 200;



const eggCatch = function(socket, sockets, rooms, gameData) {
	socket.on("updatEggPlayerDirection", data => {
		// console.log("data has been received: ", data);
		try {
			console.log("LLLOOOOOK HERERRER", gameData[data.room].players);
			gameData[data.room].players[socket.id].commands[data.axis] = data.dir;
			// console.log(
			// 	"current command for egg is: ",
			// 	gameData[data.room].players[socket.id].commands
			// );
		} catch (error) {
			console.log("Room is not ready!");
		}
	});
	socket.on("eggCatchInit", data => {
		console.log(`user ${socket.id} has joined the Egg room`);
		//console.log(`current users in eggRoom: ${gameData[data.room].players}`);
		socket.join(data.room);
		playerCount++;
		if (!gameData[data.room]) {
			gameData[data.room] = {
				config: { frameDuration: 0.1 },
				players: {},

                interval: null,
                eggs: {
				egg1: {
					pos: {
						x: getRandomInt(
							data.background.left,
							data.background.left + data.background.width
						),
						y: data.background.top
					}
                }
            }
            };
            //------Start the game------------
		gameData[data.room].interval = setInterval(() => {
            
            intervalCount++;

            console.log(gameData[data.room].eggs.egg1.pos)
			// if (playerCount == 4) {
                
			// 	dropEggs();
			// }
			updatePlayerPositions(gameData[data.room]);
			//console.log("setInterval server egg")
			//console.log(getPos(gameData, data.room));
			// console.log(data.room)
			sockets
				.to(data.room)
				.emit("eggCatchGetPlayerPosition", getPos(gameData, data.room));
		}, gameData[data.room].config.frameDuration * 1000);
		//----------------------------------
		}
		gameData[data.room].players[socket.id] = {
			playerNumber: playerCount,
			pos: {
				x: 0,
				y: 0
			},
			commands: { x: "", y: "" }
		};
		console.log(socket.id, " has been added to database");
		
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
        //playerCount --
	});

	socket.on("disconnect", () => {
		//------------literals
		const room = "eggCatchTest";
		//------------literals
		if (gameData[room] && gameData[room].players[socket.id]) {
            
            delete gameData[room].players[socket.id];
            
			if (Object.keys(gameData[room].players).length === 0) {
				clearInterval(gameData[room].interval);
				delete gameData[room];
				console.log("deleted eggRoom");
			}
        }
        //playerCount --
	});
};

function updatePlayerPositions(roomData) {
    
         for (let socketId in roomData.players) {
        
		switch (roomData.players[socketId].playerNumber) {
			case 1:
				if (roomData.players[socketId].commands.x == "left") {
					console.log(`player 1 has held the left button`);
					roomData.players[socketId].pos.x = playerPosDefault -50;
				} else if (roomData.players[socketId].commands.x == "right") {
					console.log(`player 1 has held the right button`);
					roomData.players[socketId].pos.x = playerPosDefault + 50;
				} else {
					roomData.players[socketId].pos.x = playerPosDefault ;
				}
				break;
			case 2:
				if (roomData.players[socketId].commands.x == "left") {
					console.log(`player 2 has held the left button`);
					roomData.players[socketId].pos.x = playerPosDefault + 150;
				} else if (roomData.players[socketId].commands.x == "right") {
					console.log(`player 2 has held the right button`);
					roomData.players[socketId].pos.x = playerPosDefault + 250;
				} else {
					roomData.players[socketId].pos.x = playerPosDefault + 200;
				}
				break;
			case 3:
				if (roomData.players[socketId].commands.x == "left") {
					console.log(`player 3 has held the left button`);
					roomData.players[socketId].pos.x = playerPosDefault + 350;
				} else if (roomData.players[socketId].commands.x == "right") {
					console.log(`player 3 has held the right button`);
					roomData.players[socketId].pos.x = playerPosDefault + 450;
				} else {
					roomData.players[socketId].pos.x = playerPosDefault + 400;
				}
				break;
			case 4:
				if (roomData.players[socketId].commands.x == "left") {
					console.log(`player 4 has held the left button`);
					roomData.players[socketId].pos.x = playerPosDefault + 550;
				} else if (roomData.players[socketId].commands.x == "right") {
					console.log(`player 4 has held the right button`);
					roomData.players[socketId].pos.x =playerPosDefault + 650;
				} else {
					roomData.players[socketId].pos.x = playerPosDefault + 600;
				}
				break;
		}
        }
	}   
	


function dropEggs(difficultyRank, egg) {
	if (intervalCount % difficultyRank == 0) {
        
	}
}

function getPos(gameData, room) {
	let output = {
		eggs: {egg1: gameData[room].eggs.egg1.pos},
		players: {}
	};
	for (let socketId in gameData[room].players) {
		output.players[socketId] = gameData[room].players[socketId].pos;
	}
	return output;
}

module.exports = eggCatch;
