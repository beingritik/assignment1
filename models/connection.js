var MYSQL = require('mysql');
require("dotenv").config();;
//Get Env details

var DB_CONFIG = process.env.DB_CONFIG;

var pool = MYSQL.createPool(DB_CONFIG);

var getConnection = function (callback) {
  pool.getConnection(function (err, connection) {
    //pass the error to the callback instead of throwing it
    if (err) {
      return callback(err);
    }
    callback(null, connection);
  });
};

const db_pool_query = async () => {
  pool.query(sqlquery, function (err, sqlresult) {
    if (err) throw err;
    return sqlresult;
  })
}
module.exports = { pool, getConnection, db_pool_query }
// const connectToDatabase = async () => {
//   const connection = mysql.createConnection(dbConfig);

//   return new Promise((resolve, reject) => {
//     connection.connect((err) => {
//       if (err) {
//         console.log('MySQL connection error:', err);
//         reject('Failed to connect to the db.');
//         return;
//       }
//       console.log('Connected to MySQL database');
//       resolve(connection);
//     });

//     connection.on('error', (err) => {
//       console.log('MySQL connection error:', err);
//       if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         reject('Connection lost. Reconnecting...');
//         connectToDatabase(); // reconnecting
//       } else {
//         reject('Unexpected database error');
//       }
//     });
//   });
// };

// module.exports = connectToDatabase;
