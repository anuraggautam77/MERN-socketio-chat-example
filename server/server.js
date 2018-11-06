/*
* Module dependencies.
*/
const express = require ('express');
const bodyParser = require ('body-parser');
const morgan = require ('morgan');
const fs = require ('fs');
const historyApiFallback = require ('connect-history-api-fallback');
const mongoose = require ('mongoose');
const path = require ('path');
const config = require ('../config/configuration');
const chatContoller =require('./chatController.js');
const cors = require('cors');
 





/*
 * connect middleware - please note not all the following are needed for the specifics of this example but are generally used.
 */

const app = express ();
      app.use(express.static('server/upload/'));
      
const apiRoutes = express.Router ();

const isDev = process.env.NODE_ENV !== 'production';
 const port = process.env.PORT || 3300;


const server = app.listen(port, function(){
    console.log('Express server listening on port ' + port);
});

// pass Http object to Chat controller 
 chatContoller.socketio(server);
 
// 
// Configuration
// ================================================================================================
// Set up Mongoose

const connection= process.env.DB_URL||config.local;

mongoose.connect (connection, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use (morgan('dev'));
 

app.use (express.static (path.resolve (__dirname, '../dist')));
app.use (bodyParser.urlencoded ({extended: true  }));
app.use( bodyParser.json( { limit: '50MB' } ) );


// catch 404 and forward to error handler


app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
    next();
});


app.use ('/api', apiRoutes);

// API routes
require ('./routes') (apiRoutes);



 app.get ('/', function (req, res) {
  res.sendFile (path.resolve (__dirname, '../dist/index.html'));
   res.end ();
 });
app.get ('*', function (req, res) {
   res.sendFile (path.resolve (__dirname, '../dist/index.html'));
  });
module.exports = app;
