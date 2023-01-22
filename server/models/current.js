const mongoose = require("mongoose");

const CurrentSchema = new mongoose.Schema({
	userid: String,
	yourHP: Number,
	opponentHP: Number,
	yourMove: String,
	opponentMove: String,
	yourDamage: Number,
	opponentDamage: Number,
	yourDidHit: Boolean,
	opponentDidHit: Boolean,
	playerEffect: String,
	opponentEffect: String,
	playerEffectTriggered: Boolean,
	opponentEffectTriggered: Boolean,
	playerTurnsAffected: Number,
	opponentTurnsAffected: Number,
	playerModifiers: [String],
	opponentModifiers: [String],

});

// compile model from schema
module.exports = mongoose.model("current", CurrentSchema);
