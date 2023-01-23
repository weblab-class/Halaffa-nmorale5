const mongoose = require("mongoose");

const MoveSchema = new mongoose.Schema({
	name: String,
	description: String,
	power: Number,
	id: Number,
	color: String,
});

// compile model from schema
module.exports = mongoose.model("move", MoveSchema);
