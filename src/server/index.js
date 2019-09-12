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
const privateMessage = require("./privateMessage/index");

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
			values: [email, password]
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
			values: [username]
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
	getUser(req.body.email, req.body.password)
		.then(result => {
			console.log(result);
			if (result.length) {
				result[0].cookie = cookieEncrypt(result[0].username);
				res.send(result);
			} else {
				res.send([]);
			}
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

	"https://img.freepik.com/free-vector/abstract-dynamic-pattern-wallpaper-vector_53876-59131.jpg?size=338&ext=jpg",
	"https://avatarfiles.alphacoders.com/633/63329.png",
	"https://i.pinimg.com/originals/53/54/f7/5354f750a2816333f42efbeeacb4e244.jpg",
	"https://thewondrous.com/wp-content/uploads/2015/07/cute-profile-picture-ideas.jpg",
	"http://www.sarkarinaukrisearch.in/wp-content/uploads/2019/01/cute-profile-pic-fooir-what.jpg",
	"data:image/jpeg;base64,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",
	"https://lh3.googleusercontent.com/c_7GxtOdCzQWgNvlCEg1aEbE288eVGzA6vqRQ7ZVskQl3tRdmKx59SoOJcqcU5Lcdg",
	"https://i.pinimg.com/originals/cd/dc/61/cddc6171cee691f3c046a2f824d86a1a.jpg"
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
	onlinePlayers[socket.id] = { username: null };
	console.log(onlinePlayers);
	socket.on("disconnect", () => {
		console.log("a user has been disconnected", socket.id);
		if (onlinePlayers[socket.id]) {
			delete onlinePlayers[socket.id];
		}
	});
	socket.on("whoIsOnlinePlayer", encryptedCookie => {
		console.log("username ASSIGNING: ", encryptedCookie);
		onlinePlayers[socket.id].username = cookieDecrypt(encryptedCookie);
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
	world(
		io,
		socket,
		io.sockets,
		io.sockets.adapter.rooms,
		gameData.world,
		onlinePlayers
	);
	soccerGame(
		socket,
		io.sockets,
		io.sockets.adapter.rooms,
		gameData.soccer,
		io,
		onlinePlayers
	);
	rockPaperScissorsGame(socket, io.sockets, gameData.rockPaperScissors, io);
	// eggCatchGame(socket, io.sockets, io.sockets.adapter.rooms, gameData.eggCatch);
	lobby(socket, io.sockets, gameData, io, onlinePlayers);
	userProfileServerSocket(socket, io.sockets, io, pool);
	privateMessage(socket, io.sockets, io, pool, onlinePlayers);
});

// const getGuestId = function(socketId, defaultAvatars) {
//   return {
//     username: `Guest_${socketId.slice(0, 3)}`,
//     avatar: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
//   };
// };
