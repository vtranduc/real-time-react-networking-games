const world = function(io, socket, sockets, rooms, worldData) {
  socket.on("disconnect", data => {
    console.log(`A user has been disconnected: ${data}`);
    socket.broadcast
      .to("worldGameRoom")
      .emit("worldCleanup", { socketID: socket.id });
  });
  socket.join("worldGameRoom");
  socket.on("worldRequestPlayers", data => {
    io.to(data.socketID).emit(
      "worldLoadPlayers",
      io.sockets.adapter.rooms[data.room].sockets
    );
    socket.broadcast.to(data.room).emit("worldInsertPlayer", data.socketID);
  });

  socket.on("worldUpdatePlayerPosition", movementInfo => {
    socket.broadcast
      .to("worldGameRoom")
      .emit("worldUpdatePlayerPosition", movementInfo);
  });

  socket.on("worldDestroyPlayer", player => {
    console.log("LOOK HEREREE", player);
    console.log("DESTROYING PLAYER", player);
    console.log("LOOK HEREREE", player);
    socket.broadcast
      .to("worldGameRoom")
      .emit("worldCleanup", { socketID: socket.id });
  });

  socket.on("worldReceiveMsg", data => {
    console.log("message received is: ", data);
    // sockets.to("worldGameRoom").emit("worldShowBubble");
    sockets
      .to(data.room)
      .emit("worldShowBubble", { socketId: socket.id, msg: data.msg });
  });
};

module.exports = world;
