
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
    FROM users`)
    .then(res => res.rows)
}    

const getUserId = function(username){
    
}






//const addUser

const userLogin = function(email, password){
    return pool.query({
        text:`SELECT * 
        FROM users 
        WHERE email = $1 AND pass = $2`,
        values:[email, password],
        name: 'get_message_query'
    }).then((res)=>res.rows[0]).catch(err=>{console.log(err)});
}

//post message

const postMessage = function (senderUsername, recieverUsername, message){
return pool.query({
    text: `SELECT username, id
    FROM users 
    WHERE username = $1 OR username = $2`,
    values: [senderUsername, recieverUsername],
    name: 'get_message_query'
}).then((res =>res.rows)).then((res)=>{

    let data = {};

    data[res[0].username] = res[0].id;
    data[res[1].username] = res[1].id;


    pool.query({
        text: `INSERT INTO user_posts(sender_id, reciever_id, sent_message)
        VALUES($1, $2, $3)`,
        values: [data[senderUsername], data[recieverUsername], message]
        
    })




}).then(()=>{console.log("no errors")}).catch(err=>{console.log(err)})

}

postMessage('c', 'a', 'im a genius ')



//getUsers().then(console.log);


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