const Pool = require("pg").Pool

const pool = new Pool({
    user: "jackdo",
    host: "localhost",
    database: "url_shortener_list",
    password: "tri20072009",
    port: 5432,
})

module.exports = pool
