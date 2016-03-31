// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');

var session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

// instantiate the app
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));

// This goes in our server.js file so that we actually use the mongoose config file!
require('./config/mongoose.js');
// this line requires and runs the code from our routes.js file and passes it app so that we can attach our routing rules to our express application!
require('./config/routes.js')(app);

app.listen(8080, function() {
  console.log('server listening on: 8080');
  console.log('Oraclize Implementation');
});
