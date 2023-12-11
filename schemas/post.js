const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  createdArtistId: { type: String, required: true },
  title: { type: String, required: true },
  desciption: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, require: true },
  artistName: { type: String, required: true },
  createAt: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
