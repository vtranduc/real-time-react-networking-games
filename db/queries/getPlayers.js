
const {Pool} = require("pg");
//const dbParams = require("../lib/db.js");
const pool  = new Pool({
user: 'JJ',
host: 'localhost',
database:'gamefinal',
password: 123

});
pool.connect();

const getUsers = function(){
    return pool.query(`SELECT *
    FROM users WHERE first_name like 'a'`)
    .then(res => res.rows)
}    

const addUser

const userLogin = function(email, password){
    return pool.query({
        text:`SELECT * 
        FROM users 
        WHERE email = $1 AND pass = $2`,
        values:[email, password],
        name: 'get_message_query'
    }).then((res)=>res.rows[0]).catch(err=>{console.log(err)});
}

userLogin("jayjay_ting@hotmail.com", "hello").then(console.log);


module.exports = {userLogin}

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