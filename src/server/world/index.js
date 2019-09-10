const world = function(io, socket, sockets, rooms, worldData) {
  socket.on("disconnect", data => {
    console.log(`A user has been disconnected: ${data}`);
});
socket.join("worldGameRoom");
socket.on("worldRequestPlayers", data => {
    console.log(
        "LOOK HERE GOT DATA",
        io.sockets.adapter.rooms[data.room].sockets
    );
    io.to(data.socketID).emit(
        "worldLoadPlayers",
        io.sockets.adapter.rooms[data.room].sockets
    );
    socket.broadcast.to(data.room).emit("worldInsertPlayer", data.socketID);
});

socket.on("worldUpdatePlayerPosition", movementInfo => {
    console.log(movementInfo);
    socket.broadcast.to("worldGameRoom").emit("worldUpdatePlayerPosition", movementInfo);
});

};

module.exports = world;
