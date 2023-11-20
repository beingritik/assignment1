const DB = require('../models/connection');
const ERRHANDLER = require('../libraries/handle_err');

var apiWrapper = (req, res, query) => {
  console.log("query=",query);
  /*QUERY using pool.getConnection -> connection.query() -> connection.release() */
  return new Promise((resolve, reject) => {
    //timout error if promise takes more than given time(10 Sec)
    const timer = setTimeout(() => {
      let errResponse = ERRHANDLER.TIMEOUTerr(res);
      reject(errResponse);
    }, 10000);

    //connecting db and using connection from pool
    DB.getConnection(function (err, con) {
      if (err) {
        let errResponse = ERRHANDLER.DBCONNerr(res);
        clearTimeout(timer);
        reject(errResponse);
      }

      //executing query coming from frontend
      // con.query(query, queryPlaceholder, function (error, results) {
        con.query(query, function (error, results) {
          // Done with the connection, releasing it.
        con.release();

        // Handle error after the release.
        if (error) {
          //check error type
          let errResponse = error.sqlMessage.includes('Duplicate entry') ? ERRHANDLER.EXISTerr(res) : ERRHANDLER.QUERYerr(res);
          clearTimeout(timer);
          reject(errResponse);
        } else {
          console.log("setting success");
          //response headers
          res.setHeader("Content-Type", "application/json");
          //set the response
          let RESPONSE_PAYLOAD = !query.toLowerCase().includes('select') ? { Status: 200, Message: 'Ok', Data: null } : { Status: 200, Message: 'Ok', Data: results };
          //sending back response object and actual reponse
          clearTimeout(timer);
          resolve([res, RESPONSE_PAYLOAD]);
        }
      })
    });
  })

}

module.exports = apiWrapper;