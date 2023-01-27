// Import and require mysql2
const mysql = require('mysql2');
const { connection } = require('.');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    // MySQL password
    password: '$h@rp1e_2917KF',
    database: 'employee_trackerdb'
  },
  console.log(`Connected to the employee_tracker database.`)

  connection.connect ((err)=> {
    if (err) throw err;
    start()
  });

module.exports= db;