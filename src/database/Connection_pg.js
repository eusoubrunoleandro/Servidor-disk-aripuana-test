const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.CONNECTION_URL
})

module.exports = pool