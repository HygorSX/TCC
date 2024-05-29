const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'borro0j9fmgumc2zbm2w-mysql.services.clever-cloud.com',
    user: 'uob0y5qotjhfn0mn',
    database: 'borro0j9fmgumc2zbm2w',
    password: 'oAbqc4ghX0n7r7fl2vLo',
});

module.exports = conn;