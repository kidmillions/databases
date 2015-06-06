var db = require('../db');
var bluebird = require('bluebird')
bluebird.promisifyAll(db);

module.exports = {
  messages: {
    get: function () {
      db.run()

    }, // a function which produces all the messages
    post: function (message) {
      //message.text
      //message.user



      //obtain the roomID for the messages room
      db.getAsync("SELECT id FROM rooms WHERE name = '" + message.room + "'")
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
          //obtain the userID for the messages user
      //insert message into DB using text, and both IDs







      // var roomId;
      // var userId;

      // var getUserID = function() { db.getAsync("SELECT id FROM users WHERE name = '" + message.user + "'", function(err, rows) {
      //     userID = rows[0];
      //     console.log('got user id: ' + userId);
      //   });
      // };

      // var postMessage = function() {db.run("INSERT INTO messages(text, user_id, room_id) VALUES('"+message.text+"', '"+userId+"', '"+roomId+"')", function() {
      //   console.log('posting message.')
      //   console.log(message.text);
      //   console.log(userId);
      //   console.log(roomId);
      // })};

      // //select room id



      // db.getAsync("SELECT id FROM rooms WHERE name = '" + message.room + "'").then(function(err, rows) {
      //   roomId = rows[0];
      //   console.log('got room id: ' + roomId);
      // }).then(getUserID)
      //   .then(postMessage);

      // , function(err, rows) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     // console.log("No errors. no rows");
      //     // console.log(rows);
      //     // roomId = rows.id;
      //     // console.log(roomId);
      //   }
      // });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.runAsync("SELECT * FROM users").then(
        function(err, rows) {
        if (err) {
          console.log ("Error selecting * from users: " + err);
        } else {
          callback(rows);
        }
      });


      // db.run("SELECT * FROM users", function(err, rows) {
      //   if (err) {
      //     console.log ("Error selecting * from users: " + err);
      //   } else {
      //     callback(rows);
      //   }
      // });
    },
    post: function (user) {
      db.run("INSERT INTO users(id, name) VALUES(null, '"+user.name+"')");
    }
  }
};

