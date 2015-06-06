var path = require('path');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("zoo", "", "", {
  dialect: 'sqlite',
  storage: '../zoo.sqlite'
});

var Animal = sequelize.define('Animal', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
});

Animal.sync({force: true})
.then(function() {
  return Animal.create({
    name: "Bobcat",
    age: 5
  });
});
/* TODO this constructor takes the database name, username, then password.

 * Modify the arguments if you need to */
/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
// User.sync().success(function() {
//   /* This callback function is called once sync succeeds. */

//   // now instantiate an object and save it:
//   var newUser = User.build({username: "Jean Valjean"});
//   newUser.save().success(function() {

//     /* This callback function is called once saving succeeds. */

//     // Retrieve objects from the database:
//     User.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
//       // This function is called back with an array of matches.
//       for (var i = 0; i < usrs.length; i++) {
//         console.log(usrs[i].username + " exists");
//       }
//     });
//   });
// });
