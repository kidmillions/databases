var sqlite3 = require('sqlite3');
var path = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', '', '', {
  storage: '/Users/HR10/Desktop/databases/chat',
  dialect: 'sqlite',
});

var Message = sequelize.define('message', {
  text: Sequelize.STRING
});

var User = sequelize.define('user', {
  name: Sequelize.STRING
});

var Room = sequelize.define('room', {
  name: Sequelize.STRING
});

User.hasMany(Message);

Room.hasMany(Message);

Message.belongsTo(User);
Message.belongsTo(Room);

Message.sync();
Room.sync();
User.sync();

module.exports.messages = Message;
module.exports.rooms = Room;
module.exports.users = User;

// User.create({'name': 'Eric'})
//   .then(function(err, result) {
//     Room.create({'name': 'Default'})
//     .then(function(err, result) {
//       User.findOne({where: {name: 'Eric'}})
//       .then(function(result) {
//         console.log(result.dataValues);
//       });
//     });
//   })
//   .catch(function(err) {
//     console.log("No chance this gets run...", err.message);
//   });

//     ))

//   .then(function(err, result) {
//     Message.create({userId: result.id, 'text': 'Hello World'})
//   })

// Message.findAll().then(function(results) {console.log(results)});

// module.exports = new sqlite3.Database(path.join(__dirname, '../../chat'));




// var path = require('path');
// var Sequelize = require("sequelize");
// var sequelize = new Sequelize("zoo", "", "", {
//   dialect: 'sqlite',
//   storage: '../zoo.sqlite'
// });

// var Animal = sequelize.define('Animal', {
//   name: Sequelize.STRING,
//   age: Sequelize.INTEGER
// });

// Animal.sync({force: true})
// .then(function() {
//   return Animal.create({
//     name: "Bobcat",
//     age: 5
//   });
// });
