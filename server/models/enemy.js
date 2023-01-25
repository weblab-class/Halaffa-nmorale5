const mongoose = require("mongoose");

const EnemySchema = new mongoose.Schema({
  	name: String,
	sprite: String,
	red: Number,
	blue: Number,
	green: Number,
	attack: Number,
	health: Number,
	speed: Number,
	id: Number,
	moves: [Number],
	XP: Number
});

// compile model from schema
module.exports = mongoose.model("enemy", EnemySchema);
