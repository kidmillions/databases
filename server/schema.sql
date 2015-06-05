DROP TABLE messages;
DROP TABLE users;
DROP TABLE rooms;

CREATE TABLE messages (
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







/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

