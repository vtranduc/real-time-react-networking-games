const { Pool } = require("pg");
//const dbParams = require("../lib/db.js");
const pool = new Pool({
	user: "JJ",
	host: "localhost",
	database: "gamefinal",
	password: 123
});
pool.connect();

const getUserProfile = function(username) {
	return pool
		.query({
			text: `SELECT id, username, avatar
	FROM users WHERE username = $1`,

      values: [username]
    })
    .then(res => res.rows[0]);

};

const createUser = function(
	username,
	firstName,
	lastName,
	email,
	password,
	avatar
) {
	pool.query({
		text: `INSERT INTO users(username, first_name, last_name, email, pass, avatar)
VALUES($1, $2, $3, $4,$5, $6 )`,
		values: [username, firstName, lastName, email, password, avatar]
	});
};

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
			``;
			console.log(err);
		});
};
const getUsernameFromId = function(id) {
	return pool
		.query({
			text: `SELECT username
	FROM users 
	WHERE id = $1`,
			values: [id],
			name: "get_message_query"
		})
		.then(res => res.rows[0].username)
		.catch(err => {
			console.log(err);
		});
};

const getIdFromUsername = function(username) {
	return pool
		.query({
			text: `SELECT id
	FROM users 
	WHERE username = $1`,
			values: [username],
			name: "get_message_query"
		})
		.then(res => res.rows[0].id)
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

//postMessage("c", "a", "titleTest", "im a genius ");

// const getMessage = function(reciever) {
// 	return pool
// 		.query({
// 			text: `SELECT sender_id ,reciever_id, message_title, sent_message, time_of_post FROM user_posts JOIN users ON reciever_id = users.id OR sender_id = users.id WHERE users.username = $1 ORDER BY time_of_post DESC`,
// 			values: [reciever],
// 			name: "get_message_query"
// 		})
// 		.then(res => {
// 			return res.rows;
// 		});
// };


// const getMessage = function(recieverName) {
//   return pool
//     .query({
//       text: `SELECT users.id from users WHERE username = $1`,
//       values: [recieverName]
//     })
//     .then(res => {
//       console.log(res.rows[0].id);
//       return pool.query({
//         text: `SELECT * FROM user_posts WHERE reciever_id = $1`,
//         values: [res.rows[0].id]
//       });
//     })
//     .then(res => {
//       return res.rows;
//     });
// };

const getFriendList = function(username) {
  return getIdFromUsername(username).then(res => {
    return pool
      .query({
        text: `SELECT username, avatar FROM users JOIN friendship ON friendship.user_id = users.id WHERE request_status = TRUE AND (user_id = $1 OR reciever_id = $1)`,
        values: [res]
      })
      .then(res => res.rows);
  });
};

const getMessage = function(receiverUsername) {
  return getIdFromUsername(receiverUsername).then(res => {
    return pool
      .query({
        text: `SELECT users.username, users.avatar, user_posts.sent_message, user_posts.message_title, user_posts.time_of_post FROM users JOIN user_posts ON user_posts.sender_id = users.id WHERE user_posts.reciever_id = $1`,
        values: [res]
      })
      .then(res => res.rows)
      .catch(err => {
        console.log("FAILED HEREEEEEEEEEEEE", err);
      });
  });

};

//getUsers().then(console.log);

// getMessage("a").then(res => {
//   console.log(
//     "LOOK HEREEEE==========================================",
//     res,
//     "LOOK HEREEEE=========================================="
//   );
// });
module.exports = {
  getUserProfile,
  getMessage,
  postMessage,
  createUser,
  getFriendList
};

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
