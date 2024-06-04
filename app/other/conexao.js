const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'borro0j9fmgumc2zbm2w-mysql.services.clever-cloud.com',
    user: 'uob0y5qotjhfn0mn',
    database: 'borro0j9fmgumc2zbm2w',
    password: 'oAbqc4ghX0n7r7fl2vLo',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

module.exports = pool;