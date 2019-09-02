const getRandomInt = require("../../helpers/getRandomInt");

const roomInitialSetUp = function(data) {
  return {
    score: { A: 0, B: 0 },
    timeRemaining: data.config.gameTime,
    config: {
      frameDuration: data.config.frameDuration,
      size: {
        ball: {
          width: Math.floor(data.fieldSpec.width * data.ballSpec.width),
          height: Math.floor(data.fieldSpec.width * data.ballSpec.height)
        },
        player: {
          width: Math.floor(data.fieldSpec.width * data.playerSpec.width),
          height: Math.floor(data.fieldSpec.width * data.playerSpec.height)
        }
      },
      permittedRange: {
        player: {
          top: data.fieldSpec.top,
          left: data.fieldSpec.left,
          bottom:
            data.fieldSpec.top +
            data.fieldSpec.height -
            Math.floor(data.fieldSpec.width * data.playerSpec.height),
          right:
            data.fieldSpec.left +
            data.fieldSpec.width -
            Math.floor(data.fieldSpec.width * data.playerSpec.width)
        },
        ball: {
          top: data.fieldSpec.top,
          left: data.fieldSpec.left,
          bottom:
            data.fieldSpec.top +
            data.fieldSpec.height -
            Math.floor(data.fieldSpec.width * data.ballSpec.height),
          right:
            data.fieldSpec.left +
            data.fieldSpec.width -
            Math.floor(data.fieldSpec.width * data.ballSpec.width)
        }
      }
    },
    players: {},
    interval: null,
    ball: {
      pos: {
        x: getRandomInt(
          data.fieldSpec.left,
          data.fieldSpec.left +
            data.fieldSpec.width -
            Math.floor(data.fieldSpec.width * data.ballSpec.width)
        ),
        y: getRandomInt(
          data.fieldSpec.top,
          data.fieldSpec.top +
            data.fieldSpec.height -
            Math.floor(data.fieldSpec.width * data.ballSpec.height)
        )
      },
      vel: { x: 0, y: 0 },
      speed: 0,
      radius: Math.floor((data.fieldSpec.width * data.ballSpec.width) / 2),
      // resistance: {
      //   // DELETE THIS!
      //   x: Math.floor(data.ballPhysics.resistance.x * data.fieldSpec.width),
      //   y: Math.floor(data.ballPhysics.resistance.y * data.fieldSpec.width)
      // },
      accelFrictionalMag: Math.floor(
        data.ballPhysics.friction * data.fieldSpec.width
      ),
      accelFrictional: { x: 0, y: 0 },
      wallBounce: data.ballPhysics.wallBounce,
      bottomRight: { x: null, y: null }
    }
  };
};

const initializeNewPlayer = function(data) {
  return {
    pos: {
      x: getRandomInt(
        data.fieldSpec.left,
        data.fieldSpec.left + data.fieldSpec.width
      ),
      y: getRandomInt(
        data.fieldSpec.top,
        data.fieldSpec.top +
          data.fieldSpec.height -
          Math.floor(data.fieldSpec.width * data.playerSpec.height)
      )
    },
    vel: { x: 0, y: 0 },
    // maxAbsVel: {
    //   x: Math.floor(data.playerPhysics.maxAbsVel.x * data.fieldSpec.width),
    //   y: Math.floor(data.playerPhysics.maxAbsVel.y * data.fieldSpec.width)
    // },
    //------
    accel: {
      x: 0,
      y: 0
    },
    accelMag: Math.floor(data.playerPhysics.accelMag * data.fieldSpec.width),
    accelFrictionalMag: Math.floor(0.8 * data.fieldSpec.width),
    speed: 0,
    accelReverseMag: Math.floor(
      data.playerPhysics.accelReverseMag * data.fieldSpec.width
    ),
    accelFrictional: { x: 0, y: 0 },
    maxSpeed: Math.floor(data.playerPhysics.maxSpeed * data.fieldSpec.width),
    brake: false,
    chase: false,
    aim: null,
    //----
    // reverseAccel: {
    //   x: Math.floor(data.playerPhysics.reverseAccel.x * data.fieldSpec.width),
    //   y: Math.floor(data.playerPhysics.reverseAccel.y * data.fieldSpec.width)
    // },
    // resistance: {
    //   x: Math.floor(data.playerPhysics.resistance.x * data.fieldSpec.width),
    //   y: Math.floor(data.playerPhysics.resistance.y * data.fieldSpec.width)
    // },
    kickPower: Math.floor(data.playerPhysics.kickPower * data.fieldSpec.width),
    wallBounce: data.playerPhysics.wallBounce,
    commands: { x: "", y: "" },
    bottomRight: { x: null, y: null },
    kickReady: true,
    elasticCollisionTerms: {
      playerMinusBall:
        (1 - data.playerPhysics.ballToPlayerMassRatio) /
        (1 + data.playerPhysics.ballToPlayerMassRatio),
      ball2:
        (2 * data.playerPhysics.ballToPlayerMassRatio) /
        (1 + data.playerPhysics.ballToPlayerMassRatio),
      player2: 2 / (1 + data.playerPhysics.ballToPlayerMassRatio),
      ballMinusPlayer:
        (data.playerPhysics.ballToPlayerMassRatio - 1) /
        (1 + data.playerPhysics.ballToPlayerMassRatio)
    }
  };
};

module.exports = { roomInitialSetUp, initializeNewPlayer };
