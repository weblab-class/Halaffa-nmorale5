const mongoose = require("mongoose");

const StarterSchema = new mongoose.Schema({
  	name: String,
	sprite: String,
	back_sprite: String,
	red: Number,
	blue: Number,
	green: Number,
	attack: Number,
	health: Number,
	speed: Number,
	id: Number,
	cost: Number,
	moves: [Number],
	equipment: [Number],
	XP: Number
});

// compile model from schema
module.exports = mongoose.model("starter", StarterSchema);
