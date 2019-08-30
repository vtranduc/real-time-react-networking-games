const updateSoccerGame = function(roomData) {
  moveBall(roomData.ball, roomData.config.frameDuration);
  handleBallOutsidePlayField(
    roomData.ball,
    roomData.config.permittedRange.ball
  );
  updateBallBottomRight(roomData);
  for (let socketId in roomData.players) {
    movePlayer(roomData, socketId);
    handlePlayerOutsidePlayField(roomData, socketId);
    updatePlayerBottomRight(roomData, socketId);
    handleBallPlayerCollision(roomData, socketId);
  }
};

const moveBall = function(ball, frameDuration) {
  if (ball.vel.x !== 0) {
    if (ball.vel.x < 0) {
      ball.pos.x += displacement(ball.vel.x, ball.resistance.x, frameDuration);
      ball.vel.x += ball.resistance.x * frameDuration;
      if (ball.vel.x > 0) {
        ball.vel.x = 0;
      }
    } else if (ball.vel.x > 0) {
      ball.pos.x += displacement(ball.vel.x, -ball.resistance.x, frameDuration);
      ball.vel.x -= ball.resistance.x * frameDuration;
      if (ball.vel.x < 0) {
        ball.vel.x = 0;
      }
    }
  }
  if (ball.vel.y !== 0) {
    if (ball.vel.y < 0) {
      ball.pos.y += displacement(ball.vel.y, ball.resistance.y, frameDuration);
      ball.vel.y += ball.resistance.y * frameDuration;
      if (ball.vel.y > 0) {
        ball.vel.y = 0;
      }
    } else if (ball.vel.y > 0) {
      ball.pos.y += displacement(ball.vel.y, -ball.resistance.y, frameDuration);
      ball.vel.y -= ball.resistance.y * frameDuration;
      if (ball.vel.y < 0) {
        ball.vel.y = 0;
      }
    }
  }
};

const updateBallBottomRight = function(roomData) {
  roomData.ball.bottomRight.y =
    roomData.ball.pos.y + roomData.config.size.ball.height;
  roomData.ball.bottomRight.x =
    roomData.ball.pos.x + roomData.config.size.ball.width;
};

const handleBallOutsidePlayField = function(
  { pos, vel, wallBounce },
  { top, left, bottom, right }
) {
  if (pos.x < left) {
    pos.x = left;
    vel.x = -vel.x * wallBounce;
  } else if (pos.x > right) {
    pos.x = right;
    vel.x = -vel.x * wallBounce;
  }
  if (pos.y > bottom) {
    pos.y = bottom;
    vel.y = -vel.y * wallBounce;
  } else if (pos.y < top) {
    pos.y = top;
    vel.y = -vel.y * wallBounce;
  }
};

const movePlayer = function(roomData, socketId) {
  if (roomData.players[socketId].commands.x === "") {
    if (roomData.players[socketId].vel.x !== 0) {
      if (
        Math.abs(roomData.players[socketId].vel.x) <=
        roomData.config.negligibleVel.x
      ) {
        roomData.players[socketId].vel.x = 0;
      } else if (roomData.players[socketId].vel.x > 0) {
        roomData.players[socketId].pos.x += displacement(
          roomData.players[socketId].vel.x,
          -roomData.players[socketId].resistance.x,
          roomData.config.frameDuration
        );
        roomData.players[socketId].vel.x -=
          roomData.players[socketId].resistance.x *
          roomData.config.frameDuration;
      } else if (roomData.players[socketId].vel.x < 0) {
        roomData.players[socketId].pos.x += displacement(
          roomData.players[socketId].vel.x,
          roomData.players[socketId].resistance.x,
          roomData.config.frameDuration
        );
        roomData.players[socketId].vel.x +=
          roomData.players[socketId].resistance.x *
          roomData.config.frameDuration;
      }
    }
  } else {
    const acceleration =
      roomData.players[socketId].commands.x === "right"
        ? roomData.players[socketId].vel.x >= 0
          ? roomData.players[socketId].accel.x
          : roomData.players[socketId].reverseAccel.x
        : roomData.players[socketId].vel.x <= 0
        ? -roomData.players[socketId].accel.x
        : -roomData.players[socketId].reverseAccel.x;

    roomData.players[socketId].pos.x += displacement(
      roomData.players[socketId].vel.x,
      acceleration,
      roomData.config.frameDuration
    );
    roomData.players[socketId].vel.x +=
      acceleration * roomData.config.frameDuration;
  }
  if (roomData.players[socketId].commands.y === "") {
    if (roomData.players[socketId].vel.y !== 0) {
      if (
        Math.abs(roomData.players[socketId].vel.y) <=
        roomData.config.negligibleVel.y
      ) {
        roomData.players[socketId].vel.y = 0;
      } else if (roomData.players[socketId].vel.y > 0) {
        roomData.players[socketId].pos.y += displacement(
          roomData.players[socketId].vel.y,
          -roomData.players[socketId].resistance.y,
          roomData.config.frameDuration
        );
        roomData.players[socketId].vel.y -=
          roomData.players[socketId].resistance.y *
          roomData.config.frameDuration;
      } else if (roomData.players[socketId].vel.y < 0) {
        roomData.players[socketId].pos.y += displacement(
          roomData.players[socketId].vel.y,
          roomData.players[socketId].resistance.y,
          roomData.config.frameDuration
        );
        roomData.players[socketId].vel.y +=
          roomData.players[socketId].resistance.y *
          roomData.config.frameDuration;
      }
    }
  } else {
    const acceleration =
      roomData.players[socketId].commands.y === "down"
        ? roomData.players[socketId].vel.y >= 0
          ? roomData.players[socketId].accel.y
          : roomData.players[socketId].reverseAccel.y
        : roomData.players[socketId].vel.y <= 0
        ? -roomData.players[socketId].accel.y
        : -roomData.players[socketId].reverseAccel.y;

    roomData.players[socketId].pos.y += displacement(
      roomData.players[socketId].vel.y,
      acceleration,
      roomData.config.frameDuration
    );
    roomData.players[socketId].vel.y +=
      acceleration * roomData.config.frameDuration;
  }
};

