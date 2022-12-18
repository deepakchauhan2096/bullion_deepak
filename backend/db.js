const Pool = require("pg").Pool

const pool = new Pool ({
  user: 'crm',
  host: '13.41.145.64',
  database: 'crm',
  password: 'reactpostgres',
  port: 5432,
})

module.exports = pool