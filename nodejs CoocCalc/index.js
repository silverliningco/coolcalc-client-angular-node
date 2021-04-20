/* 
run locally -> npm run start:dev
*/

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const https = require('https');
const path = require('path');
const fs = require('fs');

const { dbConnection } = require('./database/config');

// create express server 
const app = express();

// configure CORS
app.use( cors() );


// read and parser the body
app.use( express.json() );

// database
dbConnection();

// public directory
app.use( express.static('public') );

// routes
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/coolcalc/client',require('./routes/coolcalc'));
app.use( '/coolcalc/user', require('./routes/authentication-coocalc'));
app.use( '/client/staging/MJ8Reports', require('./routes/coocalc-report'));


const sslServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
  );
  
  
  sslServer.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
  });

