var users = require('./../server/controllers/users.js');
// var wagers = require('./../server/controllers/wagers.js');

  module.exports = function(app) {

    app.post('/new_wager', function(req, res) {
      users.new_wager(req.body, res);
    });

}

