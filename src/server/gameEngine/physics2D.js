// const moveItem = function(item, time) {
//   if (ball.vel.x !== 0) {
//     if (ball.vel.x < 0) {
//       ball.pos.x += displacement(ball.vel.x, ball.resistance.x, frameDuration);
//       ball.vel.x += ball.resistance.x * frameDuration;
//       if (ball.vel.x > 0) {
//         ball.vel.x = 0;
//       }
//     } else if (ball.vel.x > 0) {
//       ball.pos.x += displacement(ball.vel.x, -ball.resistance.x, frameDuration);
//       ball.vel.x -= ball.resistance.x * frameDuration;
//       if (ball.vel.x < 0) {
//         ball.vel.x = 0;
//       }
//     }
//   }
//   if (ball.vel.y !== 0) {
//     if (ball.vel.y < 0) {
//       ball.pos.y += displacement(ball.vel.y, ball.resistance.y, frameDuration);
//       ball.vel.y += ball.resistance.y * frameDuration;
//       if (ball.vel.y > 0) {
//         ball.vel.y = 0;
//       }
//     } else if (ball.vel.y > 0) {
//       ball.pos.y += displacement(ball.vel.y, -ball.resistance.y, frameDuration);
//       ball.vel.y -= ball.resistance.y * frameDuration;
//       if (ball.vel.y < 0) {
//         ball.vel.y = 0;
//       }
//     }
//   }
// };

// const moveItem = function(item, time) {
//   updateMovement(item); // STILL THINKING WHETHER TO PUT THIS LAST OF FRAME OR HERE
//   if (item.vel.x !== 0 && item.vel.y !== 0) {
//     nextPos(item, time);
//     nextVel(item, time);
//   }
// };

// const updateMovement = function(item) {
//   updateSpeed(item);
//   updateCounterAccel(item);
// };

// const nextPos = function(item, time) {
//   item.pos.x += item.vel.x * time + item.accel.x * time * time;
//   item.pos.y += item.vel.y * time + item.accel.y * time * time;
// };

// const nextVel = function(item, time) {
//   item.vel.x += item.accel.x * time;
//   item.vel.y += item.accel.y * time;
// };

//---Choco chocolate---
const moveItemWithFriction = function(item, time) {
  // console.log(item.accelFrictional);
  // console.log(item.speed);

  console.log(item.accelAbs);

  updateMovementFritional(item);
  nextPosWithFriction(item, time);
  nextVelWithFriction(item, time);
};

const updateMovementFritional = function(item) {
  updateSpeed(item);
  updateAccelFritional(item);
};

const updateSpeed = function(item) {
  item.speed = Math.sqrt(item.vel.x * item.vel.x + item.vel.y * item.vel.y);
};

const updateAccelFritional = function(item) {
  if (item.speed === 0) {
    item.accelFrictional = { x: 0, y: 0 };
  } else {
    item.accelFrictional.x = -(item.vel.x / item.speed) * item.accelAbs;
    item.accelFrictional.y = -(item.vel.y / item.speed) * item.accelAbs;
  }
};

const nextPosWithFriction = function(item, time) {
  if (item.vel.x > 0) {
    const dispx = displacement(item.vel.x, item.accelFrictional.x, time);
    if (dispx > 0) {
      item.pos.x += dispx;
    }
  } else if (item.vel.x < 0) {
    const dispx = displacement(item.vel.x, item.accelFrictional.x, time);
    if (dispx < 0) {
      item.pos.x += dispx;
    }
  }
  if (item.vel.y > 0) {
    const dispy = displacement(item.vel.y, item.accelFrictional.y, time);
    if (dispy > 0) {
      item.pos.y += dispy;
    }
  } else if (item.vel.y < 0) {
    const dispy = displacement(item.vel.y, item.accelFrictional.y, time);
    if (dispy < 0) {
      item.pos.y += dispy;
    }
  }
};

const nextVelWithFriction = function(item, time) {
  if (item.vel.x > 0) {
    const velDiffx = item.accelFrictional.x * time;
    if (velDiffx >= 0) {
      item.vel.x += velDiffx;
    } else {
      item.vel.x = 0;
    }
  } else if (item.vel.x < 0) {
    const velDiffx = item.accelFrictional.x * time;
    if (velDiffx <= 0) {
      item.vel.x += velDiffx;
    } else {
      item.vel.x = 0;
    }
  }
  if (item.vel.y > 0) {
    const velDiffy = item.accelFrictional.y * time;
    if (velDiffy >= 0) {
      item.vel.y += velDiffy;
    } else {
      item.vel.y = 0;
    }
  } else if (item.vel.y < 0) {
    const velDiffy = item.accelFrictional.y * time;
    if (velDiffy <= 0) {
      item.vel.y += velDiffy;
    } else {
      item.vel.y = 0;
    }
  }
};

const displacement = function(vi, accel, time) {
  return vi * time + 0.5 * accel * time * time;
};

//--------------------

const updataItemBottomRight = function(item, itemSize) {};
const handleItemOutsideRange = function() {};
const moveItemWithCommand = function() {};
const handleItemsCollision = function() {};
const elasticCollision = function() {};
const collisionDetector = function() {};

module.exports = {
  moveItemWithFriction
  // updataItemBottomRight,
  // handleItemOutsideRange,
  // moveItemWithCommand,
  // handleItemsCollision,
  // elasticCollision,
  // collisionDetector
};
