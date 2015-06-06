var db = require('../db');
var bluebird = require('bluebird')
bluebird.promisifyAll(db);

module.exports = {
  messages: {

    get: function (callback) {
      db.allAsync('SELECT u.name as username, m.text, r.name as roomname, m.id as id FROM messages AS m JOIN users AS u ON m.user_id = u.id JOIN rooms AS r ON m.room_id = r.id;')
        .then(function(rows) {
          callback(rows);
        })
        .catch(function(e) {
          console.log('error getting: ' + e);
        });
    },
    post: function (message) {

      db.getAsync("SELECT id FROM rooms WHERE name = '" + message.roomname + "'")
        .then(function(rows) {
          console.log(rows.id);
          return rows.id;
        })
        .then(function(roomId) {
          db.getAsync("SELECT id FROM users WHERE name = '" + message.username + "'")
            .then(function(rows) {
              console.log(rows.id);
              return [roomId, rows.id];
            }).then(function(IDs) {
              console.log(IDs[0]);
              console.log(IDs[1]);
              db.run("INSERT INTO messages(text, user_id, room_id) VALUES ('" + message.text + "','" + IDs[1] + "','" + IDs[0] + "')");
            })
        })
        .catch(function(e) {
          console.log("Error doing the db.run(Insert...");
        });
    }
  },

  users: {
    get: function (callback) {
      db.allAsync("SELECT * FROM users").then( function(rows) {
          callback(rows);
        }).catch(function(e) {
          console.log('error: ' + e);
        });
    },
    post: function (user, callback) {
      // for (var key in user) {
      //   console.log("at model level: " + key);
      // }
      db.run("INSERT INTO users(id, name) VALUES(null, '"+user.name+"')", function(results) {
        callback(results);
      });
    }
  }
};

