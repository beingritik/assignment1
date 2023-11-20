// const express = require('express');
require("dotenv").config();;
const HTTP = require('http');
const SERVICES = require('./libraries/body_parser');
const API = require('./routes/api_routes_v1');
const ERRHANDLER = require('./libraries/handle_err');
// const VALIDATE = require('./libraries/validate');

//create server
const Server = HTTP.createServer(async (req, res) => {

if (req.url.includes('/api/register')) {

    let body;
    console.log("method=",req.method)
    //listening to data sent by client while requesting POST API
    if (req.method === "POST") {
      try { //handling error of await proceess (could generate due to long waiting time)
        console.log("enters in post")
        body = await SERVICES.getBodyData(req, res);
        console.log("body=",body);

      } catch (err) {
        let errResponse = ERRHANDLER.SERVERerr(res);
        errResponse[0].write(JSON.stringify(errResponse[1]));
        errResponse[0].end();
      }
      //Checking if body can parse into json (if not then 400 status code)
      // body = VALIDATE.JsonParse(body);
      // if (!body) {
      //   let errResponse = ERRHANDLER.APIerr(res);
      //   errResponse[0].write(JSON.stringify(errResponse[1]));
      //   errResponse[0].end();

      // }
      jsonBody = JSON.parse(body);
      let serverResponse = await API.getApiV1(req, res, jsonBody); //function return res and res header 
      console.log("bahar wala=",serverResponse);
      serverResponse[0].writeHead(serverResponse[1].Status)
      serverResponse[0].write(JSON.stringify(serverResponse[1]));
      serverResponse[0].end();
    }
     
    // else { //if user request comes from invalid version number
    //   LOG.logError('Invalid Version');
    //   let errResponse = ERRHANDLER.VERerr(res);
    //   errResponse[0].write(JSON.stringify(errResponse[1]));
    //   errResponse[0].end();
    // }
  }

    //Checking version and handling api according to version number

});

Server.listen(process.env.PORT, () => {
  console.log(`API Server running at http://localhost:${process.env.PORT}/`);
});
// // Registration endpoint
// app.post('/register', (req, res) => {
//   const { username, email, password, full_name } = req.body;

//   if (!username || !email || !password || !full_name) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   // Hash the password before storing it in the database
//   bcrypt.hash(password, 10, (err, hash) => {
//     if (err) {
//       console.error('Password hashing error:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     // Insert user into the database
//     db.query(
//       'INSERT INTO users (username, email, password_hash, full_name) VALUES (?, ?, ?, ?)',
//       [username, email, hash, full_name],
//       (err, results) => {
//         if (err) {
//           if (err.code === 'ER_DUP_ENTRY') {
//             return res.status(409).json({ error: 'Username or email already exists' });
//           } else {
//             console.error('Database insertion error:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//           }
//         }
//         return res.status(201).json({ message: 'User registered successfully' });
//       }
//     );
//   });
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required' });
//   }

//   // Retrieve user from the database
//   db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
//     if (err) {
//       console.error('Database query error:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     // Compare hashed password
//     bcrypt.compare(password, results[0].password_hash, (err, result) => {
//       if (err) {
//         console.error('Password comparison error:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }

//       if (!result) {
//         return res.status(401).json({ error: 'Invalid username or password' });
//       }

//       // Generate JWT token
//       const token = jwt.sign({ user_id: results[0].user_id }, 'your_secret_key', {
//         expiresIn: '1h',
//       });

//       return res.json({ token });
//     });
//   });
// });

// // Error handler for undefined routes
// app.use((req, res) => {
//   return res.status(404).json({ error: 'Not Found' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Global error handler:', err);
//   return res.status(500).json({ error: 'Internal Server Error' });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
