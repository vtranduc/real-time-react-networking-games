
const {Pool} = require("pg");
const dbParams = require("../lib/db.js");
const pool  = new Pool(dbParams);
pool.connect();

const getUsers = function(){
    return pool.query(`SELECT *
    FROM users`)
    .then(res => res.rows)
    .catch(err => console.error(null, err.stack));
};


console.log(getUsers());