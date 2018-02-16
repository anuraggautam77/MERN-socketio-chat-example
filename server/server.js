const bodyParser = require ('body-parser');
const express = require ('express');
const morgan = require ('morgan');

const app = express ();
const apiRoutes = express.Router ();

const fs = require ('fs');
const historyApiFallback = require ('connect-history-api-fallback');
const mongoose = require ('mongoose');
const path = require ('path');
const webpack = require ('webpack');
const webpackDevMiddleware = require ('webpack-dev-middleware');
const webpackHotMiddleware = require ('webpack-hot-middleware');

const config = require ('../config/config');
const webpackConfig = require ('../webpack.config');
const chatContoller =require('./chatController.js');

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const server = app.listen(port, function(){
    console.log('server is running on port 8080')
});

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect (isDev ? config.db_dev : config.db, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;


// pass Http object to Chat controller 
 chatContoller.socketio(server);

app.use (bodyParser.urlencoded ({extended: true}));
app.use( bodyParser.json( { limit: '50MB' } ) );
//app.use (bodyParser.json ());

app.use (morgan ('dev'));

app.use ('/api', apiRoutes);
// API routes
require ('./routes') (apiRoutes);

app.use (express.static (path.resolve (__dirname, '../dist')));
app.get ('/', function (req, res) {
    res.sendFile (path.resolve (__dirname, '../dist/index.html'));
    res.end ();
  });
app.get ('*', function (req, res) {
  //console.log(req.url);
  //console.log(req.param());
    res.redirect ('/');
    
  });
module.exports = app;
