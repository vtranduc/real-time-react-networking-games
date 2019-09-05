const rockPaperScissorsGame = function(socket, sockets, rps, io) {
  console.log("readying server for RPS game!");

  // socket.on();
  socket.on("rpsInitialize", data => {
    console.log("initializing rock paper scissors game on the server!");
    if (!rps[data.room]) {
      console.log("create a room then!");
      rps[data.room] = rpsInitializeRoom();
      console.log(rps[data.room]);
    }
    // console.log("FIRE!");
    rps[data.room].players[socket.id] = rpsInitializePlayer();
    socket.join(data.room);
    sockets.to(data.room).emit("rpsSetUp", rps[data.room]);
  });
};

module.exports = rockPaperScissorsGame;

const rpsInitializeRoom = function() {
  return { players: {}, chats: [] };
};

const rpsInitializePlayer = function() {
  return {};
};
