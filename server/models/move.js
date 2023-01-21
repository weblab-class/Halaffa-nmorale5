const mongoose = require("mongoose");

const MoveSchema = new mongoose.Schema({
	name: String,
	func: String,
	desc: String,
	power: Number,
	id: Number,
});

// compile model from schema
module.exports = mongoose.model("move", MoveSchema);
