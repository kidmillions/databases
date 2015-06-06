/* You'll need to have sqlite3 running and your Node server running
 * for these tests to pass. */

var sqlite3 = require('sqlite3');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;
var path = require('path');


describe("Persistent Node Chat Server", function() {

      var postMessage = {
        method: "POST",
        uri: "http://127.0.0.1:3000/classes/messages",
        json: {
          username: "Valjean",
          text: "In mercys name, three days is all I need.",
          room: "Hello"
        }
      };

      var getMessages = {
        method: 'GET',
        uri: "http://127.0.0.1:3000/classes/messages"
      };

      var postUser = {
        url: "http://127.0.0.1:3000/classes/users",
        json: { name: "Valjean" }
      };

      var getUsers = "http://127.0.0.1:3000/classes/users"



  // afterEach(function() {
  //   db.close();
  // });


  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request.post(postUser, function() {
      request.get(getUsers, function(error, response, body) {
        var users = JSON.parse(body);
        expect(users.name).to.equal(postUser.json.name)
      });
    });
  });



  xit("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
       // var queryString = "INSERT INTO rooms VALUES('main')";
       // var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */





    //make post of room
    //make post of message in room
    //check to see if message exists in DB
    //check to see if message is correctly assigned to room







    //         db.run(queryString, function(err) {

    //         if (err) { throw err; }

    //         // Now query the Node chat server and see if it returns
    //         // the message we just inserted:
    //         request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
    //           var messageLog = JSON.parse(body);
    //           expect(messageLog[0].text).to.equal("Men like you can never change!");
    //           expect(messageLog[0].roomname).to.equal("main");
    //           done();
    //         });
    //       });
    // });
  });
});
