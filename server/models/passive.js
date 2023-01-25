const mongoose = require("mongoose");

const PassiveSchema = new mongoose.Schema({
	name: String,
	sprite: String,
	description: String,
	id: Number,
	red: Number,
	green: Number,
	blue: Number,
});

// compile model from schema
module.exports = mongoose.model("passive", PassiveSchema);
