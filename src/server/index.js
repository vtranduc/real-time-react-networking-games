const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 3001;
//----Listeners for components----
const soccerGame = require("./soccer/index");
const eggCatchGame = require("./eggCatch/index");
const world = require("./world/index");
const rockPaperScissorsGame = require("./rockPaperScissors/index");
const lobby = require("./lobby/index");
//--------------------------------

//----App configuration-----------
const { cookieEncrypt, cookieDecrypt } = require("./helpers/cookiesEncription");
const profileServerData = require("./user/index");
const userProfileServerSocket = require("./user/serverSocket");
//--------------------------------

const {
	getMessage,
	getUserData,
	postMessage,
	getUserProfile,
	createUser,
	getFollowers,
	getFollows,
	getFriendList
} = require("../../db/queries/allQueries");
// app.get("/", (req, res) => {
//   res.send("<h1>Hellow World</h1>");
// });

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.set("trust proxy", 1); // trust first proxy

const { Pool } = require("pg");
//const dbParams = require("../lib/db.js");
const pool = new Pool({
	user: "JJ",
	host: "localhost",
	database: "gamefinal",
	password: 123
});
pool.connect();

const getAllUsers = function() {
	return pool
		.query(
			`SELECT id, username,first_name ,  avatar
  FROM users`
		)
		.then(res => res.rows);
};
const getUser = function(email, password) {
	return pool
		.query({
			text: `SELECT id, username, first_name, avatar 
    FROM users 
    WHERE email = $1 AND pass = $2`,
			values: [email, password],
			name: "get_message_query"
		})
		.then(res => {
			return res.rows;
		});
};

//===================================
//===================================
//===================================
//===================================
//===================================
//===================================
//===================================

//================Profile================
//================Profile================
//================Profile================
//================Profile================
//================Profile================

profileServerData(app, pool);

//================Profile================
//================Profile================
//================Profile================
//================Profile================
//================Profile================
//================Profile================

// return;
// app.get("/test123", (req, res) => {
//   const cookies = new Cookies(req.headers.cookie);
//   console.log("AHHHHHHHHHHHH", cookies.get("myCat")); // Pacman or undefined if not set yet
//   console.log("juice");
//   res.send("<h1>Hello test123</h1>");
// });

// app.post("/retrieveuserprofile", (req, res) => {
//   console.log("I am looking for: ", req.body);
// });

app.post("/loggedInStatus", (req, res) => {
	console.log("checking the cookie now");
	// console.log("bomb: ", );

	const username = cookieDecrypt(req.body.cookie);

	pool
		.query({
			text: `SELECT id, username, first_name, avatar 
    FROM users 
    WHERE username = $1`,
			values: [username],
			name: "get_message_query"
		})
		.then(result => {
			res.send(result.rows);
		});

	// getUserProfile(username).then(result => {
	//   res.send(result);
	// });

	// const someData = { dummy: "hello JAy cookie" };
	// res.send(someData);
});

//===================================
//===================================
//===================================
//===================================
//===================================
//===================================
//===================================
//===================================
//===================================

//----------------------------------------------------
//-------------------router requests-------------------------
app.get("/users", (req, res) => {
	getAllUsers().then(result => {
		return res.json(result);
	});
});

app.get("/getuser/:username", (req, res) => {
	getUserProfile(req.params.username).then(result => {
		res.send(result);
	});
});

app.post("/login", (req, res) => {
	console.log("FORM VALUES:", req.body);
	getUser(req.body.email, req.body.password)
		.then(result => {
			result[0].cookie = cookieEncrypt(result[0].username);
			res.send(result);
		})
		.catch(err => {
			console.log(err);
		});
});

// app.get()

app.post("/register", (req, res) => {
	createUser(
		req.body.username,
		req.body.firstName,
		req.body.lastName,
		req.body.email,
		req.body.password,
		req.body.avatar
	);
});

// app.get("/jj", (req, res) => {});

app.get("/:id", (req, res) => {
	console.log(req.params);
	const { id } = req.params;
	res.send(id);
});

//-----------------------------------------------------------------------

//------------API ROUTEs-------------------------------

server.listen(PORT, () => {
	console.log(`listening on Port ${PORT}`);
});

// const defaultPlayerDataTest = {
//   rooms: [],
//   username: "jayjay",
//   email: "jayjay@toronto.com"
// };

const onlinePlayers = {};

