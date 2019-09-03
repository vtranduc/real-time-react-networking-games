const getRooms = function(gameData) {
  let output = {};
  for (let game in gameData) {
    output[game] = {};
    for (let room in gameData[game]) {
      // console.log(room);
      // console.log("break down", output[game][room]);
      output[game][room] = {
        status: gameData[game][room].status,
        chats: gameData[game][room].chats,
        players: {}
      };
      for (let player in gameData[game][room].players) {
        output[game][room].players[player] = {};
      }
    }
  }
  return output;
};

module.exports = getRooms;
