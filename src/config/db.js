const { Pool } = require('pg')

module.exports = new Pool ({
    user: 'natanProg',
    password: '153306',
    host: 'localhost',
    port: 5432,
    database: 'launchstoredb'
})