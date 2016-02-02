// npm install logger --save
var request = require('request')
var express = require('express')
  , passport = require('passport')
  , OAuth = require('oauth')
  , util = require('util')
  , moment = require('moment')
  , FitbitStrategy = require('passport-fitbit').Strategy;


var FITBIT_CONSUMER_KEY = "*"
var FITBIT_CONSUMER_SECRET = "*";

  var oauth = new OAuth.OAuth(
  'https://api.fitbit.com/oauth/request_token',
  'https://api.fitbit.com/oauth/access_token',
  FITBIT_CONSUMER_KEY,
  FITBIT_CONSUMER_SECRET,
  '1.0',
  null,
  'HMAC-SHA1'
);


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Fitbit profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the FitbitStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Fitbit profile), and
//   invoke a callback with a user object.
passport.use(new FitbitStrategy({
    consumerKey: FITBIT_CONSUMER_KEY,
    consumerSecret: FITBIT_CONSUMER_SECRET,
    callbackURL: "http://localhost:8000/auth/fitbit/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Fitbit profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Fitbit account with a user record in your database,
      // and return that user instead.
      console.log("token", token)
      console.log('token secret', tokenSecret)
      //want to save these tokens in a database
      //profile is then basic info. will need to make api calls here to get activity data
      console.log("PROFILE",profile);
      // console.log(profile._json.user.features);
      //save user id

      return done(null, profile);
    });
  }
));




var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

// configure Express
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(logger("combined"));
  app.use(cookieParser());
  app.use(bodyParser.json())
  app.use(methodOverride());
  app.use(session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// GET /auth/fitbit
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Fitbit authentication will involve redirecting
//   the user to fitbit.com.  After authorization, Fitbit will redirect the user
//   back to this application at /auth/fitbit/callback
app.get('/auth/fitbit',
  passport.authenticate('fitbit'),
  function(req, res){
    // The request will be redirected to Fitbit for authentication, so this
    // function will not be called.
  });

// GET /auth/fitbit/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/fitbit/callback', 
  passport.authenticate('fitbit', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(8000, function(){
  console.log('listening on port 8000')
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}



//------------------------------------

// https://api.fitbitcom/1/user/[user-id]/activities/date/[date].json
// https://api.fitbitcom/1/user/3WT3DL/activities/date/2015-12-13.json

app.get('/activity_info', 
  ensureAuthenticated,
  function(req, res){

    // console.log("REQ", req.user);

    //-----------------------------

    // Get updated steps from Fitbit API
      oauth.get(
        'https://api.fitbit.com/1/user/-/activities/date/2015-12-16.json',
        '*', //will replace with user.tocken
        '*', //will replace with user.secret tocken
        function (err, data, res) {
          if (err) {
            console.error("Error fetching activity data. ", err);
            // callback(err);

            return;
          }

          data = JSON.parse(data);
          console.log("Fitbit Get Activities", data);

          //*************************//
          //*** example "data" ******//
          //*************************//
          // {
          //     "activities":[
          //         {
          //             "activityId":51007,
          //             "activityParentId":90019,
          //             "calories":230,
          //             "description":"7mph",
          //             "distance":2.04,
          //             "duration":1097053,
          //             "hasStartTime":true,
          //             "isFavorite":true,
          //             "logId":1154701,
          //             "name":"Treadmill, 0% Incline",
          //             "startTime":"00:25",
          //             "steps":3783
          //         }
          //     ],
          //     "goals":{
          //         "caloriesOut":2826,
          //         "distance":8.05,
          //         "floors":150,
          //         "steps":10000
          //      },
          //     "summary":{
          //         "activityCalories":230,
          //         "caloriesBMR":1913,
          //         "caloriesOut":2143,
          //         "distances":[
          //             {"activity":"tracker", "distance":1.32},
          //             {"activity":"loggedActivities", "distance":0},
          //             {"activity":"total","distance":1.32},
          //             {"activity":"veryActive", "distance":0.51},
          //             {"activity":"moderatelyActive", "distance":0.51},
          //             {"activity":"lightlyActive", "distance":0.51},
          //             {"activity":"sedentaryActive", "distance":0.51},
          //             {"activity":"Treadmill, 0% Incline", "distance":3.28}
          //         ],
          //         "elevation":48.77,
          //         "fairlyActiveMinutes":0,
          //         "floors":16,
          //         "lightlyActiveMinutes":0,
          //         "marginalCalories":200,
          //         "sedentaryMinutes":1166,
          //         "steps":0,
          //         "veryActiveMinutes":0
          //     }
          // }
          //*** ************* ******//
          //***********************//


          console.log("DISTANCES", data.summary.distances);

          // Update (and return) the user
          // User.findOneAndUpdate(
          //   {
          //     encodedId: user.encodedId
          //   },
          //   {
          //     stepsToday: data.summary.steps,
          //     stepsGoal: data.goals.steps
          //   },
          //   null,
          //   function(err, user) {
          //     if (err) {
          //       console.error("Error updating user activity.", err);
          //     }
          //     callback(err, user);
          //   }
          // );
        }
      );

    //----------------------------







  // res.render('account', { user: req.user });
});


