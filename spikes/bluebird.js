bluebird = require('bluebird');
db = require('../server/db');

bluebird.promisifyAll(db);

db.getAsync("SELECT * FROM users")
  .then(function(rows) {
    console.log(rows);
  })
  .catch(function(e) {

  });
