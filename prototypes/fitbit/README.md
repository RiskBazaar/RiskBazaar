
This module lets you authenticate using Fitbit in your Node.js applications.
By plugging into Passport, Fitbit authentication can be easily and
unobtrusively integrated into any application or framework

#### Configure Strategy

The Fitbit authentication strategy authenticates users using a Fitbit account
and OAuth tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a consumer key, consumer secret, and callback URL.

    passport.use(new FitbitStrategy({
        consumerKey: FITBIT_CONSUMER_KEY,
        consumerSecret: FITBIT_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/fitbit/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'fitbit'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/fitbit',
      passport.authenticate('fitbit'));

    app.get('/auth/fitbit/callback', 
      passport.authenticate('fitbit', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

# Passport-Fitbit Credit

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [Fitbit](http://www.fitbit.com/) using the OAuth 1.0a API.