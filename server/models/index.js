var db = require('../db');



module.exports = {
  messages: {
    get: function () {
      db.run()

    }, // a function which produces all the messages
    post: function (message) {
      //message.text
      //message.user
      var roomId;
      db.get("SELECT id FROM rooms WHERE name = '" + message.room + "'", function(err, rows) {
        if (err) {
          console.log(err);
        } else {
          console.log("No errors. no rows");
          console.log(rows);
          roomId = rows.id;
          console.log(roomId);
        }
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.run("SELECT * FROM users", function(err, rows) {
        if (err) {
          console.log ("Error selecting * from users: " + err);
        } else {
          callback(rows);
        }
      });
    },
    post: function (user) {
      db.run("INSERT INTO users(id, name) VALUES(null, '"+user.name+"')");
    }
  }
};

