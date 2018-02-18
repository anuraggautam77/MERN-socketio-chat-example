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
const config = require ('../config/config');
const chatContoller =require('./chatController.js');
const cors = require('cors');
const fileUpload = require('express-fileupload');





/*
 * connect middleware - please note not all the following are needed for the specifics of this example but are generally used.
 */

const app = express ();
      app.use(express.static('server/upload/'));
      
const apiRoutes = express.Router ();




const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;


const server = app.listen(port, function(){
    console.log('Express server listening on port ' + port);
});

// pass Http object to Chat controller 
 chatContoller.socketio(server);
 
// 
// Configuration
// ================================================================================================
// Set up Mongoose
mongoose.connect (isDev ? config.db_dev : config.db, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use (morgan('dev'));
app.use(fileUpload());


app.use (bodyParser.urlencoded ({extended: true  }));
app.use( bodyParser.json( { limit: '50MB' } ) );


/*

app.post('/uploads', (req, res, next) => {
  let imageFile = req.files.file;
  imageFile.mv(`${folderpath}\\${req.body.filename}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    };
    res.json({file: "imagesupload/"+req.body.filename});
  });
})*/
// catch 404 and forward to error handler

app.use ('/api', apiRoutes);

// API routes
require ('./routes') (apiRoutes);
app.use (express.static (path.resolve (__dirname, '../dist')));
app.get ('/', function (req, res) {
    res.sendFile (path.resolve (__dirname, '../dist/index.html'));
    res.end ();
  });
app.get ('*', function (req, res) {
     res.redirect ('/');
  });
module.exports = app;
