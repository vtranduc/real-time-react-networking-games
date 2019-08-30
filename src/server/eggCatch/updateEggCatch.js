function updatePlayerPositions(roomData, playerPosDefault) {
  dropEggs(roomData);

  for (let socketId in roomData.players) {
    switch (roomData.players[socketId].playerNumber) {
      case 1:
        if (roomData.players[socketId].commands.x == "left") {
          console.log(`player 1 has held the left button`);
          roomData.players[socketId].pos.x = playerPosDefault - 50;
        } else if (roomData.players[socketId].commands.x == "right") {
          console.log(`player 1 has held the right button`);
          roomData.players[socketId].pos.x = playerPosDefault + 50;
        } else {
          roomData.players[socketId].pos.x = playerPosDefault;
        }
        break;
      case 2:
        if (roomData.players[socketId].commands.x == "left") {
          console.log(`player 2 has held the left button`);
          roomData.players[socketId].pos.x = playerPosDefault + 150;
        } else if (roomData.players[socketId].commands.x == "right") {
          console.log(`player 2 has held the right button`);
          roomData.players[socketId].pos.x = playerPosDefault + 250;
        } else {
          roomData.players[socketId].pos.x = playerPosDefault + 200;
        }
        break;
      case 3:
        if (roomData.players[socketId].commands.x == "left") {
          console.log(`player 3 has held the left button`);
          roomData.players[socketId].pos.x = playerPosDefault + 350;
        } else if (roomData.players[socketId].commands.x == "right") {
          console.log(`player 3 has held the right button`);
          roomData.players[socketId].pos.x = playerPosDefault + 450;
        } else {
          roomData.players[socketId].pos.x = playerPosDefault + 400;
        }
        break;
      case 4:
        if (roomData.players[socketId].commands.x == "left") {
          console.log(`player 4 has held the left button`);
          roomData.players[socketId].pos.x = playerPosDefault + 550;
        } else if (roomData.players[socketId].commands.x == "right") {
          console.log(`player 4 has held the right button`);
          roomData.players[socketId].pos.x = playerPosDefault + 650;
        } else {
          roomData.players[socketId].pos.x = playerPosDefault + 600;
        }
        break;
    }
  }
}

function dropEggs(roomData) {
  // if (intervalCount % difficultyRank == 0) {
  // }
  const time = roomData.config.frameDuration;
  const vel = roomData.eggs.egg1.vel;
  console.log("egg is being dropped!");
  roomData.eggs.egg1.pos.y +=
    vel * time + 0.5 * roomData.config.accel * time * time;
  roomData.eggs.egg1.vel += roomData.config.accel * time;
}

module.exports = updatePlayerPositions;
