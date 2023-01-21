const mongoose = require("mongoose");

const StarterSchema = new mongoose.Schema({
  	name: String,
	sprite: String,
	red: Number,
	blue: Number,
	green: Number,
	attack: Number,
	health: Number,
	speed: Number,
	id: Number,
	sprite: String,
	cost: Number,
	moves: [Number],
});

// compile model from schema
module.exports = mongoose.model("starter", StarterSchema);
