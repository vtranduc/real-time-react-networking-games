const lobby = function(socket, sockets, rooms, gameData, io) {
  console.log("initializing lobby");

  socket.on("lobbyConnect", () => {
    console.log("whatever you get");
    socket.join("lobby");
    sockets.to("lobby").emit("lobbySetup", {
      soccer: Object.keys(gameData.soccer),
      eggCatch: Object.keys(gameData.eggCatch),
      world: Object.keys(gameData.world)
    });
  });

  socket.on("lobbyDisconnect", () => {
    console.log("leaving lobby", socket.id);
    socket.leave("lobby");
  });
  socket.on("disconnect", () => {});
};

module.exports = lobby;
