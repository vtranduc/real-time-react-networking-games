const updateSoccerGame = require("./updateSoccerGame");

const startGame = function(soccerData, data, sockets, io) {
  soccerData[data.room].interval = setInterval(() => {
    updateSoccerGame(soccerData[data.room], io);
    if (soccerData[data.room].timeRemaining > 0) {
      // ACTUALLY CLEAR THE INTERVAL HERE!!!
      soccerData[data.room].timeRemaining -= data.config.frameDuration;
    }
    sockets
      .to(data.room)
      .emit("soccerUpdateGame", allStat(soccerData[data.room]));
  }, data.config.frameDuration * 1000);
};

const allStat = function(roomData) {
  let output = {
    timeRemaining: Math.ceil(roomData.timeRemaining * 100) / 100,
    score: roomData.score,
    ball: roomData.ball.pos,
    players: {}
  };
  for (let socketId in roomData.players) {
    output.players[socketId] = {
      team: roomData.players[socketId].team,
      pos: roomData.players[socketId].pos
    };
  }
  return output;
};

module.exports = startGame;
