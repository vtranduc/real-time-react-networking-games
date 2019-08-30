let getRandomInt = require("../../helpers/getRandomInt");

const initializeEggCatchRoom = function(data) {
  return {
    config: {
      frameDuration: 0.1,
      accel: 100,
      eggSize: {
        width: Math.floor(data.eggSpec.width * data.background.width),
        height: Math.floor(data.eggSpec.height * data.background.width)
      }
    },
    players: {},

    interval: null,
    eggs: {
      egg1: {
        pos: {
          x: "right",
          y: data.background.top
        },
        type: "bomb",
        vel: 0
      }
    }
  };
};

const initializeEggCatchPlayer = function(playerCount) {
  return {
    playerNumber: playerCount,
    pos: {
      x: 0,
      y: 0
    },
    commands: { x: "", y: "" }
  };
};

module.exports = { initializeEggCatchRoom, initializeEggCatchPlayer };
