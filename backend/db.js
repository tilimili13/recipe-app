const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'recipe-web-app.cmryu8aekmr0.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'cedhPl4329Wu',
  database: 'recipe-web-app',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Data connection error:', err);
    return;
  }
  console.log('Connected to AWS RDS MySQL!');
});

module.exports = connection;