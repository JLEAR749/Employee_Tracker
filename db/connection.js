// Import and require mysql2
const mysql = require('mysql2');


// Connect to database
const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // MySQL password
    password: '$h@rp1e_2917KF',
    database: 'employee_trackerdb'
});

module.exports= connect;