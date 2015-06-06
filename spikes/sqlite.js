var path = require('path');
var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(path.join(__dirname, '../chat'));
var db = require('../server/db');

//db.serialize?
db.run("select * from messages");

console.log('file running');

db.run("INSERT INTO messages VALUES('chris', 2, 400)");
db.run("INSERT INTO messages VALUES('eric', 5, 4)");
db.each("SELECT * FROM messages", function(err, row) {
    console.log(row.user_id + ": " + row.text);
});

db.close();
