
const {Pool}  = require("pg");

const pool = new Pool({
     user : "postgres",
     host: "localhost",
     database:"cartdb",
     password : "6878",
     port :5432,
});

module.exports = pool;
