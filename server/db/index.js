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
