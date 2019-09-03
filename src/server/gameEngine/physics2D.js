//---Player---

const moveItemWithCommands = function(item, time, chasedItem) {
  if (item.brake) {
    applyBrake(item, time);
    item.speed = getSpeed(item.vel);
  } else {
    let commandDir = null;
    if (item.chase) {
      commandDir = {
        x: chasedItem.pos.x - item.pos.x,
        y: chasedItem.pos.y - item.pos.y
      };
    } else {
      commandDir = getKeyboardVector(item);
    }
    if (commandDir) {
      updateAccel(item, getUnitVector(commandDir));
      moveItem(item, item.accel, time);
      item.speed = getSpeed(item.vel);
      if (item.speed > item.maxSpeed) {
        item.vel.x = (item.vel.x / item.speed) * item.maxSpeed;
        item.vel.y = (item.vel.y / item.speed) * item.maxSpeed;
      }
    } else {
      moveItemWithFriction(item, time);
      item.speed = getSpeed(item.vel);
    }
  }
};

const applyBrake = function(item, time) {
  if (item.speed !== 0) {
    const accelReverse = {
      x: (-item.vel.x / item.speed) * item.accelReverseMag,
      y: (-item.vel.y / item.speed) * item.accelReverseMag
    };
    const disp = {
      x: displacement(item.vel.x, accelReverse.x, time),
      y: displacement(item.vel.y, accelReverse.y, time)
    };

    if (dotProduct(item.vel, disp) < 0) {
      item.vel.x = 0;
      item.vel.y = 0;
    } else {
      moveItem(item, accelReverse, time);
    }
  }
};

const dotProduct = function(vector1, vector2) {
  return vector1.x * vector2.x + vector1.y * vector2.y;
};

const getKeyboardVector = function(item) {
  return item.commands.x === ""
    ? item.commands.y === ""
      ? null
      : item.commands.y === "down"
      ? { x: 0, y: 1 }
      : { x: 0, y: -1 }
    : item.commands.x === "right"
    ? item.commands.y === ""
      ? { x: 1, y: 0 }
      : item.commands.y === "down"
      ? { x: 1, y: 1 }
      : { x: 1, y: -1 }
    : item.commands.y === ""
    ? { x: -1, y: 0 }
    : item.commands.y === "down"
    ? { x: -1, y: 1 }
    : { x: -1, y: -1 };
};

const getUnitVector = function(vector) {
  const speed = getSpeed(vector);
  return speed === 0 ? null : { x: vector.x / speed, y: vector.y / speed };
};

const getSpeed = function(vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

const moveItem = function(item, accel, time) {
  item.pos.x += displacement(item.vel.x, accel.x, time);
  item.pos.y += displacement(item.vel.y, accel.y, time);
  item.vel.x += accel.x * time;
  item.vel.y += accel.y * time;
};

const updateAccel = function(item, unitVector) {
  item.accel.x = unitVector.x * item.accelMag;
  item.accel.y = unitVector.y * item.accelMag;
};

//---Choco chocolate-----------------------

const handleItemOutsideRange = function(item, permittedRange) {
  // WARNING: will not update the speed and friction!!
  if (item.pos.x < permittedRange.left) {
    item.pos.x = permittedRange.left;
    item.vel.x = -item.vel.x * item.wallBounce;
  } else if (item.pos.x > permittedRange.right) {
    item.pos.x = permittedRange.right;
    item.vel.x = -item.vel.x * item.wallBounce;
  }
  if (item.pos.y > permittedRange.bottom) {
    item.pos.y = permittedRange.bottom;
    item.vel.y = -item.vel.y * item.wallBounce;
  } else if (item.pos.y < permittedRange.top) {
    item.pos.y = permittedRange.top;
    item.vel.y = -item.vel.y * item.wallBounce;
  }
};

const moveItemWithFriction = function(item, time) {
  updateMovementFritional(item); // EVENTUALLY THIS SHOULD BE REMOVED!
  nextPosWithFriction(item, time);
  nextVel(item, item.accelFrictional, time);
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
    item.accelFrictional.x = 0;
    item.accelFrictional.y = 0;
  } else {
    item.accelFrictional.x =
      -(item.vel.x / item.speed) * item.accelFrictionalMag;
    item.accelFrictional.y =
      -(item.vel.y / item.speed) * item.accelFrictionalMag;
  }
};

const nextPosWithFriction = function(item, time) {
  let updated = true;
  if (item.vel.x > 0) {
    const dispx = displacement(item.vel.x, item.accelFrictional.x, time);
    if (dispx > 0) {
      item.pos.x += dispx;
    } else {
      item.vel.x = 0;
      updated = false;
    }
  } else if (item.vel.x < 0) {
    const dispx = displacement(item.vel.x, item.accelFrictional.x, time);
    if (dispx < 0) {
      item.pos.x += dispx;
    } else {
      item.vel.x = 0;
      updated = false;
    }
  }
  if (item.vel.y > 0) {
    const dispy = displacement(item.vel.y, item.accelFrictional.y, time);
    if (dispy > 0) {
      item.pos.y += dispy;
    } else {
      item.vel.y = 0;
      updated = false;
    }
  } else if (item.vel.y < 0) {
    const dispy = displacement(item.vel.y, item.accelFrictional.y, time);
    if (dispy < 0) {
      item.pos.y += dispy;
    } else {
      item.vel.y = 0;
      updated = false;
    }
  }
  if (!updated) {
    updateMovementFritional(item);
  }
};

const nextVel = function(item, accel, time) {
  item.vel.x += accel.x * time;
  item.vel.y += accel.y * time;
};

const displacement = function(vi, accel, time) {
  return vi * time + 0.5 * accel * time * time;
};

//--------------------

// const updataItemBottomRight = function(item, itemSize) {};
// // const handleItemOutsideRange = function() {};
// const moveItemWithCommand = function() {};
// const handleItemsCollision = function() {};
// const elasticCollision = function() {};
// const collisionDetector = function() {};

module.exports = {
  moveItemWithFriction,
  handleItemOutsideRange,
  moveItemWithCommands,
  getSpeed,
  getUnitVector
  // updataItemBottomRight,
  // handleItemOutsideRange,
  // moveItemWithCommand,
  // handleItemsCollision,
  // elasticCollision,
  // collisionDetector
};
