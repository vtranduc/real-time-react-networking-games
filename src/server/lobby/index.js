const lobby = function(socket, sockets, gameData, io) {
  socket.on("lobbyConnect", () => {
    socket.join("lobby");
    sockets.to("lobby").emit("lobbyUpdate", getLobbyStatus(gameData));
  });

  socket.on("lobbyJoinLeaveRoom", data => {
    leaveAllRooms(gameData, socket.id);
    if (data) {
      gameData[data.game].lobby[data.room].players[socket.id] = getPlayerStat(
        data.username,
        data.avatar
      );
    }
    sockets.to("lobby").emit("lobbyUpdate", getLobbyStatus(gameData));
  });

  socket.on("lobbyReceiveChat", data => {
    // console.log("has reived herEEEEEEEEEEEEEEEEee", data);
    gameData[data.game].lobby[data.room].chats.unshift({
      key: `${data.game}${data.room}${gameData[data.game].lobby[data.room].chats
        .length + 1}`,
      user: data.user,
      msg: data.msg,
      avatar: data.avatar
    });
    sockets.to("lobby").emit("lobbyUpdate", getLobbyStatus(gameData));
  });

  socket.on("lobbyCreateRoom", data => {
    if (checkRoomAvaibility(gameData, data.room)) {
      gameData[data.game].lobby[data.room] = initializeLobbyRoom(data.passcode);
      const lobbyStat = getLobbyStatus(gameData);
      socket.broadcast.to("lobby").emit("lobbyUpdate", lobbyStat);
      io.to(socket.id).emit("lobbyRoomCreation", {
        lobbyStat: lobbyStat,
        room: data.room,
        game: data.game
      });
    } else {
      io.to(socket.id).emit("lobbyRoomCreation", false);
    }
  });

  socket.on("lobbyDeleteRoom", data => {
    console.log("DELETE THIS: ", data);
    delete gameData[data.game].lobby[data.room];
    sockets.to("lobby").emit("lobbyUpdate", getLobbyStatus(gameData));
  });

  socket.on("lobbySetReady", data => {
    try {
      gameData[data.game].lobby[data.room].players[socket.id].ready = true;
      sockets.to("lobby").emit("lobbyUpdate", getLobbyStatus(gameData));
    } catch (err) {
      console.log("Room is not ready!");
    }
  });

  socket.on("lobbyValidatePasscode", data => {
    if (data.passcode === gameData[data.game].lobby[data.room].status) {
      try {
        gameData[data.game].lobby[data.room].players[socket.id] = getPlayerStat(
          data.username,
          data.avatar
        );
        io.to(socket.id).emit("lobbyPasscodeValidation", {
          game: data.game,
          room: data.room
        });
        sockets.to("lobby").emit("lobbyUpdate", getLobbyStatus(gameData));
      } catch (err) {}
    } else {
      io.to(socket.id).emit("lobbyPasscodeValidation", false);
    }
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

const getPlayerStat = function(username, avatar) {
  return {
    ready: false,
    username: username,
    avatar: avatar
  };
};

const initializeLobbyRoom = function(passcode) {
  return { status: passcode, players: {}, chats: [] };
};

const checkRoomAvaibility = function(gameData, requestedName) {
  for (let game in gameData) {
    if (Object.keys(gameData[game].lobby).includes(requestedName)) {
      return false;
    }
    if (Object.keys(gameData[game]).includes(`${game}-${requestedName}`)) {
      return false;
    }
  }
  return true;
};

const getLobbyStatus = function(gameData) {
  let output = {};
  for (let game in gameData) {
    output[game] = {};
    for (let room in gameData[game].lobby) {
      output[game][room] = {
        ...gameData[game].lobby[room],
        status: gameData[game].lobby[room].status ? "closed" : "open"
      };
    }
  }
  return output;
};

const leaveAllRooms = function(gameData, socketId) {
  for (let game in gameData) {
    for (let room in gameData[game].lobby) {
      if (Object.keys(gameData[game].lobby[room].players).includes(socketId)) {
        delete gameData[game].lobby[room].players[socketId];
        if (
          Object.keys(gameData[game].lobby[room].players).length === 0 &&
          gameData[game].lobby[room].status
        ) {
          gameData[game].lobby[room].status = "";
        }
      }
    }
  }
};
