const updateSoccerGame = require("./updateSoccerGame");

const startGame = function(soccerData, data, sockets) {
  soccerData[data.room].interval = setInterval(() => {
    updateSoccerGame(soccerData[data.room]);
    sockets
      .to(data.room)
      .emit("soccerUpdateGame", allPos(soccerData, data.room));
  }, data.config.frameDuration * 1000);
};

//tells the clients where all the players are.
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

module.exports = startGame;
