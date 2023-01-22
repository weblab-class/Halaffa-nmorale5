const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

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
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/starter", (req, res) => {
  Starter.findOne({ id: req.user.starter }).then((starter) => {
    res.send(starter);
  });
});

router.post("/debug", (req, res) => {
  console.log("can print in api");
  User.findOne({_id: req.user._id}).then((user) =>{
    user.unlocked = [true, false, false];
    user.currency = 10;
    user.save().then((user) => res.send(user));
  });
});

router.post("/buy", (req, res) => {
  User.findOne({_id: req.user._id}).then((user) =>{
    user.currency = req.body.currency;
    user.unlocked = req.body.unlocked;
    user.save().then((user) => res.send(user));
  });
});

router.post("/startgame", auth.ensureLoggedIn, (req, res) => {
  const newPlayer = new PlayerStats({
    userid: req.user._id,
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