//------------------------------------------------------------------------

defaultAvatars = [
	// "https://avatarfiles.alphacoders.com/987/98744.gif",
	"https://avatarfiles.alphacoders.com/527/52773.jpg",
	"https://avatarfiles.alphacoders.com/715/71560.jpg",
	"https://avatarfiles.alphacoders.com/106/10638.gif",
	"https://avatarfiles.alphacoders.com/893/89303.gif",
	"https://avatarfiles.alphacoders.com/822/82242.png",
	"https://avatarfiles.alphacoders.com/633/63329.png",
	"https://i.imgur.com/EsVWBJz.png",
	"https://66.media.tumblr.com/98af64c609d1d3484f0f1ab7d464d200/tumblr_onzhhzWMbE1seeoy9o2_250.png",
	"https://66.media.tumblr.com/16cea447c9af76216f54c4e0668b9dba/tumblr_pjsogf4hfM1w722h2o5_500.png",
	"https://pbs.twimg.com/profile_images/571597459281829888/bjGTj5B9_400x400.png",
	"https://cdn.discordapp.com/attachments/299832570693156874/619578961688789003/Eli1.png",
	"https://avatarfiles.alphacoders.com/148/148267.png"
];

const gameData = {
	soccer: {
		lobby: {
			soccerRoom1: {
				status: "",
				players: {},
				chats: [
					{
						key: ";czvxzc",
						user: "Good duke",
						msg: "Hello all",
						avatar:
							defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
					},
					{
						key: ";bvxcb",
						user: "Bad duke",
						msg: "Hello all",
						avatar:
							defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
					},
					{
						key: "sfsaf,.dsj",
						user: "No one",
						msg: "Hello none",
						avatar:
							defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
					}
				]
			},
			soccerRoom2: {
				status: "aaa",
				players: {},
				chats: [
					{
						key: ";pfdzzzzzzzzsAsaj",
						user: "Jayjay",
						msg: "I wanna eat",
						avatar:
							defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
					},
					{
						key: ";pfdsbbaj",
						user: "Sarah",
						msg: "Ok!",
						avatar:
							defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
					}
				]
			}
		}
	},
	eggCatch: { lobby: {} },
	world: { lobby: {} },
	rockPaperScissors: {
		lobby: {}
	}
};

//------------------------------------------------------------------------

io.on("connection", socket => {
	console.log("A user has been connected: ", socket.id);
	socket.on("disconnect", () => {
		console.log("a user has been disconnected", socket.id);
		// delete onlinePlayers[socket.id];
	});
	//-----------------LOGGING------------------------------------
	// socket.on("setUpGuestProfile", () => {
	//   console.log("ADDING A GUEST HERE!!!");
	//   onlinePlayers[socket.id] = getGuestId(socket.id, defaultAvatars);
	// });
	// socket.on("login", data => {
	//   console.log("adding people HERE!", data);
	//   onlinePlayers[socket.id] = { username: data.username, avatar: data.avatar };
	//   // console.log("onlinePlayers", onlinePlayers);
	//   // socket.handshake.session.userData = data;
	//   // socket.handshake.session.save();
	// });

	socket.on("requestGuestProfile", () => {
		// console.log("SET UP GUEST ON THE SERVER");
		io.to(socket.id).emit("catchGuestProfile", {
			username: `Guest_${socket.id.slice(0, 3)}`,
			avatar: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
		});
	});

	// Have not implemented yet!------------------------
	// socket.on("logout", function(userdata) {
	//   if (socket.handshake.session.userdata) {
	//     delete socket.handshake.session.userdata;
	//     socket.handshake.session.save();
	//   }
	// });

	// https://www.npmjs.com/package/express-socket.io-session

	//--------------------------------------------------------------
	world(socket, io.sockets, io.sockets.adapter.rooms, gameData.world);
	soccerGame(socket, io.sockets, io.sockets.adapter.rooms, gameData.soccer, io);
	rockPaperScissorsGame(socket, io.sockets, gameData.rockPaperScissors, io);
	eggCatchGame(socket, io.sockets, io.sockets.adapter.rooms, gameData.eggCatch);
	lobby(socket, io.sockets, gameData, io);
	userProfileServerSocket(socket, io.sockets, io);
});

// const getGuestId = function(socketId, defaultAvatars) {
//   return {
//     username: `Guest_${socketId.slice(0, 3)}`,
//     avatar: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
//   };
// };
