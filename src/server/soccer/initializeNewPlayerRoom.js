const getRandomInt = require("../../helpers/getRandomInt");

const roomInitialSetUp = function(data) {
  return {
    score: { A: 0, B: 0 },
    timeRemaining: data.config.gameTime,
    chats: [],
    config: {
      frameDuration: data.config.frameDuration,
      goalPos: {
        top: Math.floor(
          ((1 - data.fieldSpec.goalSize) / 2) * data.fieldSpec.height +
            data.fieldSpec.top
        ),
        bottom: Math.floor(
          (data.fieldSpec.height * (1 + data.fieldSpec.goalSize)) / 2 +
            data.fieldSpec.top
        ),
        teamA: data.fieldSpec.left,
        teamB:
          data.fieldSpec.left +
          data.fieldSpec.width -
          Math.floor(data.fieldSpec.width * data.ballSpec.width)
      },
      midField: Math.floor(data.fieldSpec.width / 2 + data.fieldSpec.left),
      ballResetPos: {
        x: Math.floor(
          data.fieldSpec.left +
            data.fieldSpec.width / 2 -
            (data.fieldSpec.width * data.ballSpec.width) / 2
        ),
        y: Math.floor(
          data.fieldSpec.top +
            data.fieldSpec.height / 2 -
            (data.fieldSpec.width * data.ballSpec.height) / 2
        )
      },
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
      accelFrictionalMag: Math.floor(
        data.ballPhysics.friction * data.fieldSpec.width
      ),
      accelFrictional: { x: 0, y: 0 },
      wallBounce: data.ballPhysics.wallBounce,
      bottomRight: { x: null, y: null }
    }
  };
};

const initializeNewPlayer = function(data, team, midField) {
  return {
    pos: {
      // x: getRandomInt(
      //   data.fieldSpec.left,
      //   data.fieldSpec.left + data.fieldSpec.width
      // ),
      x:
        team === "A"
          ? getRandomInt(
              data.fieldSpec.left,
              Math.floor(
                midField - (data.playerSpec.width * data.fieldSpec.width) / 2
              )
            )
          : getRandomInt(midField, data.fieldSpec.left + data.fieldSpec.width),
      y: getRandomInt(
        data.fieldSpec.top,
        data.fieldSpec.top +
          data.fieldSpec.height -
          Math.floor(data.fieldSpec.width * data.playerSpec.height)
      )
    },
    team: team,
    vel: { x: 0, y: 0 },
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
