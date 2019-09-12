const getJoinedRooms = function(soccerData, socketId) {
  let output = [];
  for (room in soccerData) {
    if (room !== "lobby") {
      if (Object.keys(soccerData[room].players).includes(socketId)) {
        output.push(room);
      }
    }
  }
  return output;
};

module.exports = getJoinedRooms;
