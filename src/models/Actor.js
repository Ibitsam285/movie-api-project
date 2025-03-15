const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
});

module.exports = mongoose.model("Actor", ActorSchema);
