const Pool = require("pg").Pool

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const pool = new Pool({
    connectionString:
        process.env.NODE_ENV === "production"
            ? process.env.DATABASE_URL
            : connectionString,
})

module.exports = pool
