const world = function(io, socket, sockets, rooms, worldData) {
  socket.on("disconnect", data => {
    console.log(`A user has been disconnected: ${data}`);

    // ===================LITERAL================
    room = "worldGameRoom";
    // ==========================================
    socket.broadcast.to(room).emit("worldCleanup", { socketID: socket.id });
    if (worldData[room] && worldData[room].pos[socket.id]) {
      delete worldData[room].pos[socket.id];
      if (Object.keys(worldData[room].pos).length === 0) {
        console.log("CLEARING INTERVAL NOW");
        clearInterval(worldData[room].interval);
        delete worldData[room];
      }
    }
  });

  socket.on("worldDestroyPlayer", data => {
    socket.broadcast
      .to(data.room)
      .emit("worldCleanup", { socketID: socket.id });
    socket.leave(data.room);
    if (worldData[data.room]) {
      if (worldData[data.room].pos[socket.id]) {
        delete worldData[data.room].pos[socket.id];
      }
      if (Object.keys(worldData[data.room].pos).length === 0) {
        console.log("delete not by switching tab");
        clearInterval(worldData[room].interval);
        delete worldData[room];
      }
    }
  });

  //==========DESTROY ABOVE======================

  socket.on("worldRequestPlayers", data => {
    if (!worldData[data.room]) {
      // console.log("gotta GENERATE NEW ROOM HERE ");
      initializeWorldRoom(worldData, data.room);
      // console.log(worldData);
      worldStartGame(worldData, data.room, sockets);
    }
    initializeWorldPlayer(worldData[data.room], socket.id, data.startingPoint);
    // console.log(worldData);
    socket.join(data.room);
    io.to(socket.id).emit("worldLoadPlayers", worldData[data.room].pos);
    socket.broadcast.to(data.room).emit("worldInsertPlayer", {
      socketID: socket.id,
      startingPoint: data.startingPoint
    });
  });

  socket.on("worldUpdatePlayerPosition", movementInfo => {
    worldData[movementInfo.room].pos[socket.id] = movementInfo.xy;
  });

  // ========POSITIONS ABOVE======================

  socket.on("worldReceiveMsg", data => {
    console.log("message received is: ", data);
    // sockets.to("worldGameRoom").emit("worldShowBubble");
    sockets
      .to(data.room)
      .emit("worldShowBubble", { socketId: socket.id, msg: data.msg });
  });
};

module.exports = world; //--------------------------------------------------------------

const initializeWorldRoom = function(worldData, room) {
  worldData[room] = { interval: null, pos: {} };
};

const initializeWorldPlayer = function(roomData, socketId, startingPoint) {
  roomData.pos[socketId] = startingPoint;
};

const worldStartGame = function(worldData, room, sockets) {
  //===========FRAME RATE=============
  refreshRate = 100;
  //==================================
  worldData[room].interval = setInterval(() => {
    // console.log("just logging something");
    sockets.to(room).emit("worldUpdatePlayerPosition", worldData[room].pos);
  }, refreshRate);
};
