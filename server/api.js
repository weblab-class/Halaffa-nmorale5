/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Starter = require("./models/starter");
const PlayerStats = require("./models/playerStats");
const Passive = require("./models/passive");
const Move = require("./models/move");
const Current = require("./models/current");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});


router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/starter", (req, res) => {
  Starter.findOne({ id: req.query.id }).then((starter) => {
    res.send(starter);
  });
});

router.post("/startgame", auth.ensureLoggedIn, (req, res) => {
  const newPlayer = new PlayerStats({
    googleid: req.user.userID,
    maxHealth: req.starter.maxHealth,
    attack: req.starter.attack,
    speed: req.starter.speed,
    XP: req.starter.XP,
    equipment: [],
    name: req.starter.name,
    sprite: req.starter.sprite,
    red: req.starter.red,
    blue: req.starter.blue,
    green: req.starter.green,
    passive: req.starter.passive,
    moves: req.starter.moves,
  });
  newPlayer.save().then((PlayerStats) => res.send(PlayerStats));
});

router.post("/startbattle", auth.ensureLoggedIn, (req, res) => {
  if (req.user) {
    socketManager.startBattle()
  }
  res.send({})
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
