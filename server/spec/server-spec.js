/* You'll need to have sqlite3 running and your Node server running
 * for these tests to pass. */

var sqlite3 = require('sqlite3');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;
var path = require('path');


describe("Persistent Node Chat Server", function() {
  var db;


  beforeEach(function(done) {
    db = new sqlite3.Database('../../chat', done);

    // db = sqlite3.createConnection({
    //   user: "root",
    //   password: "",
    //   database: "chat"
    // });
    // db.connect();

    // var tablename = ""; // TODO: fill this out

    //  Empty the db table before each test so that multiple tests
    //  * (or repeated runs of the tests) won't screw each other up:
    // db.query("truncate " + tablename, done);
  });

  afterEach(function() {
    db.close();
  });


  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/users",
              json: { name: "Valjean" }
    },
    function () {
      // Post a message to the node chat server:
      request({ method: "POST",
                uri: "http://127.0.0.1:3000/classes/messages",
                json: {
                  username: "Valjean",
                  message: "In mercy's name, three days is all I need.",
                  room: "Hello"
                }
              },
              function () {

                var queryString = "SELECT * FROM messages";
                var queryArgs = [];


                db.run(queryString, function(err, results) {
                  expect(results.length).to.equal(1);
                  // expect(results[0].text).to.equal("In mercy's name, three days is all I need.");
                });
              }
              );
    });
  });

  xit("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
       var queryString = "";
       var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    db.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].text).to.equal("Men like you can never change!");
        expect(messageLog[0].roomname).to.equal("main");
        done();
      });
    });
  });
});
