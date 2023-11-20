// const USERAPI = require('./user_api');
const ERRHANDLER = require('../libraries/handle_err');
const ApiWrapper = require('../libraries/set_api_res');


//Detect ENV and get ENV FILE
// const objENV = require('../../libraries/detect_env');

/**
 * Handles Version2.0 FixFD-APIs.
 * @param {*} req Incoming Request
 * @param {*} res Server Response
 * @param {obj} body parsed body from req.body
 */

var getApiV1 = async function (req, res, body) {
  //public apis (including user-login)
  //user api
    if (req.url.includes("/register")) {
        // let queryPlaceholder = [];
      // Validate user session before api call
      try {
          // let userSession = await apiAuth(req, res);
          console.log("registered bod=",body)
          console.log("registered type=",typeof(body))
          

        // if (userSession.isValid) {
        //   return USERAPI(req, res, body);
                    //validate body
            // if (!VALIDATE.IsBankID(body)) {
            //     let errResponse = ERRHANDLER.APIerr(res);
            //     throw errResponse;
            // }

            //manage sql query
            let sqlQuery = `INSERT INTO USERS (username,email,password_hash,gender) values('${body.username}','${body.email}','123','Male')`;
            console.log("Generated SQL Query:", sqlQuery);
            
            //passing control to API Wrapper
            // const connectToDatabase = require('../models/connection');
            // await connectToDatabase();
            let serverResponse = await ApiWrapper(req, res, sqlQuery);
            console.log("just quesy inseruion=",serverResponse);
            return serverResponse;
      }
        // catch (err) {
        //     return err;
        // }
        // } else {
        //   let errResponse = ERRHANDLER.AUTHerr(res);
        //   return errResponse;
        // }
       catch (error) {
        let errResponse = ERRHANDLER.DBCONNerr(res);
        return errResponse;
      }
    }
    else {
    //when request url is wrong
    let errResponse = ERRHANDLER.NOTFOUNDerr(res);
    return errResponse;
  }
};

module.exports = { getApiV1 };