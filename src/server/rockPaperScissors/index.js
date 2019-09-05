const rockPaperScissorsGame = function(socket, sockets, rps, io) {
  // console.log("readying server for RPS game!");

  // socket.on();
  socket.on("rpsInitialize", data => {
    // console.log("initializing rock paper scissors game on the server!");
    if (!rps[data.room]) {
      // console.log("create a room then!");
      rps[data.room] = rpsInitializeRoom();
      // console.log(rps[data.room]);
    }
    rps[data.room].players[socket.id] = rpsInitializePlayer(
      Object.keys(rps[data.room].players).length + 1
    );
    socket.join(data.room);
    if (Object.keys(rps[data.room].players).length >= data.nPlayers)
      updateRpsGame(sockets, rps[data.room], data.room);
  });

  socket.on("rpsReceiveResponse", data => {
    // console.log("they have given this!", data);
    try {
      rps[data.room].players[socket.id].response = data.choice;
      updateRpsGame(sockets, rps[data.room], data.room);
    } catch (error) {
      console.log("Room is not ready!");
    }
  });

  socket.on("rpsGetReady", data => {
    // console.log("getting ready");
    rps[data.room].players[socket.id].readyForNextGame = true;
    if (
      Object.keys(rps[data.room].players).length ===
      Object.keys(rps[data.room].players).filter(
        player => rps[data.room].players[player].readyForNextGame
      ).length
    ) {
      // console.log("GO TO NEXT GAME NOW");
      Object.keys(rps[data.room].players).forEach(player => {
        rps[data.room].players[player].response = "";
      });
      rps[data.room].status.stage = "awaiting";
      sockets.to(data.room).emit(
        "rpsUpdate",
        rpsGetStat({
          ...rps[data.room],
          status: { ...rps[data.room].status, switchStage: true }
        })
      );
    } else {
      sockets.to(data.room).emit("rpsUpdate", rpsGetStat(rps[data.room]));
    }
  });

  //-------DISCONNECT HANDLING------------

  socket.on("rpsDisconnect", room => {
    socket.leave(room);
    if (rps[room]) {
      if (rps[room].players[socket.id]) {
        delete rps[room].players[socket.id];
      }
      if (Object.keys(rps[room].players).length === 0) {
        delete rps[room];
        // console.log("the entire has been destroyed!");
      } else {
        // console.log("MAKINA");
        // console.log("before", rps[room].players);
        rpsUpdateId(rps[room].players);
        // console.log("after", rps[room].players);
        updateRpsGame(sockets, rps[room], room);
      }
    }
  });

  socket.on("disconnect", () => {
    //----------------------Literals FIXXXXXXXXXXXXX
    const room = "testRockPaperScissors123qweasd";
    //----------------------
    if (rps[room] && rps[room].players[socket.id]) {
      delete rps[room].players[socket.id];
      if (Object.keys(rps[room].players).length === 0) {
        delete rps[room];
        // console.log("Delted the entire room in Rock Paper Scissor!");
      } else {
        rpsUpdateId(rps[room].players);
        updateRpsGame(sockets, rps[room], room);
      }
    }
  });
};

module.exports = rockPaperScissorsGame;

const updateRpsGame = function(sockets, roomData, room) {
  // console.log("Must update game here!");
  // console.log(roomData);

  const responses = Object.keys(roomData.players).map(player => {
    return roomData.players[player].response;
  });
  if (!responses.includes("")) {
    // console.log("WINNING CHOICE IS: ", determineWinningChoice(responses));
    roomData.status.winner = determineWinningChoice(responses);
    roomData.status.stage = "show";
    for (let player in roomData.players) {
      roomData.players[player].readyForNextGame = false;
      if (roomData.players[player].response === roomData.status.winner) {
        roomData.players[player].score++;
      }
    }
    sockets.to(room).emit(
      "rpsUpdate",
      rpsGetStat({
        ...roomData,
        status: { ...roomData.status, switchStage: true }
      })
    );
  } else {
    sockets.to(room).emit("rpsUpdate", rpsGetStat(roomData));
  }
};

const determineWinningChoice = function(responses) {
  return responses.includes("rock")
    ? responses.includes("paper")
      ? responses.includes("scissor")
        ? null
        : "paper"
      : responses.includes("scissor")
      ? "rock"
      : null
    : responses.includes("paper")
    ? responses.includes("scissor")
      ? "scissor"
      : null
    : null;
};

const rpsGetStat = function(roomData) {
  output = {
    players: {},
    chats: roomData.chats,
    status: roomData.status
  };
  for (let player in roomData.players) {
    output.players[player] = {
      response:
        output.status.stage === "awaiting"
          ? roomData.players[player].response
            ? true
            : false
          : roomData.players[player].response,
      score: roomData.players[player].score,
      id: roomData.players[player].id
    };
  }
  return output;
};

const rpsInitializeRoom = function() {
  return {
    players: {},
    chats: [],
    status: { stage: "awaiting", winner: "", switchStage: false }
  };
};

const rpsInitializePlayer = function(id) {
  return { id: id, response: "", score: 0, readyForNextGame: null };
};

const rpsUpdateId = function(players) {
  let previousId = 0;
  let newId = 0;
  for (let i = 1; i <= Object.keys(players).length; i++) {
    previousId++;
    newId++;
    while (
      !Object.keys(players).find(player => players[player].id === previousId)
    ) {
      console.log("THIS GUY IS DELTED: ", previousId);
      previousId++;
    }
    players[
      Object.keys(players).find(player => players[player].id === previousId)
    ].id = newId;

    // })
  }
};
