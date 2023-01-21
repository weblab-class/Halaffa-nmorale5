const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  userID: String,
	currency: Number,
  starter: Number,
  unlocked: [Boolean],

});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
