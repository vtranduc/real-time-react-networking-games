const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = 3001;
const soccerGame = require("./soccer/index");
const eggCatchGame = require("./eggCatch/index");
const world = require("./world/index");
const rockPaperScissorsGame = require("./rockPaperScissors/index");
const lobby = require("./lobby/index");
const Cookies = require("universal-cookie");

const {
	getMessage,
	getUserData,
	postMessage,
	getUserProfile,
	createUser
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

//------------API ROUTEs-------------------------------
const { Pool } = require("pg");
//const dbParams = require("../lib/db.js");
const pool = new Pool({
	user: "JJ",
	host: "localhost",
	database: "gamefinal",
	password: 123
});
pool.connect();

console.log("mikuro san");
// return;

//-----------Helper functions

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
			console.log("OVER HERE", result);

			const cookie = new Cookies(req.headers.cookie);

			//req.session.user_id = result[0].username;
			res.send(result);
		})
		.catch(err => {
			console.log(err);
		});
});

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

app.get("/jj", (req, res) => {});

app.get("/:id", (req, res) => {
	console.log(req.params);
	const { id } = req.params;
	res.send(id);
});

app.get("/getmessages/:username", (req, res) => {
	getMessage(req.params.username).then(data => {
		res.send(data);
	});
});

app.post("/postmessage", (req, res) => {
	let sender = req.body.sender;
	let reciever = req.body.reciever;
	let title = req.body.title;
	let message = req.body.message;
	console.log(sender, "jzizzless");

	postMessage(sender, reciever, title, message);
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

//------------------------------------------------------------------------

const gameData = {
	soccer: {
		lobby: {
			soccerRoom1: {
				status: "",
				players: {},
				chats: [
					{ key: ";czvxzc", user: "Good duke", msg: "Hello all" },
					{ key: ";bvxcb", user: "Bad duke", msg: "Hello all" },
					{ key: "sfsaf,.dsj", user: "No one", msg: "Hello none" }
				]
			},
			soccerRoom2: {
				status: "aaa",
				players: { jayjay: { ready: false }, sarah: { ready: true } },
				chats: [
					{ key: ";pfdzzzzzzzzsAsaj", user: "Jayjay", msg: "I wanna eat" },
					{ key: ";pfdsbbaj", user: "Sarah", msg: "Ok!" }
				]
			}
		}
	},
	eggCatch: { lobby: {} },
	world: { lobby: {} },
	rockPaperScissors: {
		lobby: {}
		// testRockPaperScissors123qweasd: {
		//   players: { JayJay: {}, Sarah: {}, Selin: {} }
		// }
	}
};

// const gameData = {
//   soccer: {
//     soccertest1: {
//       players: { Thilina: {}, Sarah: {}, Anchen: {}, Selin: {} },
//       status: "recruiting",
//       chats: [
//         { key: ";czvxzc", user: "Good duke", msg: "Hello all" },
//         { key: ";bvxcb", user: "Bad duke", msg: "Hello all" }
//       ]
//     },
//     soccertest2: {
//       players: { Thilina: {}, Sarah: {}, Anchen: {}, Selin: {} },
//       status: "recruiting",
//       chats: [
//         { key: ";pfdzzzzzzzzsAsaj", user: "Good duke", msg: "Hello all" },
//         { key: ";pfdsbbaj", user: "Bad duke", msg: "Hello all" }
//       ]
//     },
//     soccertest3: {
//       players: { Thilina: {}, Sarah: {}, Anchen: {}, Selin: {} },
//       status: "recruiting",
//       chats: [
//         { key: ";pfFADSFADSdsaj", user: "Good duke", msg: "Hello all" },
//         { key: ";pfFDASFDASCVCZVCZdsaj", user: "Bad duke", msg: "Hello all" }
//       ]
//     }
//   },
//   eggCatch: {
//     eggCatchYaminoma: {
//       players: { jayjay: {}, Sarah: {}, Anchen: {}, Selin: {} },
//       status: "recruiting",
//       chats: [{ key: ";CC", user: "Evil duke", msg: "Hello all" }]
//     },
//     eggCatchYaminoma2: {
//       players: { Thilina: {}, Sarah: {}, Anchen: {}, Selin: {} },
//       status: "recruiting",
//       chats: [
//         { key: ";pfdsaj", user: "Good duke", msg: "Hello all" },
//         { key: ";DFA", user: "Bad duke", msg: "Hello all" }
//       ]
//     }
//   },
//   world: {}
// };
//------------------------------------------------------------------------

io.on("connection", socket => {
	console.log("A user has been connected: ", socket.id);
	onlinePlayers[socket.id] = defaultPlayerDataTest;
	socket.on("disconnect", () => {
		console.log("a user has been disconnected", socket.id);
		delete onlinePlayers[socket.id];
		console.log(onlinePlayers);
	});
	world(socket, io.sockets, io.sockets.adapter.rooms, gameData.world);
	soccerGame(socket, io.sockets, io.sockets.adapter.rooms, gameData.soccer, io);
	rockPaperScissorsGame(socket, io.sockets, gameData.rockPaperScissors, io);
	eggCatchGame(socket, io.sockets, io.sockets.adapter.rooms, gameData.eggCatch);
	lobby(socket, io.sockets, io.sockets.adapter.rooms, gameData, io);
});
