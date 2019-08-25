const express = require("express");
const server = express();

server.use(express.json());

server.use((req, res, next) => {
  console.log(`\x1b[35m${req.method} - ${req.url}\x1b[0m`);
  return next();
});
//query params
//Route params
//body
const users = ["Aleal", "Bleal", "Cleal"];

function checkUserNamePresent(req, res, next) {
  const { name } = req.body.name;
  if (!name) {
    return res.status(400).json({ error: "User name required!" });
  }
  req.user = name;
  return next();
}

function checkUserExists(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(404).json({ error: "User does not exists!" });
  }
  req.user = user;
  return next();
}

//all users
server.get("/users", (req, res) => {
  return res.json(users);
});
//an user
server.get("/users/:index", checkUserExists, (req, res) => {
  res.json(req.user);
});
//add user
server.post("/users/", checkUserNamePresent, (req, res) => {
  users.push(req.user);
  res.json(users);
});
//update user
server.put(
  "/users/:index",
  checkUserExists,
  checkUserNamePresent,
  (req, res) => {
    console.log(req);
    users[index] = req.user;
    res.json(users[index]);
  }
);
//delete user
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;
  res.json(users.splice(index, 1));
});
const PORT = 7777;
server.listen(PORT);
console.log(`\x1b[35mServer started at port: \x1b[36m${PORT}\x1b[0m`);
