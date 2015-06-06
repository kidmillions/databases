var models = require('../models');
var bluebird = require('bluebird');


module.exports = {
  messages: {
    get: function (req, res) {
      // console.log(req);
      models.messages.get(function(response) {
        // console.log(response);
        res.json(response);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body);
      res.send(req.body);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(response) {
        res.send(response);
      });
    },
    post: function (req, res) {
      // console.log(req.body);
      models.users.post(req.body, function(results) {
       res.send(results);
      });
    }
  }
};

