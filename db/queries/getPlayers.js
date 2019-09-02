
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


getUsers().then(
console.log);


