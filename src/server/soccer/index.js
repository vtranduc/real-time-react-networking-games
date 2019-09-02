const {
  roomInitialSetUp,
  initializeNewPlayer
} = require("./initializeNewPlayerRoom");
const startGame = require("./startGame");

const soccerGame = function(socket, sockets, rooms, soccerData) {
  console.log("this is a soccer game");
  socket.on("soccerHandleKeyPress", data => {
    // console.log("data has been received: ", data);
    try {
      soccerData[data.room].players[socket.id].commands[data.axis] = data.dir;
      console.log(
        "Command from ",
        socket.id,
        "is: ",
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
      soccerData[data.room] = roomInitialSetUp(data);
      // --- Start the game here ---
      startGame(soccerData, data, sockets);
    }
    soccerData[data.room].players[socket.id] = initializeNewPlayer(data);
  });

  // ==============ALL THE DISCONNECTIONS==============================

  socket.on("soccerDisconnect", room => {
    // if (soccerData[room] && soccerData[room].players[socket.id]) {
    socket.leave(room);
    if (soccerData[room]) {
      if (soccerData[room].players[socket.id]) {
        delete soccerData[room].players[socket.id];
      }
      console.log("deleted: " + socket.id + ": ", soccerData);
      console.log("Remaining users: ", Object.keys(soccerData[room].players));
      if (Object.keys(soccerData[room].players).length === 0) {
        // clearInterval(431241242);
        clearInterval(soccerData[room].interval);
        delete soccerData[room];
        console.log("Deleted the entire room!");
      }
    }
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

module.exports = soccerGame;
