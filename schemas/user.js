const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  isArtist: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", userSchema);
