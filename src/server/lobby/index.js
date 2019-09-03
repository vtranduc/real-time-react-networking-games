const getRooms = require("../helpers/getRooms");

const lobby = function(socket, sockets, rooms, gameData, io) {
  console.log("initializing lobby");

  socket.on("lobbyConnect", () => {
    socket.join("lobby");
    sockets.to("lobby").emit("lobbyUpdate", getRooms(gameData));
  });

  //========================================
  socket.on("lobbyDisconnect", () => {
    console.log("leaving lobby", socket.id);
    socket.leave("lobby");
  });
  socket.on("disconnect", () => {
    console.log("A client has left the lobby: ", socket.id);
  });
  //=========================================
};

module.exports = lobby;
