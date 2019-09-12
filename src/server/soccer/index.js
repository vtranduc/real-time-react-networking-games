const {
  roomInitialSetUp,
  initializeNewPlayer
} = require("./initializeNewPlayerRoom");
const startGame = require("./startGame");

const soccerGame = function(socket, sockets, rooms, soccerData, io) {
  // console.log("this is a soccer game");
  socket.on("soccerHandleKeyPress", data => {
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
    if (
      !soccerData[data.room] ||
      Object.keys(soccerData[data.room]).length === 0
    ) {
      soccerData[data.room] = roomInitialSetUp(data);
      // --- Start the game here ---
      startGame(soccerData, data, sockets, io);
    }
    soccerData[data.room].players[socket.id] = initializeNewPlayer(
      data,
      assignTeam(soccerData[data.room], data.playerSpec.team),
      soccerData[data.room].config.midField
    );
    sockets.to(data.room).emit("soccerGetChat", soccerData[data.room].chats);
  });

  socket.on("soccerApplyBrake", data => {
    if (soccerData[data.room]) {
      soccerData[data.room].players[socket.id].brake = data.brake;
    } else {
      console.log("Room not ready!");
    }
  });

  socket.on("soccerChaseBall", data => {
    if (soccerData[data.room]) {
      soccerData[data.room].players[socket.id].chase = data.chase;
    } else {
      console.log("Room not ready!");
    }
  });

  socket.on("soccerAim", data => {
    if (soccerData[data.room]) {
      soccerData[data.room].players[socket.id].aim = data.aim;
    } else {
      console.log("Room not ready!");
    }
  });

  socket.on("soccerReceiveChat", data => {
    if (soccerData[data.room]) {
      soccerData[data.room].chats.unshift({
        key: `soccer${data.room}${soccerData[data.room].chats.length + 1}`,
        user: data.username,
        msg: data.msg,
        avatar: data.avatar
      });
      sockets.to(data.room).emit("soccerGetChat", soccerData[data.room].chats);
    } else {
      console.log("Room not ready!");
    }
  });

  // ==============ALL THE DISCONNECTIONS==============================

  socket.on("soccerDisconnect", room => {
    socket.leave(room);
    if (soccerData[room]) {
      if (soccerData[room].players[socket.id]) {
        delete soccerData[room].players[socket.id];
      }
      console.log("deleted: " + socket.id + ": ", soccerData);
      console.log("Remaining users: ", Object.keys(soccerData[room].players));
      if (Object.keys(soccerData[room].players).length === 0) {
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

const assignTeam = function(roomData, requestedTeam) {
  if (requestedTeam === "A" || requestedTeam === "B") {
    return requestedTeam;
  } else {
    const playerCount = { A: 0, B: 0 };
    for (let socketId in roomData.players) {
      playerCount[roomData.players[socketId].team] += 1;
    }
    return playerCount.A <= playerCount.B ? "A" : "B";
  }
};

module.exports = soccerGame;
