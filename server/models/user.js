const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  userId: String,
	currency: Number,
  starter: Number,
  unlocked: [Boolean],
  googleid: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
