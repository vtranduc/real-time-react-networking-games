const soccerGame = function(socket, sockets, rooms, soccerData) {
  console.log("this is a soccer game");
  socket.on("soccerHandleKeyPress", data => {
    // console.log("data has been received: ", data);
  });
  socket.on("soccerInit", data => {
    console.log("A user has joined the room: ", socket.id);
    if (!soccerData[data.room]) {
      soccerData[data.room] = {
        config: {},
        players: {},
        interval: null,
        ball: {}
      };
    }
    socket.join(data.room);
    soccerData[data.room].players[socket.id] = {
      pos: { x: data.fieldSpec.left, y: data.fieldSpec.top }
    };
    soccerData[data.room].ball = {
      pos: { x: data.fieldSpec.left, y: data.fieldSpec.top }
    };
    console.log("gamedata: ", soccerData);
    sockets
      .to(data.room)
      .emit("soccerUpdateGame", allPos(soccerData, data.room));
  });

  // ==============ALL THE DISCONNECTIONS==============================

  socket.on("soccerDisconnect", room => {
    // if (soccerData[room] && soccerData[room].players[socket.id]) {
    socket.leave(room);
    delete soccerData[room].players[socket.id];
    console.log("deleted: " + socket.id + ": ", soccerData);
    console.log("Remaining users: ", Object.keys(soccerData[room].players));
    if (Object.keys(soccerData[room].players).length === 0) {
      delete soccerData[room];
      console.log("Deleted the entire room!");
    }
    // }
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
        delete soccerData[room];
        console.log("Deleted the entire room!");
      }
    }
  });
};

const allPos = function(soccerData, room) {
  let output = {
    ball: soccerData[room].ball.pos,
    players: {}
  };
  for (let socketId in soccerData[room].players) {
    output.players[socketId] = soccerData[room].players[socketId].pos;
  }
  return output;
};

module.exports = soccerGame;
