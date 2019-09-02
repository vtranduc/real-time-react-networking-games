const updatePlayerPositions = require("./updateEggCatch");

const startEggCatch = function(
  gameData,
  data,
  intervalCount,
  playerPosDefault,
  sockets
) {
  gameData[data.room].interval = setInterval(() => {
    intervalCount++;

    console.log(gameData[data.room].eggs.egg1.pos);
    // if (playerCount == 4) {

    // 	dropEggs();
    // }
    updatePlayerPositions(gameData[data.room], playerPosDefault);
    //console.log("setInterval server egg")
    //console.log(getPos(gameData, data.room));
    // console.log(data.room)
    sockets
      .to(data.room)
      .emit("eggCatchGetPlayerPosition", getPos(gameData, data.room));
  }, gameData[data.room].config.frameDuration * 1000);
};

function getPos(gameData, room) {
  let output = {
    eggs: { egg1: gameData[room].eggs.egg1.pos },
    players: {}
  };
  for (let socketId in gameData[room].players) {
    output.players[socketId] = gameData[room].players[socketId].pos;
  }
  return output;
}

module.exports = startEggCatch;
