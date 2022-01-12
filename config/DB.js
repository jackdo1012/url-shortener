const Pool = require("pg").Pool;

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool =
    process.env.NODE_ENV === "production"
        ? new Pool({
              connectionString: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false },
          })
        : new Pool({ connectionString });

pool.query("SELECT * FROM url_list", (err, _) => {
    if (err) {
        pool.query(
            `CREATE TABLE url_list ( url_id SERIAL PRIMARY KEY, slug varchar(255), link varchar(255));`
        );
    }
});

module.exports = pool;
