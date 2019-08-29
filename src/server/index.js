const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = 3001;
const soccerGame = require("./soccer/soccerServer");
// app.get("/", (req, res) => {
//   res.send("<h1>Hellow World</h1>");
// });

http.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});

const defaultPlayerDataTest = {
  rooms: [],
  username: "jayjay",
  email: "jayjay@toronto.com"
};

const onlinePlayers = {};
const gameData = { soccer: {} };

io.on("connection", socket => {
  ///////////////////////////
  console.log("A user has been connected: ", socket.id);
  onlinePlayers[socket.id] = defaultPlayerDataTest;
  ///////////////////////////////
  socket.on("disconnect", () => {
    console.log("a user has been disconnected", socket.id);
    delete onlinePlayers[socket.id];
    console.log(onlinePlayers);
  });
  soccerGame(socket, io.sockets, io.sockets.adapter.rooms, gameData.soccer);
});
