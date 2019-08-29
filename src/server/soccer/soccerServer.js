let getRandomInt = require("../../helpers/getRandomInt")


const soccerGame = function(socket, sockets, rooms, soccerData) {
  console.log("this is a soccer game");
  socket.on("soccerHandleKeyPress", data => {
    // console.log("data has been received: ", data);
    soccerData[data.room].players[socket.id].commands[data.axis]= data.dir;
    console.log("current command is: ", soccerData[data.room].players[socket.id].commands)
  });
  socket.on("soccerInit", data => {
    console.log("A user has joined the room: ", socket.id);
    if (!soccerData[data.room]) {
      soccerData[data.room] = {
        config: {},
        players: {},
        interval: null,
        ball: {}
      };
      //----Start the game----
      setInterval(()=>{
        updateSoccerGame(soccerData[data.room]);
        sockets
        .to(data.room)
        .emit("soccerUpdateGame", allPos(soccerData, data.room));
      }, data.config.frameDuration *1000)
    } 
    socket.join(data.room);
    soccerData[data.room].players[socket.id] = {
      pos: { x: getRandomInt(data.fieldSpec.left, data.fieldSpec.left + data.fieldSpec.width), y: data.fieldSpec.top },
      commands: {x: "", y: ""}
    };
    soccerData[data.room].ball = {
      //positions will need to be fixed later on... just testing out the function
      pos: { x: getRandomInt(data.fieldSpec.left, data.fieldSpec.left + data.fieldSpec.width), y: data.fieldSpec.top }
    };
    console.log("gamedata: ", soccerData);
    
  });

  const updateSoccerGame = function(roomData){
    for (let socketId in roomData.players) {
      if (roomData.players[socketId].commands.x ==="right"){
        roomData.players[socketId].pos.x += 5;
      }
    }
  }

  

  // ==============ALL THE DISCONNECTIONS==============================

  socket.on("soccerDisconnect", room => {
    // if (soccerData[room] && soccerData[room].players[socket.id]) {
    socket.leave(room);
    delete soccerData[room].players[socket.id];
    console.log("deleted: " + socket.id + ": ", soccerData);
    console.log("Remaining users: ", Object.keys(soccerData[room].players));
    if (Object.keys(soccerData[room].players).length === 0) {
      delete soccerData[room];
      console.log("Deleted the entire room!");
    }
    // }
  });

  socket.on("disconnect", () => {
    //----------------------Literals
    const room = "testingSoccer";
    //----------------------
    if (soccerData[room] && soccerData[room].players[socket.id]) {
      delete soccerData[room].players[socket.id];
      console.log("deleted: " + socket.id + ": ", soccerData);
      console.log("Remaining users: ", Object.keys(soccerData[room].players));
      if (Object.keys(soccerData[room].players).length === 0) {
        delete soccerData[room];
        console.log("Deleted the entire room!");
      }
      
    }
  });
};
//tells the clients where all the players are.
const allPos = function(soccerData, room) {
  let output = {
    ball: soccerData[room].ball.pos,
    players: {}
  };
  for (let socketId in soccerData[room].players) {
    output.players[socketId] = soccerData[room].players[socketId].pos;
  }
  return output;
};

module.exports = soccerGame;
