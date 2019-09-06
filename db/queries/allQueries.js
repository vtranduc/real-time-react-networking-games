const { Pool } = require("pg");
//const dbParams = require("../lib/db.js");
const pool = new Pool({
	user: "JJ",
	host: "localhost",
	database: "gamefinal",
	password: 123
});
pool.connect();

const getUsers = function() {
	return pool
		.query(
			`SELECT *
    FROM users`
		)
		.then(res => res.rows);
};

const getUserProfile = function(username) {};

//const addUser

const getUserData = function(email, password) {
	return pool
		.query({
			text: `SELECT * 
        FROM users 
        WHERE email = $1 AND pass = $2`,
			values: [email, password],
			name: "get_message_query"
		})
		.then(res => res.rows[0])
		.catch(err => {
			console.log(err);
		});
};

//post message

const postMessage = function(
	senderUsername,
	recieverUsername,
	message_title,
	message
) {
	return pool
		.query({
			text: `SELECT username, id
    FROM users 
    WHERE username = $1 OR username = $2`,
			values: [senderUsername, recieverUsername],
			name: "get_message_query"
		})
		.then(res => res.rows)
		.then(res => {
			let data = {};

			data[res[0].username] = res[0].id;
			data[res[1].username] = res[1].id;

			pool.query({
				text: `INSERT INTO user_posts(sender_id, reciever_id, message_title,sent_message)
        VALUES($1, $2, $3, $4)`,
				values: [
					data[senderUsername],
					data[recieverUsername],
					message_title,
					message
				]
			});
		})
		.then(() => {
			console.log("no errors");
		})
		.catch(err => {
			console.log(err);
		});
};

postMessage("c", "a", "titleTest", "im a genius ");

const getMessage = function(username) {
	return pool
		.query({
			text: `SELECT sender_id, message_title, sent_message, time_of_post FROM user_posts JOIN users ON sender_id = users.id WHERE users.username = $1 ORDER BY time_of_post DESC`,
			values: [username],
			name: "get_message_query"
		})
		.then(res => {
			return res.rows;
		});
};
//getUsers().then(console.log);

//getMessage("jzizzless").then(console.log);
module.exports = { getUserProfile, getMessage, postMessage };

// const getMessages = (user, chatroom) => {
//     return pool
//       .query({
//         text: `SELECT *
//         FROM chatrooms c join messages m on c.id = m.chatroom_id
//         JOIN user_message_views umv on umv.message_id = m.id
//         WHERE umv.user_id = $1 and c.id = $2
//       `,
//         values: [user, chatroom],
//         name: 'get_message_query'
//       })
//       .then((res) => res.rows);
//   };
