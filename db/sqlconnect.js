const mysql = require('mysql2');
 
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'employee_db'
  },
  console.log(`Connected to the employees database.`)
);

module.exports = db;