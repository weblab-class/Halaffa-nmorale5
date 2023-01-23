const mongoose = require("mongoose");

const PlayerStatsSchema = new mongoose.Schema({
	userid: String,
	maxHealth: Number,
	attack: Number,
	speed: Number,
	XP: Number,
	equipment: [Number],
	name: String,
	sprite: String,
	red: Number,
	blue: Number,
	green: Number,
	passive: String,
	moves: [Number],

});

// compile model from schema
module.exports = mongoose.model("playerStats", PlayerStatsSchema);