const handlePlayerOutsidePlayField = function(roomData, socketId) {
  if (
    roomData.players[socketId].pos.x <
    roomData.config.permittedRange.player.left
  ) {
    roomData.players[socketId].pos.x =
      roomData.config.permittedRange.player.left;
    roomData.players[socketId].vel.x =
      -roomData.players[socketId].vel.x * roomData.players[socketId].wallBounce;
  } else if (
    roomData.players[socketId].pos.x >
    roomData.config.permittedRange.player.right
  ) {
    roomData.players[socketId].pos.x =
      roomData.config.permittedRange.player.right;
    roomData.players[socketId].vel.x =
      -roomData.players[socketId].vel.x * roomData.players[socketId].wallBounce;
  }
  if (
    roomData.players[socketId].pos.y < roomData.config.permittedRange.player.top
  ) {
    roomData.players[socketId].pos.y =
      roomData.config.permittedRange.player.top;
    roomData.players[socketId].vel.y =
      -roomData.players[socketId].vel.y * roomData.players[socketId].wallBounce;
  } else if (
    roomData.players[socketId].pos.y >
    roomData.config.permittedRange.player.bottom
  ) {
    roomData.players[socketId].pos.y =
      roomData.config.permittedRange.player.bottom;
    roomData.players[socketId].vel.y =
      -roomData.players[socketId].vel.y * roomData.players[socketId].wallBounce;
  }
};

const updatePlayerBottomRight = function(roomData, socketId) {
  roomData.players[socketId].bottomRight.x =
    roomData.players[socketId].pos.x + roomData.config.size.player.width;
  roomData.players[socketId].bottomRight.y =
    roomData.players[socketId].pos.y + roomData.config.size.player.height;
};

const handleBallPlayerCollision = function(roomData, socketId) {
  if (
    collisionDetector(
      roomData.ball.pos,
      roomData.ball.bottomRight,
      roomData.players[socketId].pos,
      roomData.players[socketId].bottomRight
    )
  ) {
    if (roomData.players[socketId].kickReady) {
      elasticCollision(roomData.ball, roomData.players[socketId]);
      roomData.players[socketId].kickReady = false;
    }
  } else if (!roomData.players[socketId].kickReady) {
    roomData.players[socketId].kickReady = true;
  }
};

const elasticCollision = function(ball, player) {
  const playerVelx =
    player.elasticCollisionTerms.playerMinusBall * player.vel.x +
    player.elasticCollisionTerms.ball2 * ball.vel.x;
  const playerVely =
    player.elasticCollisionTerms.playerMinusBall * player.vel.y +
    player.elasticCollisionTerms.ball2 * ball.vel.y;
  ball.vel.x =
    player.elasticCollisionTerms.player2 * player.vel.x +
    player.elasticCollisionTerms.ballMinusPlayer * ball.vel.x;
  ball.vel.y =
    player.elasticCollisionTerms.player2 * player.vel.y +
    player.elasticCollisionTerms.ballMinusPlayer * ball.vel.y;
  player.vel.x = playerVelx;
  player.vel.y = playerVely;
};

const collisionDetector = function(
  ballTopLeft,
  ballBottomRight,
  playerTopLeft,
  playerBottomRight
) {
  return ballTopLeft.x > playerBottomRight.x ||
    ballBottomRight.x < playerTopLeft.x ||
    ballTopLeft.y > playerBottomRight.y ||
    ballBottomRight.y < playerTopLeft.y
    ? false
    : true;
};

const displacement = function(vi, accel, time) {
  return vi * time + 0.5 * accel * time * time;
};

module.exports = updateSoccerGame;
