// const getLobbyStatus = require("../helpers/getRooms");

const lobby = function(socket, sockets, rooms, gameData, io) {
  console.log("initializing lobby");

  socket.on("lobbyConnect", () => {
    socket.join("lobby");
    sockets.to("lobby").emit("lobbyUpdate", getLobbyStatus(gameData));
  });

  socket.on("lobbyJoinLeaveRoom", data => {
    console.log("A user has joined the room!", data);
    leaveAllRooms(gameData, socket.id);
    if (data) {
      gameData[data.game].lobby[data.room].players[socket.id] = {};
    }
    sockets.to("lobby").emit("lobbyUpdate", getLobbyStatus(gameData));
  });

  //========================================
  socket.on("lobbyDisconnect", () => {
    console.log("leaving lobby", socket.id);
    socket.leave("lobby");
    leaveAllRooms(gameData, socket.id);
    sockets.to("lobby").emit("lobbyUpdate", getLobbyStatus(gameData));
  });
  socket.on("disconnect", () => {
    console.log("A client has left the lobby: ", socket.id);
    leaveAllRooms(gameData, socket.id);
    sockets.to("lobby").emit("lobbyUpdate", getLobbyStatus(gameData));
  });
  //=========================================
};

module.exports = lobby;

const getLobbyStatus = function(gameData) {
  let output = {};
  for (let game in gameData) {
    output[game] = gameData[game].lobby;
  }
  return output;
};

const leaveAllRooms = function(gameData, socketId) {
  for (let game in gameData) {
    for (let room in gameData[game].lobby) {
      if (Object.keys(gameData[game].lobby[room].players).includes(socketId)) {
        delete gameData[game].lobby[room].players[socketId];
      }
    }
  }
};
