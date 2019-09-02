const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = 3001;
const soccerGame = require("./soccer/index");
const eggCatchGame = require("./eggCatch/index");
const world = require("./world/index");
const cors = require('cors');
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:3000',
credentials: true}))

//------------API ROUTEs-------------------------------
const {Pool} = require("pg");
//const dbParams = require("../lib/db.js");
const pool  = new Pool({
user: 'JJ',
host: 'localhost',
database:'gamefinal',
password: 123

});
pool.connect();

//-----------Helper functions

const getAllUsers =function(){
  return pool.query(`SELECT *
  FROM users`)
  .then(res => res.rows)
}
const getUser = function(email, password){
  return pool.query({
    text:`SELECT * 
    FROM users 
    WHERE email = $1 AND pass = $2`,
    values:[email, password],
    name: 'get_message_query'
}).then(res=>res.rows)
} 




getUser('jayjay_ting@hotmail.com','hello').then((result)=>{console.log(result, "look heree!!")})
//----------------------------------------------------

//-------------------router requests-------------------------
app.get("/users", (req, res)=>{
  getAllUsers().then(result=>{return res.json(result)})
})

app.post("/login", (req, res)=>{
  console.log("FORM VALUES:", req.body)
})

app.get("/jj", (req, res) => {
  getUser("jayjay_ting@hotmail.com","hello").then(result=>{return res.json(result)});
});




app.get("/:id", (req, res) => {
  console.log(req.params)
  const {id} = req.params;
  res.send(id)
});


//-----------------------------------------------------------------------



//------------API ROUTEs-------------------------------





























http.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});

const defaultPlayerDataTest = {
  rooms: [],
  username: "jayjay",
  email: "jayjay@toronto.com"
};

const onlinePlayers = {};
const gameData = { soccer: {}, eggCatch: {}, world };

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
  world(socket, io.sockets, io.sockets.adapter.rooms, gameData.world);
  soccerGame(socket, io.sockets, io.sockets.adapter.rooms, gameData.soccer, io);
  eggCatchGame(socket, io.sockets, io.sockets.adapter.rooms, gameData.eggCatch);
});
