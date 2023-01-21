const mongoose = require("mongoose");

const PassiveSchema = new mongoose.Schema({
	name: String,
	func: String,
	desc: String,
	id: Number,
});

// compile model from schema
module.exports = mongoose.model("passive", PassiveSchema);
