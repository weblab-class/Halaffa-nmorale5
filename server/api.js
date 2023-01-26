const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Starter = require("./models/starter");
const PlayerStats = require("./models/playerStats");
const Enemy = require("./models/enemy");
const Passive = require("./models/passive");
const Move = require("./models/move");

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

router.post("/debug", (req, res) => {
  User.findOne({_id: req.user._id}).then((user) =>{
    user.unlocked = [true, false, false];
    user.currency = 10;
    user.save().then((user) => res.send(user));
  });
});

router.get("/user", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  User.findOne({_id: req.user._id}).then((user) => {
    res.send(user);
  });
})

router.get("/starter", (req, res) => {
  Starter.findOne({ id: req.query.id }).then((starter) => {
    res.send(starter);
  });
});

router.get("/enemy", (req, res) => {
  Enemy.findOne({ id: req.query.id }).then((enemy) => {
    res.send(enemy);
  });
});

router.get("/move", (req, res) => {
  Move.findOne({ id: req.query.id }).then((move) => {
    res.send(move);
  });
});

router.get("/equipment", (req, res) => {
  Passive.findOne({ id: req.query.id }).then((equipment) => {
    res.send(equipment);
  });
});

router.get("/starters", (req, res) => {
  Starter.find({}).then((starters) => {
    res.send(starters);
  });
});

router.get("/enemies", (req, res) => {
  Enemy.find({}).then((enemies) => {
    res.send(enemies);
  });
});

router.get("/moves", (req, res) => {
  Move.find({}).then((moves) => {
    res.send(moves);
  });
});

router.get("/equipments", (req, res) => {
  Passive.find({}).then((equipments) => {
    res.send(equipments);
  });
});

router.post("/deletedata", (req, res)=> {
  Starter.deleteMany({}).then((starter) => console.log("deleted starters"));
  Enemy.deleteMany({}).then((enemy) => console.log("deleted enemies"));
  Move.deleteMany({}).then((move) => console.log("deleted moves"));
  Passive.deleteMany({}).then((passive) => console.log("deleted equipment"));
});

router.post("/addstarter", (req, res) => {
  const newStarter = new Starter({
    name: req.body.name,
    sprite: req.body.sprite,
    back_sprite: req.body.back_sprite,
    red: req.body.red,
    blue: req.body.blue,
    green: req.body.green,
    attack: req.body.attack,
    health: req.body.health,
    speed: req.body.speed,
    id: req.body.id,
    cost: req.body.cost,
    moves: req.body.moves,
    equipment: req.body.equipment,
    XP: req.body.XP,
  });
  newStarter.save().then(() => res.send(newStarter));
});

router.post("/addenemy", (req, res) => {
  const newEnemy = new Enemy({
    name: req.body.name,
    sprite: req.body.sprite,
    red: req.body.red,
    blue: req.body.blue,
    green: req.body.green,
    attack: req.body.attack,
    health: req.body.health,
    speed: req.body.speed,
    id: req.body.id,
    moves: req.body.moves,
    XP: req.body.XP,
  });
  newEnemy.save().then(() => res.send(newEnemy));
});

router.post("/addmove", (req, res) => {
  const newMove = new Move({
    name: req.body.name,
    id: req.body.id,
	  description: req.body.description,
	  power: req.body.power,
    color: req.body.color,
  });
  newMove.save().then(() => res.send(newMove));
});

router.post("/addequipment", (req, res) => {
  const newEquipment = new Passive({
    name: req.body.name,
    id: req.body.id,
	  description: req.body.description,
    sprite: req.body.sprite,
    red: req.body.red,
    blue: req.body.blue,
    green: req.body.green,
  });
  newEquipment.save().then(() => res.send(newEquipment));
});


router.post("/debug", (req, res) => {
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

router.post("/earn", (req, res) => {
  User.findOne({_id: req.user._id}).then((user) =>{
    user.currency = req.body.amount + user.currency;
    user.save().then((user) => res.send(user));
  });
});

router.post("/win", (req, res) => {
  User.findOne({_id: req.user._id}).then((user) =>{
    user.numWins = user.numWins + 1;
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
