DROP TABLE messages;
DROP TABLE users;
DROP TABLE rooms;

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text varchar(1000),
  user_id int,
  room_id int
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name varchar(20)
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name varchar(20)
);


/* Create other tables and define schemas for them here! */
INSERT INTO rooms VALUES(null, 'HackerRoom');
INSERT INTO rooms VALUES(null, 'Default');
INSERT INTO users VALUES(null, 'Eric');
INSERT INTO users VALUES(null, 'Chris');
INSERT INTO users VALUES(null, 'Obama');
INSERT INTO messages VALUES(null, 'New message text in Default room.', 1, 1);
INSERT INTO messages VALUES(null, 'First post in HackerRoom.', 2, 2);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

