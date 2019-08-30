const startEggCatch = require("./startEggCatch");

let playerCount = 0;
let intervalCount = 0;
let playerPosDefault = 200;
let {
  initializeEggCatchRoom,
  initializeEggCatchPlayer
} = require("./initializeEggCatch");

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
      gameData[data.room] = initializeEggCatchRoom(data);
      //------Start the game------------
      // gameData[data.room].interval =
      startEggCatch(gameData, data, intervalCount, playerPosDefault, sockets);
      //----------------------------------
    }
    gameData[data.room].players[socket.id] = initializeEggCatchPlayer(
      playerCount
    );
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

module.exports = eggCatch;
