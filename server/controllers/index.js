var models = require('../models');
var bluebird = require('bluebird');
var db = require('../db');

//db.users
//db.messages
//db.rooms


module.exports = {
  messages: {
    get: function (req, res) {
      // console.log(req);
      db.messages.findAll({
        include: [db.users, db.rooms]
      })
      .then(function(results) {
        var body = results.map(function(value, index) {
          return {text: value.text, username: value.user.name, roomname: value.room.name};
        });
        res.json(body);
      });

    },
    post: function (req, res) {
      db.users.findOrCreate({
        where: {
          name: req.body.username
        }
      })
      .then(function(user_id) {
        db.rooms.findOrCreate({
          where: {
            name: req.body.roomname
          }
        }).then(function(room_id) {

          return [user_id, room_id];
        })
        .then(function(result) {
          console.log(result[0][0].dataValues.id);
          console.log(result[1][0].dataValues.id);
          db.messages.create({
            text: req.body.text,
            userId: result[0][0].dataValues.id,
            roomId: result[1][0].dataValues.id
          })
          .then(function(result) {
            res.sendStatus(201);
          })
        })
      }).catch(function(err) {
        console.log('error! ', err);
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      db.users.findAll()
        .then(function(results) {
          res.json(results);
        })
        .catch(function(err) {
          console.log("Error: ", err);
        });

    },
    post: function (req, res) {
      db.users.create(req.body)
        .then(function(results) {
          res.sendStatus(201);
        })
    }
  }
};

